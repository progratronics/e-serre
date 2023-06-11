//Importer les différentes bibiliothéques nécessaires
var http = require("http");
var fs = require("fs");
var index = fs.readFileSync("index.html");
var styleDesktop = fs.readFileSync("stylesheets/desktop.css");
var styleSmartphone = fs.readFileSync("stylesheets/smartphone.css");
var styleTablet = fs.readFileSync("stylesheets/tablet.css");
var script = fs.readFileSync("script.js");
var script1 = fs.readFileSync("raphael-2.1.4.min.js");
var script2 = fs.readFileSync("justgage.js");
var fan = fs.readFileSync("assets/fan.svg");
var pump = fs.readFileSync("assets/pump.svg");


var SerialPort = require("serialport");

const parsers = SerialPort.parsers;

const parser = new parsers.Readline({
    // On configure le délimiteur
    delimiter: "\r\n",
});

// On configure les attributs de l'objet port
var port = new SerialPort("/dev/ttyACM0", {
    baudRate: 9600,
    dataBits: 8,
    parity: "none",
    stopBits: 1,
    flowControl: false,
});

port.pipe(parser);

// Créer l'application web
var app = http.createServer(function(req, res) {
    switch (req.url) {
        case "/stylesheets/desktop.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(styleDesktop);
            break;
        case "/stylesheets/smartphone.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(styleSmartphone);
            break;
        case "/stylesheets/tablet.css" :
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(styleTablet);
            break;
         case "/raphael-2.1.4.min.js" :
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(script1);
            break;
         case "/justgage.js" :
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(script2);
            break;
         case "/script.js" :
            res.writeHead(200, {"Content-Type": "text/javascript"});
            res.write(script);
            break;
         case "/assets/fan.svg" :
            res.writeHead(200, {"Content-Type": "image/svg+xml"});
            res.write(fan);
            break;
         case "/assets/pump.svg" :
            res.writeHead(200, {"Content-Type": "image/svg+xml"});
            res.write(pump);
            break;     
        default :
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(index);
    }
    res.end();
});


// Créer une instance de type socket qui nous permettra de faire la connection entre le serveur et la page web
var io = require("socket.io").listen(app);

// Lancer l'écoute du port série
io.on("connection", function(socket) {
    console.log("Node is listening to port");
});

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// .emit permet d'envoyer des données vers la page web
parser.on("data", function(data) {

    //console.log("Received data from port: " + data);
    io.emit("data", data);
    const measures = data.split(",");
    sensors = ["temperatureValue", "humidityValue", "sead_humidityValue", "brightnessValue", "carbonValue", "waterValue"];

    for (let i = 0; i < 6; i++) {
        io.emit(sensors[i], measures[i]);
        //console.log(sensors[i],measures[i]);
    }

    var date_ob = new Date();
    var day = ("0" + date_ob.getDate()).slice(-2);
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    var year = date_ob.getFullYear();
    var hours = date_ob.getHours();
    var minutes = date_ob.getMinutes();
    var seconds = date_ob.getSeconds();
    var dateTime = year + "/" + month + "/" + day + " " + hours + ":" + minutes + ":" + seconds;

    // On ajoute un retour de ligne à chaque donnée reçue sur le port série
    dataF = dateTime + "," + data + "\n";

    // Écrire les données reçues depuis le port série vers un fichier csv qui servira de base de données pour nos graphes
    fs.writeFile("data.csv", dataF, {
        flag: "a+"
    }, (err) => {});
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Premier argument = emit('this') du front
// À chaque connection on active cette fonction
io.on("connection", function(client) {
    console.log("Client connected...");


    var pumpState = 1;
    //when the server receives "ActivatePump", do this
    client.on("pumpClicked", function(data) {
        if (pumpState == 0) {
            //port.write("0");
            console.log("0");
            pumpState = 1;
        } else {
            //port.write("1");
            console.log("1");
            pumpState = 0;
        }
    });


    var fanState = 1;
    //when the server receives "ActivatePump", do this
    client.on("fanClicked", function(data) {
        if (fanState == 0) {
            //port.write("2");
            console.log("0");
            fanState = 1;
        } else {
            //port.write("3");
            console.log("1");
            fanState = 0;
        }

    });

});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// On peut faire passer l'adresse IP comme argument sous script
IPAddress = "192.168.66.40"
app.listen(3000);
