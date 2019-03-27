require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);

var getArtistName = function(artist) {
  return artist.name;
};
//created a function that takes an argument of song name
var getMySpotify = function(songName) {
  if (songName === undefined) {
    songName = "The Sign Ace of Base";
  }
  spotify.search({ type: "track", query: songName }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }
    // console.log(data.tracks.items[0])
    var songs = data.tracks.items;
    for (var i = 0; i < songs.length; i++) {
      console.log(i);
      console.log("Artist: " + songs[i].artists.map(getArtistName));
      console.log("Song name: " + songs[i].name);
      console.log("Preview link : " + songs[i].preview_url);
      console.log("Album: " + songs[i].album.name);
      console.log(" =============================== ");
    }
  });
};

var getMyMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr. Nobody";
  }
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  // console.log(queryUrl);

  axios.get(queryUrl).then(function(response) {
    console.log(response);
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Languauge: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
};
var getMyConcert = function(artist) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  axios.get(queryURL).then(function(response) {
    var result = response.data;
    for (var i = 0; i < result.length; i++) {
      // console.log(result[i]);
      console.log("Venue: " + result[i].venue.name);
      console.log("Venue City: " + result[i].venue.city);
      console.log("Venue Country: " + result[i].venue.country);
      console.log("Event Date: " + result[i].datetime);
      console.log(" =============================== ");
    }
  });
};
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    // console.log(data);
    var dataArr = data.split(",");
    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    }
  });
};
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "spotify-this-song":
      getMySpotify(functionData);
      break;
    case "movie-this":
      getMyMovie(functionData);
      break;
    case "concert-this":
      getMyConcert(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("DOES NOT KNOW");
  }
};
//function for user input
var run = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

run(process.argv[2], process.argv[3]);
