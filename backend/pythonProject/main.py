import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

startingPoint = 299536
endingPoint = startingPoint + 1
count = 0
first = True
justCreate = True

print("OBTENIENDO DATOS CRUDOS DE PELICULA\n")
print("Peliculas obtenidas:")
if not justCreate:
  ##Creacion de archivo para guardar json de respuesta
  f = open("response.json", "a")
  f.write('{"movies": [')
  for movieNumber in range (startingPoint, endingPoint):

    url = "https://api.themoviedb.org/3/movie/"+ movieNumber.__str__() +"?language=en-US&append_to_response=credits"
    imageUrl = "https://api.themoviedb.org/3/movie/" + movieNumber.__str__() +"/images"
    videosUrl = "https://api.themoviedb.org/3/movie/" + movieNumber.__str__() +"/videos?language=en-US"

    payload = {}
    headers = {
      'Authorization': os.getenv('API_KEY')
    }
    movieData = requests.request("GET", url, headers=headers, data=payload)
    movieImages = requests.request("GET", imageUrl, headers=headers, data=payload)
    videoData = requests.request("GET", videosUrl, headers=headers, data=payload)

    ##Eliminar "{" o "}" del inicio y final para que se guarde todo en el mismo objeto
    movieJson = movieData.text[:-1]
    movieImagesJson = movieImages.text[1:]


    ##Get trailer link
    videoJson = videoData.json()
    results = videoJson.get("results")
    trailerFound = False

    for result in results:
      videoType = result.get("type")
      if videoType == "Trailer":
        videoTrailerLink = "https://www.youtube.com/watch?v=" + result.get("key")
        trailerFound = True
        trailerLinkToJson = ', "trailerLink": "' + videoTrailerLink + '"'
        movieJson = movieJson + trailerLinkToJson
        break

    #ADD new movie to the response.json
    if movieData.status_code == 200:
      if not first:
        f.write(",")
      movieObject = movieJson + "," + movieImagesJson
      f.write(movieObject)
      count += 1
      print(count)
      first = False

  f.write("]}")
  f.close()

  print("CANTIDAD DE PELICULAS OBTENIDAS:", count)


##Remove unnecesary data
keys_to_remove = ["job", "backdrop_path", "id","original_title","original_name",  "department", "gender",  "video", "credit_id","logos", "posters","aspect_ratio", "iso_639_1", "spoken_languages", "revenue", "popularity", "crew", "cast_id", "order", "known_for_department", "adult", "credits" "revenue", "status", "tagline", "character","belongs_to_collection", "budget", "id", "homepage", "origin_country", "imdb_id", "original_language", "production_companies", "production_countries"]
keys_backdrops = ["aspect_ratio", "iso_639_1","vote_average", "vote_count", "width", "height"]
removed_count = 0
listActors = []
listDirectors = []


print("REALIZANDO LIMPIEZA")


with open("response.json", "r", encoding='utf8') as file:
  data = json.load(file)


# checking if the key exists before removing
for movie in data["movies"]:
  for key in keys_to_remove:
    if key in movie:
      del movie[key]
  if movie["poster_path"] is not None:
    poster_path ="https://image.tmdb.org/t/p/original" +  movie.get("poster_path")
    movie["poster_path"] = poster_path
  else:
    poster_path = "None"
    movie["poster_path"] = poster_path
  ##Remove extra data from crew and cast
  for keys, values in movie.items():
    if keys == "credits":

      ##Clean data related to crew
      crew = values.get("crew")
      for director in crew[:]:
        if director.get("job") != "Director":
          crew.remove(director)
        else:
          for key in keys_to_remove:
            if key in director:
              del director[key]
          if director.get("profile_path") is not None:
            full_crew_path = "https://image.tmdb.org/t/p/original" + director.get("profile_path")
            director["profile_path"] = full_crew_path
          else:
            no_cast_path = "https://wallpapercave.com/wp/wp9566480.png"
            director["profile_path"] = no_cast_path
          profilePicPath = director["profile_path"]
          del director["profile_path"]
          director["portraitImageLink"] = profilePicPath
          listDirectors.append(director)
      ##Clean data related to actors
      cast = values.get("cast")
      for i in range (0, len(cast)):
        diction = cast[i]
        for key in keys_to_remove:
          if key in diction:
            del diction[key]
        if diction.get("profile_path") is not None:
          cast_path = "https://image.tmdb.org/t/p/original" + diction.get("profile_path")
          diction["profile_path"] = cast_path
        else:
          no_cast_path = "https://wallpapercave.com/wp/wp9566480.png"
          diction["profile_path"] = no_cast_path
        profilePicPath = diction["profile_path"]
        del diction["profile_path"]
        diction["portraitImageLink"] = profilePicPath
        listActors.append(diction)
  del movie["credits"]
  movie["actors"] = listActors
  movie["directors"] = listDirectors



  ##REMOVE EXTRA DATA FROM IMAGES
  backdrops = movie.get("backdrops")
  for value in backdrops:
    for key in keys_backdrops:
      if key in value:
        del value[key]
    full_path ="https://image.tmdb.org/t/p/original" + value.get("file_path")
    value["file_path"] = full_path
    imageLinkPath = value["file_path"]
    del value["file_path"]
    value["link"] = imageLinkPath
  ##REMOVE EXTRA DATA FROM  GENRES
  galleryImages = movie["backdrops"]
  del movie["backdrops"]
  movie["galleryImagesLink"] = galleryImages
  genres = movie.get("genres")
  for value in genres:
    for key in keys_to_remove:
      if key in value:
        del value[key]
  runtimeTotal = movie["runtime"]
  hours = 0
  minutes = 0
  while runtimeTotal >= 60:
    hours+=1
    runtimeTotal -= 60
  minutes = runtimeTotal
  del movie["runtime"]
  movie["hourLength"] = hours
  movie["minuteLength"] = minutes
  releaseDate = movie["release_date"]
  del movie["release_date"]
  movie["releaseDate"] = releaseDate
  posterImageLink = movie["poster_path"]
  del movie["poster_path"]
  movie["posterImageLink"] = posterImageLink
  rating = movie["vote_average"]
  del movie["vote_average"]
  movie["rating"] = rating
  voteCount = movie["vote_count"]
  del movie["vote_count"]
  movie["voteCount"] = voteCount
  synopsis = movie["overview"]
  del movie["overview"]
  movie["synopsis"] = synopsis
  favorites = []
  movie["favorites"] = favorites




# saving the updated JSON data back to the file
with open('output.json', 'w') as file:
  json.dump(data, file, indent=2, ensure_ascii=False)