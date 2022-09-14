const http=require('http');
const express=require('express');
const app=express()
// const server=http.createServer((req,res)=>{
//     console.log("Got the result");
//     res.end("Here is your response");
// })

//Using express
app.get('/',(req,res)=>{
    console.log("This is get")
    res.status(200)
    res.json({
        message:"This is my Json",
        data:67,
        isSuccessful: true
    })
})
app.get('/movie',(req,res)=>{
    console.log("Movies API hit");
    res.status(200);
    res.json({
        "Instructions": "delete everything in this object and make your own JSON object using different data.",
        "Title": "The Graduate",
        "Year": "1967",
        "Rated": "Approved",
        "Released": "22 Dec 1967",
        "Runtime": "106 min",
        "Genre": [
          "Comedy",
          "Drama",
          "Romance"
        ],
        "Director": "Mike Nichols",
        "Writers": [
          "Calder Willingham (screenplay)",
          "Buck Henry (screenplay)",
          "Charles Webb (based on the novel by)"
        ],
        "Actors": [
          "Anne Bancroft",
          "Dustin Hoffman",
          "Katharine Ross",
          "William Daniels"
        ],
        "Plot": "Ben has recently graduated college, with his parents now expecting great things from him. At his \"Homecoming\" party, Mrs. Robinson, the wife of his father's business partner, has Ben drive her home, which leads to an affair between the two. The affair eventually ends, but comes back to haunt him when he finds himself falling for Elaine, Mrs. Robinson's daughter.",
        "Language": "English",
        "Country": "USA",
        "Awards": "Won 1 Oscar. Another 22 wins & 13 nominations.",
        "Poster": "http://ia.media-imdb.com/images/M/MV5BMTQ0ODc4MDk4Nl5BMl5BanBnXkFtZTcwMTEzNzgzNA@@._V1_SX300.jpg",
        "imdbRating": "8.1",
        "imdbVotes": "183,131",
        "imdbID": "tt0061722"
      })
})
const server=http.createServer(app);

server.listen(8080,'127.0.0.1',()=>{
    console.log("My  Express server is live.");
})