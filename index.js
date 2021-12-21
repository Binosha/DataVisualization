const express = require('express'); //Import the express dependency
var bodyParser = require('body-parser');
var parser = require('xml2json');
var mysql = require('./mysql');

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5001;                  //Save the port number where your server will be listening

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({limit: '50mb', extended: true})

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
    //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.post('/analyze_data', urlencodedParser, function(req, res){
    // get the xml data from the index.html
    var xmldata = req.body.xmldata;
    // convert the xml data to JSON
    var jsonObj = parser.toJson(xmldata);
    // console.log(jsonObj)
    res.send({"result": "data analyzed successfylly!", "data": jsonObj })
})


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});

app.use(express.static(__dirname + '/public'));
