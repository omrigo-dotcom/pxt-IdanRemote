//% block="כאשר נלחץ כפתור %btn"
export function onButtonPressed(btn: RemoteButton, handler: () => void) {
  control.inBackground(() => {
    while (true) {
      const pin = pinsMap[btn];
      if (pins.digitalReadPin(pin) == 0 && wasPressed[btn] == 0) {
        wasPressed[btn] = 1;
        handler();
      } else if (pins.digitalReadPin(pin) == 1) {
        wasPressed[btn] = 0;
      }
      basic.pause(20);
    }
  });
}
