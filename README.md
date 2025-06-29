# Remote Control Extension for Buttons and Joystick

🎮 A MakeCode extension for working with a physical controller that includes digital buttons (A–F) and a 2-axis joystick (X/Y), using digital and analog pin readings.

---

## 📦 Features

### 🔘 Buttons (A–F)
- `on button A pressed`
- `on button A released`

Each button is connected to a digital pin (P0–P10).

### 🕹️ Joystick
- `on joystick Up / Down / Left / Right / Center`

Reads analog values from joystick axes (e.g., P1 and P2).

---

## ✨ Example Usage

```typescript
RemoteControl.onButtonPressed(RemoteControl.RemoteButton.A, function () {
    basic.showString("A")
})

RemoteControl.onJoystickDirection(RemoteControl.JoystickDirection.Up, function () {
    basic.showArrow(ArrowNames.North)
})
```

---

## ⚙️ Recommended Hardware Mapping

| Component     | Pin |
|---------------|-----|
| Button A      | P0  |
| Button B      | P1  |
| Button C      | P2  |
| Button D      | P3  |
| Button E      | P4  |
| Button F      | P10 |
| Joystick X    | P1  |
| Joystick Y    | P2  |

> You can adjust the mapping in the code as needed.

---

## 📷 Icon

To add a custom icon to the MakeCode extension tile, include an image like this in the README:

```html
<img src="icon.svg" width="100">
```

Make sure the icon file (e.g. `icon.svg`) exists in your repository.

---

## 🧩 How to Add the Extension

1. Open [MakeCode for micro:bit](https://makecode.microbit.org)
2. Click ⚙️ → **Extensions**
3. Search for: `pxt-IdanRemote` (or your repo name)
4. Add the extension and start using the `RemoteControl` blocks

---



Developed by [Omri Go](https://github.com/omrigo-dotcom)
