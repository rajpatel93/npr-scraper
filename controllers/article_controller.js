
// dependencies
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");

// models
var Articles = require("../models/articles.js");
var Notes = require("../models/notes.js");

var router = express.Router();

// grabs an article by it's ObjectId
router.get("/articles/:id", function(req, res) {
    // queries the db to find the article with a matching id 
    Articles.findOne({ "_id": req.params.id })
    // populates all of the notes associated with it
    .populate("notes")
    // executes the query
    .exec(function(error, doc) {
        // logs any errors
        if (error) {
            console.log(error);
        }
        // sends doc to the browser as a json object
        else {
            res.json(doc);
        }
    });
});

// creates a new note or replaces an existing note
router.post("/articles/:id", function(req, res) {
    // creates a new note and passes the req.body to the entry
    var newNote = new Notes(req.body);
    // saves the new note the db
    newNote.save(function(error, doc) {
        // logs any errors
        if (error) {
            console.log(error);
        }
        else {
            // uses the article id to find and update it's note
            Articles.findOneAndUpdate({ "_id": req.params.id }, { "notes": doc._id })
            .populate("notes")
            // executes the above query
            .exec(function(err, doc) {
                 // logs any errors
                if (err) {
                    console.log(err);
                }
                else {
                    // or sends the document to the browser
                    res.send(doc);
                }
            });
        }
    });
});

// scrapes and displays news articles 
router.get("/", function(req, res) {
	// gets html body
    request("http://www.npr.org/sections/news/", function(error, response, html) {
    	// loads html into cheerio and saves it to $
        var $ = cheerio.load(html);
        // holds entry objects
        var entry = [];
        // grabs requested items from sections with classes .item.has-image
        $(".item.has-image").each(function(i, element) {
        	// empties result object
        	var result = {};
            // places selected element properties into result object
            result.title = $(this).children(".item-info").find("h2.title").text();
            result.source = $(this).children(".item-info").find("h3.slug").find("a").text();
            result.teaser = $(this).children(".item-info").find("p.teaser").text();
            result.img = $(this).children(".item-image").find("a").find("img").attr("src");
            result.link = $(this).children(".item-info").find("h2.title").find("a").attr("href");
            // creates an entry object of the Articles model  
            entry.push(new Articles(result));             
        });
        for (var i = 0; i < entry.length; i++) {
            entry[i].save(function(err, data) {
                if (err) {
                    console.log(err);
                } 
                else {
                    console.log(data);
                }
            });
            // retrieves articles from db only after all entries have been made
            if (i === (entry.length - 1)) {
                res.redirect("/articles");
            }
        }

    });
});

// gets unsaved, unhidden articles from db and displays them
router.get("/articles", function(req, res) {
    Articles.find({"status": 0}, function(err, data) {
        if (err){ 
            console.log(err);
        } else {
            res.render("index", {articles: data, current: true});
        }
    });
});

// gets saved articles from db and displays them
router.get("/saved", function(req, res) {
    Articles.find({"status": 1}, function(err, data) {
        if (err) { 
            console.log(err);
        } else {
            res.render("index", {articles: data, saved: true});
        }
    });
});

// gets hidden articles from db and displays them
router.get("/hidden", function(req, res) {
    Articles.find({"status": 2}, function(err, data) {
        if (err) { 
            console.log(err);
        } else {
            res.render("index", {articles: data, hidden: true});
        }
    });
});

// assigns saved status to article 
router.post("/save", function(req, res) {
    Articles.findOneAndUpdate({"_id": req.body.articleId}, {$set : {"status": 1}})
    .exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send("Post successful");
        }
    });
});

// assigns hidden status to article
router.post("/hide", function(req, res) {
    Articles.findOneAndUpdate({"_id": req.body.articleId}, {$set : {"status": 2}})
    .exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send("Post successful");
        }
    });
});

// removes articles from saved status 
router.post("/unsave", function(req, res) {
    Articles.findOneAndUpdate({"_id": req.body.articleId}, {$set : {"status": 0}})
    .exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send("Post successful");
        }
    });
});

// removes articles from hidden status 
router.post("/unhide", function(req, res) {
    Articles.findOneAndUpdate({"_id": req.body.articleId}, {$set : {"status": 0}})
    .exec(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.send("Post successful");
        }
    });
});

// exports routes
module.exports = router;