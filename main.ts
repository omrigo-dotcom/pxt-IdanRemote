//% color=#007ACC icon="\uf11b" block="שלט"
namespace RemoteControl {
    let pinsMap = [
        DigitalPin.P0, DigitalPin.P1, DigitalPin.P2,
        DigitalPin.P3, DigitalPin.P4, DigitalPin.P10
    ]
    let wasPressed = [0, 0, 0, 0, 0, 0]

    enum RemoteButton {
        A = 0,
        B = 1,
        C = 2,
        D = 3,
        E = 4,
        F = 5
    }

    enum JoystickDirection {
        Up,
        Down,
        Right,
        Left,
        Center
    }

    /**
     * כאשר נלחץ כפתור
     */
    //% block="כאשר נלחץ כפתור %btn=A"
    //% btn.shadow="remoteButtonPicker"
    export function onButtonPressed(btn: RemoteButton, handler: () => void) {
        control.inBackground(() => {
            while (true) {
                const pin = pinsMap[btn]
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

    /**
     * כאשר משוחרר כפתור
     */
    //% block="כאשר משוחרר כפתור %btn=A"
    //% btn.shadow="remoteButtonPicker"
    export function onButtonReleased(btn: RemoteButton, handler: () => void) {
        control.inBackground(() => {
            while (true) {
                const pin = pinsMap[btn]
                if (pins.digitalReadPin(pin) == 1 && wasPressed[btn] == 1) {
                    wasPressed[btn] = 0
                    handler()
                } else if (pins.digitalReadPin(pin) == 0) {
                    wasPressed[btn] = 1
                }
                basic.pause(20)
            }
        })
    }

    /**
     * כאשר הג'ויסטיק נמצא בכיוון מסוים
     */
    //% block="כאשר ג'ויסטיק %dir"
    //% dir.shadow="joystickDirectionPicker"
    export function onJoystickDirection(dir: JoystickDirection, handler: () => void) {
        control.inBackground(() => {
            while (true) {
                let x = pins.analogReadPin(AnalogPin.P1)
                let y = pins.analogReadPin(AnalogPin.P2)

                let active = false

                switch (dir) {
                    case JoystickDirection.Up:
                        active = y < 300
                        break
                    case JoystickDirection.Down:
                        active = y > 700
                        break
                    case JoystickDirection.Left:
                        active = x < 300
                        break
                    case JoystickDirection.Right:
                        active = x > 700
                        break
                    case JoystickDirection.Center:
                        active = x >= 400 && x <= 600 && y >= 400 && y <= 600
                        break
                }

                if (active) {
                    handler()
                    basic.pause(300)
                }

                basic.pause(50)
            }
        })
    }

    // רשימות לבחירה בלבד (כדי לא להציג בלוקים עגולים)
    //% shim=TD_ID
    //% blockHidden=true
    export function remoteButtonPicker(name: RemoteButton): RemoteButton {
        return name
    }

    //% shim=TD_ID
    //% blockHidden=true
    export function joystickDirectionPicker(name: JoystickDirection): JoystickDirection {
        return name
    }
}
