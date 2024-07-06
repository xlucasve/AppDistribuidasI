import requests
import json
import os
from dataCleaner import cleanData
from pathlib import Path
from dotenv import load_dotenv

responses = "responses"
if Path(responses).is_dir():
  print("Responses folder found...")
else:
  print("Creating responses folder")
  Path(responses).mkdir(parents=True, exist_ok=True)
outputs = "outputs"
if Path(outputs).is_dir():
  print("Outputs folder found...")
else:
  print("Creating outputs folder")
  Path(outputs).mkdir(parents=True, exist_ok=True)

uploadLocation = ""
uploadModes = ["DEPLOY", "LOCAL"]
downloadMode = ""
downloadModes = ["SAVED", "GET"]
while uploadLocation not in uploadModes:
  print("Seleccionar Modo: DEPLOY | LOCAL")
  uploadLocation = input()

if uploadLocation == "LOCAL":
  urlLocation = "http://localhost:8080/api/v1/population/"
else:
  urlLocation = "https://movieplay-api.onrender.com/api/v1/population/"

while downloadMode not in downloadModes:
  print("Seleccionar Modo: SAVED (Uses Data already stored in system) | GET (Calls API to get data)")
  downloadMode = input()

if downloadMode == "SAVED":
  justUpload = True
else:
  justUpload = False

print(urlLocation)

load_dotenv()

#Datos configurables
moviesPerFile = 25
fileAmmount = 2

#Inicializacion de variables
movieCount = 0
fileCount = 0
foundMovies = moviesPerFile
movieNumber = 0 #Ultima pelicula alcanzada:



print("OBTENIENDO DATOS CRUDOS DE PELICULA\n")
print("Peliculas obtenidas:")
if not justUpload:

  for k in range(fileAmmount):
    first = True
    fileCount += 1
    print("\nSTARTING NEW FILE NUMBER: " + fileCount.__str__() + "\n")

    ##Creacion de archivo para guardar json de respuesta
    f = open("responses/response" + fileCount.__str__() + ".json" , "w")
    f.write('[')
    while foundMovies > 0:
      movieNumber += 1
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



      #ADD new movie to the response.json
      if movieData.status_code == 200:
        ##Eliminar "{" o "}" del inicio y final para que se guarde todo en el mismo objeto
        movieJson = movieData.text[:-1]
        movieImagesJson = movieImages.text[1:]




        if videoData.status_code == 200:
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

        if not first:
          f.write(",")
        movieObject = movieJson + "," + movieImagesJson
        f.write(movieObject)
        movieCount += 1
        print("Movie number: " + movieCount.__str__() + " | MovieDB ID: " + movieNumber.__str__())
        first = False
        foundMovies -= 1
    f.write("]")
    f.close()
    foundMovies = moviesPerFile




##Remove unnecesary data
keys_to_remove = ["job", "backdrop_path", "id","original_title","original_name",  "department", "gender",  "video", "credit_id","logos", "posters","aspect_ratio", "iso_639_1", "spoken_languages", "revenue", "popularity", "crew", "cast_id", "order", "known_for_department", "adult", "credits" "revenue", "status", "tagline", "character","belongs_to_collection", "budget", "id", "homepage", "origin_country", "imdb_id", "original_language", "production_companies", "production_countries"]
keys_backdrops = ["aspect_ratio", "iso_639_1","vote_average", "vote_count", "width", "height"]



print("REALIZANDO LIMPIEZA")

fileCountResponse = 0
for number in range(fileAmmount):
  fileCountResponse += 1

  output_file = Path("outputs/output" + str(fileCountResponse) + ".json")
  if not output_file.is_file():
    print("\nCleaning file number: " + fileCountResponse.__str__() + "")
    with open("responses/response" + fileCountResponse.__str__() + ".json", "r", encoding='utf8') as file:
      data = json.load(file)
    cleanData(data, keys_to_remove, keys_backdrops, fileCountResponse)

  # saving the updated JSON data back to the file


  print("Uploading file number: " + fileCountResponse.__str__() + "\n")
  with open('outputs/output' + fileCountResponse.__str__() + '.json', 'rb') as payload:
    headers = {
      'Content-Type': 'application/json'
    }
    url = urlLocation
    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.text)
