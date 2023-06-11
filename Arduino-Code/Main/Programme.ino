int PumpPin = 2;
int FanPin = 3;

#include "DHT.h"
#define DHTPIN 4
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);

int sead_humidity_Pin = A0;
int photoresistor_Pin = A1;
int carbon_Pin = A2;

int trigger_pin = 5;
int echo_pin = 6;

unsigned long previousMillis = 0;
const long interval = 3000;

void setup() {
  Serial.begin(9600);
  dht.begin();
  
  pinMode(FanPin, OUTPUT);
  pinMode(PumpPin, OUTPUT);

  pinMode(sead_humidity_Pin, INPUT);
  pinMode(photoresistor_Pin, INPUT);
  pinMode(carbon_Pin, INPUT);

  pinMode (trigger_pin, OUTPUT);
  pinMode (echo_pin, INPUT);
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    Serial.print((int)dht.readTemperature());
    Serial.print(",");
    Serial.print((int)dht.readHumidity());
    Serial.print(",");
    Serial.print(sead_humidity(sead_humidity_Pin));
    Serial.print(",");
    Serial.print(brightness(photoresistor_Pin));
    Serial.print(",");
    Serial.print(carbon(carbon_Pin));
    Serial.print(",");
    Serial.println(water_level(trigger_pin,echo_pin));

  }

  if (Serial.available() > 0) {
    char received = Serial.read();
    if (received == '1')
      fanOn(PumpPin);
    else if (received == '0')
      fanOff(PumpPin);
    else if (received == '2')
      ventiloOn(FanPin);
    else if (received == '3')
      ventiloOff(FanPin);
  }

}
