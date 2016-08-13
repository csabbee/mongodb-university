use video;

db.movieDetails.update({
    $or: [
        { title: "The Truman Show" },
        { title: "Star Trek II: The Wrath of Khan" }
    ]
}, {
    $set : {
        "awards" : {
            "oscars" : [
                {"award": "bestAnimatedFeature", "result": "won"},
                {"award": "bestMusic", "result": "won"},
                {"award": "bestPicture", "result": "nominated"},
                {"award": "bestSoundEditing", "result": "nominated"},
                {"award": "bestScreenplay", "result": "nominated"}
            ],
            "wins" : 56,
            "nominations" : 86,
            "text" : "Won 2 Oscars. Another 56 wins and 86 nominations."
        }
    }
});

db.movieDetails.find({
    "awards.oscars": {
        $elemMatch: {
            "award": "bestPicture"
        }
    }
}).count();
