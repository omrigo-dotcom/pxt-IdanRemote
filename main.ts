//% color=#007ACC icon="\uf11b" block="שלט"
namespace RemoteControl {
    let pinsMap = [
        DigitalPin.P5, DigitalPin.P11, DigitalPin.P12,
        DigitalPin.P14, DigitalPin.P13, DigitalPin.P14
    ]
    let wasPressed = [0, 0, 0, 0, 0, 0]

    // ✨ קודם כל הכפתורים
    export enum RemoteButton {
        //% block="A"
        A = 0,
        //% block="B"
        B = 1,
        //% block="C"
        C = 2,
        //% block="D"
        D = 3,
        //% block="E"
        E = 4,
        //% block="F"
        F = 5
    }

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

    //% block="כאשר משוחרר כפתור %btn"
    export function onButtonReleased(btn: RemoteButton, handler: () => void) {
        control.inBackground(() => {
            while (true) {
                const pin = pinsMap[btn];
                if (pins.digitalReadPin(pin) == 1 && wasPressed[btn] == 1) {
                    wasPressed[btn] = 0;
                    handler();
                } else if (pins.digitalReadPin(pin) == 0) {
                    wasPressed[btn] = 1;
                }
                basic.pause(20);
            }
        });
    }

    // ✨ רק אחר כך – הג'ויסטיק
    export enum JoystickDirection {
        //% block="למעלה"
        Up,
        //% block="למטה"
        Down,
        //% block="ימינה"
        Right,
        //% block="שמאלה"
        Left,
        //% block="באמצע"
        Center
    }

    //% block="כאשר הג'ויסטיק %dir"
    export function onJoystickDirection(dir: JoystickDirection, handler: () => void) {
        control.inBackground(() => {
            while (true) {
                const x = pins.analogReadPin(AnalogPin.P0);
                const y = pins.analogReadPin(AnalogPin.P1);

                let active = false;

                switch (dir) {
                    case JoystickDirection.Up:
                        active = y < 300;
                        break;
                    case JoystickDirection.Down:
                        active = y > 700;
                        break;
                    case JoystickDirection.Left:
                        active = x < 300;
                        break;
                    case JoystickDirection.Right:
                        active = x > 700;
                        break;
                    case JoystickDirection.Center:
                        active = x >= 300 && x <= 700 && y >= 300 && y <= 700;
                        break;
                }

                if (active) {
                    handler();
                    basic.pause(300);
                }

                basic.pause(50);
            }
        });
    }
}
