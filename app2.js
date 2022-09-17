const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const handlebars = require('express-handlebars');
  
const request = require('request')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));


// Create call_api
//

function call_api(finishedAPI, ticker) {
	request('https://cloud.iexapis.com/stable/stock/'+ ticker + '/quote?token=pk_386470d05f1443768892f3146cf72872', {json: true}, 
		(err, res, body) => {
		if (err) { return console.log(err); }
				console.log("inside call_api");
			// console.log(body);
		if (res.statusCode == 200) {
			finishedAPI(body);
		}	
		}
	)

};

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' } ) );
app.set('view engine', 'handlebars');
app.set('views', './views');

mystuff = 'result from running exec';

app.get('/', function (req, res) {
		call_api( function(doneAPI) {
		res.render('home', {
			stock: doneAPI,
			posted_stuff: Math.round ( doneAPI.marketCap / 1000000000 )
		});
		}, "fb");
});

/*

app.post('/', function (req, res) {
		call_api( function(doneAPI) {
			posted_stuff = req.body.stock_ticker;
			// console.log(posted_stuff);
			res.render('home', {
			stock: doneAPI,
			posted_stuff: Math.round ( doneAPI.marketCap / 1000000000 )
		});
		}, req.body.stock_ticker);
});
*/

app.post('/', function (req, res) {
		call_api( function(doneAPI) {
			posted_stuff = req.body.status;
			// console.log(posted_stuff);
			res.render('home', {
			stock: doneAPI,
			posted_stuff: Math.round ( doneAPI.marketCap / 1000000000 )
		});
		}, req.body.status);
});

aboutme = 'there is something about me'

app.get('/about.html', function (req, res) {
		res.render('about', {
			stuff: aboutme
		});
});

    
app.use(express.static(path.join(__dirname, 'public')));
    
app.listen(PORT, () => console.log('Server is Listening on Port ' + PORT));

// api key   pk_386470d05f1443768892f3146cf72872
