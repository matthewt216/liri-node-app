require("dotenv").config();
var moment = require("moment");
var fs = require("fs");
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var search = "";
var command = "";
var response = "";
var rotten = false;
for (i = 3; i < process.argv.length; i++){
    search = search + process.argv[i] + " ";
}
search = search.trim();
if (process.argv[2] === "concert-this"){
    axios.get("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp")
    .then(function(response){
        for (i = 2; i < process.argv.length; i++){
            command = command + process.argv[i] + " ";
        }
        fs.appendFile("log.txt", "node liri.js " + command + "\n", function(err, data){
                
        })
        for (i = 0; i < response.data.length; i++){
            var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
            console.log("The venue is " + response.data[i].venue.name + ".");
            console.log("The location of the venue is " + response.data[i].venue.city + ", " + response.data[i].venue.country + ".");
            console.log("The date of the event is " + date + "." + "\n");
            fs.appendFile("log.txt", "The venue is " + response.data[i].venue.name + "." + "\n" + "The location of the venue is " + response.data[i].venue.city + ", " + response.data[i].venue.country + "." + "\n" + "The date of the venue is " + date + "." + "\n\n", function(err, data){
                
            })
        }
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}
if (process.argv[2] === "spotify-this-song"){
    if (process.argv.length === 3){
        spotify.search({type: "track", query: "The Sign"}, function(err, data){
            console.log("Artist(s): " + data.tracks.items[4].artists[0].name);
            console.log("The song's name: " + data.tracks.items[4].name);
            console.log("Preview link: " + data.tracks.items[4].preview_url);
            console.log("Album: " + data.tracks.items[4].album.name);
            fs.appendFile("log.txt", "node liri.js spotify-this-song \n", function(err, data){

            });
            fs.appendFile("log.txt", "Artist(s): " + data.tracks.items[4].artists[0].name + "\n" + "The song's name: " + data.tracks.items[4].name + "\n" + "Preview link: " + data.tracks.items[4].preview_url + "\n" + "Album: " + data.tracks.items[4].album.name + "\n\n", function(err, data){

            })
        })
    }
    else {
    spotify.search({type: "track", query: search}, function(err, data){
        for (i = 3; i < process.argv.length; i++){
            command = command + process.argv[i] + " ";
        }
        fs.appendFile("log.txt", "node liri.js spotify-this-song " + command + "\n", function(err, data){

        })
        var randomnumber = Math.floor(Math.random() * data.tracks.items.length);
        console.log("Artist(s): " + data.tracks.items[randomnumber].artists[0].name);
        console.log("The song's name: " + data.tracks.items[randomnumber].name);
        console.log("Preview link: " + data.tracks.items[randomnumber].preview_url);
        console.log("Album: " + data.tracks.items[randomnumber].album.name);
        fs.appendFile("log.txt", "Artist(s): " + data.tracks.items[randomnumber].artists[0].name + "\n" + "The song's name: " + data.tracks.items[randomnumber].name + "\n" + "Preview link: " + data.tracks.items[randomnumber].preview_url + "\n" + "Album: " + data.tracks.items[randomnumber].album.name + "\n\n", function(err, data){

        })
    })
}
}
if (process.argv[2] === "movie-this"){
    if (process.argv.length === 3){
        axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy")
            .then(function(response){
        fs.appendFile("log.txt", "node liri.js movie-this" + "\n", function(err, data){

        })
        var rotten = false;
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("imdb Rating: " + response.data.imdbRating);
        for (i = 0; i < response.data.Ratings.length; i++){
            if (response.data.Ratings[i].Source === "Rotten Tomatoes"){
                rotten = true;
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                break;
            }
        }
        if (rotten === false){
            console.log("Rotten Tomatoes Rating: N/A");
        }
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        fs.appendFile("log.txt", "Title: " + response.data.Title + "\n" + "Year: " + response.data.Year + "\n" + "imdb Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n\n", function(err, data){

        })
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    }
    else{
    axios.get("http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy")
    .then(function(response){
        fs.appendFile("log.txt", "node liri.js movie-this " + search + "\n", function(err, data){

        });
        rotten = false;
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("imdb Rating: " + response.data.imdbRating);
        for (i = 0; i < response.data.Ratings.length; i++){
            if (response.data.Ratings[i].Source === "Rotten Tomatoes"){
                rotten = true;
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                break;
            }
        }
        if (rotten === false){
            console.log("Rotten Tomatoes Rating: N/A");
        }
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        if (rotten === true){
            response = "Title: " + response.data.Title + "\n" + "Year: " + response.data.Year + "\n" + "imdb Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n\n"
        }
        else {
            response = "Title: " + response.data.Title + "\n" + "Year: " + response.data.Year + "\n" + "imdb Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: N/A" + "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n\n"
        }
        fs.appendFile("log.txt", response, function(err, data){
    
        })
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
}
}
if (process.argv[2] === "do-what-it-says"){
    fs.appendFile("log.txt", "node liri.js do-what-it-says" + "\n", function(err, data){

    })
    fs.readFile("random.txt", "utf-8", function(err, data){
        var command = data.split(",");
        if (command[0] === "spotify-this-song"){
            if (command.length === 1){
                spotify.search({type: "track", query: "The Sign"}, function(err, data){
                    console.log("Artist(s): " + data.tracks.items[4].artists[0].name);
                    console.log("The song's name: " + data.tracks.items[4].name);
                    console.log("Preview link: " + data.tracks.items[4].preview_url);
                    console.log("Album: " + data.tracks.items[4].album.name);
                    fs.appendFile("log.txt", "Artist(s): " + data.tracks.items[4].artists[0].name + "\n" + "The song's name: " + data.tracks.items[4].name + "\n" + "Preview link: " + data.tracks.items[4].preview_url + "\n" + "Album: " + data.tracks.items[4].album.name + "\n\n", function(err, data){
        
                    })
                })
            }
            else{
            spotify.search({type: "track", query: command[1].trim()}, function(err, data){
                var randomnumber = Math.floor(Math.random() * data.tracks.items.length);
                console.log("Artist(s): " + data.tracks.items[randomnumber].artists[0].name);
                console.log("The song's name: " + data.tracks.items[randomnumber].name);
                console.log("Preview link: " + data.tracks.items[randomnumber].preview_url);
                console.log("Album: " + data.tracks.items[randomnumber].album.name);
                fs.appendFile("log.txt", "Artist(s): " + data.tracks.items[randomnumber].artists[0].name + "\n" + "The song's name: " + data.tracks.items[randomnumber].name + "\n" + "Preview link: " + data.tracks.items[randomnumber].preview_url + "\n" + "Album: " + data.tracks.items[randomnumber].album.name + "\n\n", function(err, data){

                })
            })
        }
        }
        if (command[0] === "movie-this"){
            if (command.length === 1){
                axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy")
            .then(function(response){
        var rotten = false;
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("imdb Rating: " + response.data.imdbRating);
        for (i = 0; i < response.data.Ratings.length; i++){
            if (response.data.Ratings[i].Source === "Rotten Tomatoes"){
                rotten = true;
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                break;
            }
        }
        if (rotten === false){
            console.log("Rotten Tomatoes Rating: N/A");
        }
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        fs.appendFile("log.txt", "Title: " + response.data.Title + "\n" + "Year: " + response.data.Year + "\n" + "imdb Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n\n", function(err, data){

        })
    }).catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
            }
            else{
            axios.get("http://www.omdbapi.com/?t=" + command[1].trim() + "&y=&plot=short&apikey=trilogy")
                .then(function(response){
            var rotten = false;
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("imdb Rating: " + response.data.imdbRating);
            for (i = 0; i < response.data.Ratings.length; i++){
                if (response.data.Ratings[i].Source === "Rotten Tomatoes"){
                    rotten = true;
                    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                    break;
                }
            }
            if (rotten === false){
                console.log("Rotten Tomatoes Rating: " + "N/A");
            }
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            if (rotten === true){
                response = "Title: " + response.data.Title + "\n" + "Year: " + response.data.Year + "\n" + "imdb Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n\n"
            }
            else {
                response = "Title: " + response.data.Title + "\n" + "Year: " + response.data.Year + "\n" + "imdb Rating: " + response.data.imdbRating + "\n" + "Rotten Tomatoes Rating: N/A" + "\n" + "Country: " + response.data.Country + "\n" + "Language: " + response.data.Language + "\n" + "Plot: " + response.data.Plot + "\n" + "Actors: " + response.data.Actors + "\n\n"
            }
            fs.appendFile("log.txt", response, function(err, data){
        
            })
                }).catch(function(error) {
                    if (error.response) {
                      // The request was made and the server responded with a status code
                      // that falls out of the range of 2xx
                      console.log("---------------Data---------------");
                      console.log(error.response.data);
                      console.log("---------------Status---------------");
                      console.log(error.response.status);
                      console.log("---------------Status---------------");
                      console.log(error.response.headers);
                    } else if (error.request) {
                      // The request was made but no response was received
                      // `error.request` is an object that comes back with details pertaining to the error that occurred.
                      console.log(error.request);
                    } else {
                      // Something happened in setting up the request that triggered an Error
                      console.log("Error", error.message);
                    }
                    console.log(error.config);
                  });
            }
            }
        if (command[0] === "concert-this"){
            axios.get("https://rest.bandsintown.com/artists/" + command[1].trim() + "/events?app_id=codingbootcamp")
                .then(function(response){
            for (i = 0; i < response.data.length; i++){
                var date = moment(response.data[i].datetime).format("MM/DD/YYYY");
                console.log("The venue is " + response.data[i].venue.name + ".");
                console.log("The location of the venue is " + response.data[i].venue.city+ ", " + response.data[i].venue.country + ".");
                console.log("The date of the event is " + date + ".\n");
                fs.appendFile("log.txt", "The venue is " + response.data[i].venue.name + "." + "\n" + "The location of the venue is " + response.data[i].venue.city + ", " + response.data[i].venue.country + "." + "\n" + "The date of the venue is " + date + "." + "\n\n", function(err, data){
                
                })
                }
            
            }).catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("---------------Data---------------");
                  console.log(error.response.data);
                  console.log("---------------Status---------------");
                  console.log(error.response.status);
                  console.log("---------------Status---------------");
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
              });
        }
    });
}