import json

def cleanData(data, keys_to_remove, keys_backdrops, file_count_response):

    print("Movies in this file: " + len(data).__str__())

    for movie in data:
        listActors = []
        listDirectors = []
        listBackdrops = []
        count_backdrops = 12
        count_actors = 40
        for key in keys_to_remove:
            if key in movie:
                del movie[key]
        if movie["poster_path"] is not None:
            poster_path = "https://image.tmdb.org/t/p/original" + movie.get("poster_path")
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
                for i in range(0, len(cast)):
                    if count_actors > 0:
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
                        count_actors -= 1
        del movie["credits"]
        movie["actors"] = listActors
        movie["directors"] = listDirectors

        ##REMOVE EXTRA DATA FROM IMAGES
        backdrops = movie.get("backdrops")
        for value in backdrops:
            if count_backdrops > 0:
                for key in keys_backdrops:
                    if key in value:
                        del value[key]
                full_path = "https://image.tmdb.org/t/p/original" + value.get("file_path")
                value["file_path"] = full_path
                imageLinkPath = value["file_path"]
                del value["file_path"]
                value["link"] = imageLinkPath
                listBackdrops.append(value)
            count_backdrops -= 1
        ##REMOVE EXTRA DATA FROM  GENRES

        del movie["backdrops"]
        movie["galleryImagesLink"] = listBackdrops
        genres = movie.get("genres")
        for value in genres:
            for key in keys_to_remove:
                if key in value:
                    del value[key]
        runtimeTotal = movie["runtime"]
        hours = 0
        minutes = 0
        while runtimeTotal >= 60:
            hours += 1
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

    trailerKey = "trailerLink"
    newData = []
    for movie in data:
        if movie["posterImageLink"] != "None":
            if trailerKey in movie.keys():
                newData.append(movie)

    print(len(newData))
    print(len(data))
    with open('outputs/output' + file_count_response.__str__() + '.json', 'w') as file:
        json.dump(newData, file, indent=2, ensure_ascii=False)
