

int sead_humidity(int pin) {
  return analogRead(pin);
}

int brightness(int pin) {
  return analogRead(pin);
}

int carbon(int pin) {
  return analogRead(pin);
}

int water_level(int trigger_pin,int echo_pin) {
  digitalWrite (trigger_pin, HIGH);
  delayMicroseconds (10);
  digitalWrite (trigger_pin, LOW);
  int time = pulseIn (echo_pin, HIGH);
  return (int)((time * 0.034) / 2);
  }
