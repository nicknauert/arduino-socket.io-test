const j5 = require('johnny-five');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const io = require('socket.io')(server)

//////////////////////////////
//     EXPRESS

app.use(express.static('public')); // Serve up public folder

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

//////////////////////////////
//     JOHNNY FIVE

const board = new j5.Board();

let led1, led2, led3, leds;
board.on('ready', function(){
  led1 = new j5.Led(3)
  led2 = new j5.Led(5)
  led3 = new j5.Led(6)
  leds = new j5.Leds([led1, led2, led3]);

})

//////////////////////////////
//     SOCKET.IO

io.on('connection', function(client){
  console.log('client connection: ', client.id);

  client.on('leds:toggle', function(){
    leds.stop();
    leds.toggle();
  })

  client.on('leds:brightness', function(brightness){
    leds.brightness(brightness);
  })

  client.on('leds:pulse', function(){
    leds.stop()
    leds.pulse({
      easing: "in-quad",
      duration: 10000,
      cuePoints: [0, 1],
      keyFrames: [20, 255],
      metronomic: true,
      onstart: function(){
        console.log('animation stopped');
      }
    });
  })

  client.on('led1:toggle', function(){
    leds.stop();
    led1.toggle()
  })
  client.on('led2:toggle', function(){
    leds.stop();
    led2.toggle()
  })
  client.on('led3:toggle', function(){
    leds.stop();
    led3.toggle()
  })
})

const port = process.env.PORT || 3000;
server.listen( port, function(){
  console.log("Express server loaded on " + port);
})
