use video;

db.movieDetails.find({
    "genres": ["Comedy", "Crime"]
}).count();
