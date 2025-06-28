//% color=#007ACC icon="\u21BA" block="שלט"
namespace RemoteControl {
    // מיפוי שמות כפתורים לפינים
    let pinsMap = [DigitalPin.P0, DigitalPin.P1, DigitalPin.P2, DigitalPin.P3]
    let wasPressed = [0, 0, 0, 0]

    /**
     * כפתורי שלט (ממופים לפינים)
     */
    //% block="כפתור שלט"
    export enum RemoteButton {
        //% block="קדימה"
        Up = 0,
        //% block="אחורה"
        Down = 1,
        //% block="שמאלה"
        Left = 2,
        //% block="ימינה"
        Right = 3
    }

    /**
     * כאשר נלחץ כפתור מסוים
     */
    //% block="כאשר נלחץ כפתור %btn"
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
     * כאשר משוחרר כפתור מסוים
     */
    //% block="כאשר משוחרר כפתור %btn"
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
     * כאשר אף כפתור אינו לחוץ
     */
    //% block="כאשר אף כפתור אינו לחוץ"
    export function onNoButtonPressed(handler: () => void) {
        control.inBackground(() => {
            while (true) {
                let anyPressed = false
                for (let i = 0; i < pinsMap.length; i++) {
                    if (pins.digitalReadPin(pinsMap[i]) == 0) {
                        anyPressed = true
                    }
                }
                if (!anyPressed) {
                    handler()
                    basic.pause(500) // למניעת קריאות מרובות
                }
                basic.pause(20)
            }
        })
    }
}
