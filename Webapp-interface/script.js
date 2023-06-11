
    <script src='https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js'></script>
    <script src="https://code.jscharting.com/2.9.0/jscharting.js"></script>

 var socket = io();

        function pump() {
            //Ce message est envoyé vers le serveur qui s'en occupe
            socket.emit('pumpClicked');
        }

        function fan() {
            //Ce message est envoyé vers le serveur qui s'en occupe
            socket.emit('fanClicked');
        }



        var temperatureValueGlobal;
        socket.on('temperatureValue', function(temperatureValue) {
           // document.getElementById("temperature_element").innerHTML = 'La température ' + temperatureValue;
           temperatureValueGlobal = temperatureValue;
        });

        var humidityValueGlobal;
        socket.on('humidityValue', function(humidityValue) {
           // document.getElementById("humidity_element").innerHTML = 'L\'humidité ' + humidityValue;
            humidityValueGlobal = humidityValue;
        });

        var sead_humidityValueGlobal;
        socket.on('sead_humidityValue', function(sead_humidityValue) {
           // document.getElementById("sead_humidity_element").innerHTML = 'L\'humidité dans le sol ' + sead_humidityValue;
            sead_humidityValueGlobal = sead_humidityValue;
        });


        var brightnessValueGlobal;
        socket.on('brightnessValue', function(brightnessValue) {
           // document.getElementById("brightness_element").innerHTML = 'L\'intensité lumineuse ' + brightnessValue;
            brightnessValueGlobal = brightnessValue;
        });

        var carbonValueGlobal;
        socket.on('carbonValue', function(carbonValue) {
           // document.getElementById("carbon_element").innerHTML = 'Le niveau de Co2 ' + carbonValue;
            carbonValueGlobal = carbonValue;
        });

        //var waterValueGlobal=0;
        //socket.on('waterValue', function(waterValue) {
            //document.getElementById("water_element").innerHTML = 'Le niveau d\'eau ' + waterValue;
            //waterValueGlobal = waterValue;
          //  console.log(waterValueGlobal);
        //});

        var waterValueGlobal;
        var a;
        socket.on('waterValue', function(waterValue) {
            waterValueGlobal = waterValue;
            //console.log(1);
            //console.log(waterValue);
            a=2;
        });


        var g1,g2,g3,g4,g5,g6;

              window.onload = function(){
                var g1 = new JustGage({
                  id: "g1s",
                  value: 0,
                  min: 0,
                  max: 100,
                  title: "Big Fella",
                  label: "pounds"
                });
                        var g2 = new JustGage({
                  id: "g2s",
                  value: 0,
                  min: 0,
                  max: 100,
                  title: "Big Fella",
                  label: "pounds"
                });
                        var g3 = new JustGage({
                  id: "g3s",
                  value: 0,
                  min: 0,
                  max: 100,
                  title: "Big Fella",
                  label: "pounds"
                });
                        var g4 = new JustGage({
                  id: "g4s",
                  value: 0,
                  min: 0,
                  max: 100,
                  title: "Big Fella",
                  label: "pounds"
                });

                                        var g5 = new JustGage({
                  id: "g5s",
                  value: 0,
                  min: 0,
                  max: 100,
                  title: "Big Fella",
                  label: "pounds"
                });


                                                        var g6 = new JustGage({
                  id: "g6s",
                  value: getRandomInt(0, 100),
                  min: 0,
                  max: 100,
                  title: "Big Fella",
                  label: "pounds"
                });

                setInterval(function() {

        g1.refresh(temperatureValueGlobal);
        g2.refresh(humidityValueGlobal);
        g3.refresh(sead_humidityValueGlobal);
        g4.refresh(brightnessValueGlobal);
        g5.refresh(carbonValueGlobal);
        g6.refresh(waterValueGlobal);
         
        }, 2500);
      };

