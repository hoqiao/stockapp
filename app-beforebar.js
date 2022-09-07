
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');
const exphbs = require('express-handlebars');
  
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/', (req, res) => {
	  res.sendFile(__dirname + '/index.html');
});
    
app.post('/', urlencodedParser, (req, res) => {
	    var data = req.body;
	    console.log('Got body with email:', data.email);
	    res.sendStatus(200);
});


app.use(express.static(path.join(__dirname, 'public')));
    
app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));
