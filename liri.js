require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var spotify = new Spotify(keys.spotify);

var getArtistName = function(artist) {
  return artist.name;
};
//created a function that takes an argument of song name
var getMySpotify = function(songName) {
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
  var queryUrl =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);
  axios.get(queryUrl).then(function(response) {
    console.log(response);
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
    default:
      console.log("DOES NOT KNOW");
  }
};
//function for user input
var run = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

run(process.argv[2], process.argv[3]);
