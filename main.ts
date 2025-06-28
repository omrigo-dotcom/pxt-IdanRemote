//% color=#007ACC icon="\u21BA" block="שלט"
namespace RemoteControl {
    /**
     * בודק אם כפתור מחובר ל־%pin% לחוץ
     */
    //% block="האם כפתור מחובר ל־%pin% לחוץ"
    export function isButtonPressed(pin: DigitalPin): boolean {
        return pins.digitalReadPin(pin) == 0
    }

    /**
     * קורא ערך מהפין
     */
    //% block="ערך דיגיטלי מהפין %pin%"
    export function readPin(pin: DigitalPin): number {
        return pins.digitalReadPin(pin)
    }
}
