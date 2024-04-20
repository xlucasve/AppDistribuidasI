import requests
import json




startingPoint = 1
endingPoint = startingPoint + 5
finalItem = endingPoint - 2
count = 0
create = False


if create:

  f = open("respuesta.json", "a")
  f.write('{"movies": [')
  for movieNumber in range (startingPoint, endingPoint):

    url = "https://api.themoviedb.org/3/movie/"+ movieNumber.__str__() +"?language=en-US&append_to_response=credits"
    imageUrl = "https://api.themoviedb.org/3/movie/" + movieNumber.__str__() +"/images"

    payload = {}
    headers = {
      'Authorization': 'Bearer API KEYYYYYY'
    }
    movieData = requests.request("GET", url, headers=headers, data=payload)
    movieImages = requests.request("GET", imageUrl, headers=headers, data=payload)


    movieJson = movieData.text[:-1]
    movieImagesJson = movieImages.text[1:]


    #ADD new movie to the response.json
    if movieData.status_code == 200:
      movieObject = movieJson + "," + movieImagesJson
      f.write(movieObject)
      if movieNumber != finalItem:
        count += 1
        print(count)
        f.write(",")

  f.write("]}")
  f.close()


if not create:
  ##Remove unnecesary data
  keys_to_remove = ["aspect_ratio", "iso_639_1", "spoken_languages", "revenue", "popularity", "crew", "cast_id", "order", "known_for_department", "adult", "credits" "revenue", "status", "tagline", "character","belongs_to_collection", "budget", "id", "homepage", "origin_country", "imdb_id", "original_language", "production_companies", "production_countries"]
  keys_backdrops = ["aspect_ratio", "iso_639_1","vote_average", "vote_count", "width", "height", ]
  removed_count = 0

  with open("respuesta.json", "r") as file:
    data = json.load(file)


  # checking if the key exists before removing
  for movie in data["movies"]:
    for key in keys_to_remove:
      if key in movie:
        del movie[key]
        removed_count += 1
        print(removed_count)

    ##Remove extra data from crew and cast
    for keys, values in movie.items():
      if keys == "credits":
        crew = values.get("crew")
        print("TYPE CREW")
        print(crew)
        for director in crew[:]:
          print("TYPE DIRECTOR")
          print(type(director))
          print(director.get("job"))
          if director.get("job") != "Director":
            print("NOT EQUAL")
            crew.remove(director)
        cast = values.get("cast")
        for i in range (0, len(cast)):
          print("AYUDA")
          diction = cast[i]
          for key in keys_to_remove:
            if key in diction:
              del diction[key]
              removed_count += 1
              print("NEW REMOVED:" + removed_count.__str__())
    ##REMOVE EXTRA DATA FROM IMAGES
    backdrops = movie.get("backdrops")
    print("BACKDROPS")
    print(type(backdrops))
    for value in backdrops:
      for key in keys_backdrops:
        if key in value:
          del value[key]
          print("ELIMINADO MASTER")

      full_path ="https://image.tmdb.org/t/p/original" + value.get("file_path")
      value["file_path"] = full_path




  # saving the updated JSON data back to the file
  with open('output.json', 'w') as file:
    json.dump(data, file, indent=2)