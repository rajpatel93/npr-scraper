

## <a name="technologies-used"></a> :computer: Technologies Used 
 
* MongoDB
* mLab (Heroku add-on)
* Robo 3T 
* Node.js
* Heroku
* JavaScript
* jQuery
* Handlebars.js
* Materialize
* HTML5
* CSS3
* Node Modules
	* [mongoose](https://www.npmjs.com/package/mongoose)
	* [cheerio](https://www.npmjs.com/package/cheerio)
	* [bluebird](https://www.npmjs.com/package/bluebird)
	* [express](https://www.npmjs.com/package/express)
	* [express-handlebars](https://www.npmjs.com/package/express-handlebars) 
	* [body-parser](https://www.npmjs.com/package/body-parser)
	* [request](https://www.npmjs.com/package/request)
	* [morgan](https://www.npmjs.com/package/morgan) 
	* [dotenv](https://www.npmjs.com/package/dotenv) 


## <a name="installation"></a> :dvd: Installation and Usage 

* Install [Node.js](https://nodejs.org/en/download/) and [MongoDB](https://www.mongodb.com/download-center?jmp=tutorials&_ga=2.176027621.697407620.1498408984-208158305.1498000237#community), if you don't have it.
* Clone the Mongo-News-Scraper repository to your local computer.
* On your terminal, run the command 'mongod --dbpath ~/DATA/DB' (modify based on the path you set)
* On a separate terminal window, navigate to the folder where the repository is located.
* Run the command `npm install` to download all required dependencies.
* Run the command `node server.js` to start the server.
* Type 'localhost: 3000' on a browser to view the app.


## <a name="features"></a> :boom: Features

* Read the latest scraped articles from NPR when first entering the site
* Read the headline, summary and byline of newly scraped articles
* Click "Read" to read the full article on NPR's website
* Add notes to articles
* Save and unsave articles
* Click "Saved" to see only saved articles
* Hide and unhide articles
* Click "Hidden" to see only hidden articles
* Click "Home" or "Scrape New Articles" to see unsaved and unhidden articles 
* Delete any comments
* Click "Scrape New Articles" to rescrape articles from NPR's site

