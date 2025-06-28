//% color=#007ACC icon="\u21BA" block="שלט"
namespace RemoteControl {
    enum RemoteButton {
        //% block="למעלה"
        Up = 0,
        //% block="למטה"
        Down = 1,
        //% block="שמאלה"
        Left = 2,
        //% block="ימינה"
        Right = 3
    }

    let pinsMap = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P3]
    let wasPressed = [0, 0, 0, 0]

    /**
     * מפעיל קוד כשנלחץ כפתור מסוים
     */
    //% block="כאשר נלחץ כפתור %btn"
    export function onButtonPressed(btn: RemoteButton, handler: () => void) {
        control.inBackground(function () {
            while (true) {
                let pin = pinsMap[btn]
                if (pins.digitalReadPin(pin) == 0 && wasPressed[btn] == 0) {
                    wasPressed[btn] = 1
                    handler()
                } else if (pins.digitalReadPin(pin) == 1) {
                    wasPressed[btn] = 0
                }
                basic.pause(20)
            }
        })
    }
}
