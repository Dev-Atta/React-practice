# Password Generator — React Learning Notes

A password generator built with React hooks: `useState`, `useCallback`, `useEffect`, `useRef`.

## What It Does

- Generates a random password based on user settings
- User can adjust password length with a slider
- User can toggle numbers and symbols on/off
- Password updates automatically whenever a setting changes
- Copy-to-clipboard button, with the password text visually selected first

---

## Full Code

```jsx
import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYabcdefghijklmnopqrstuvwxy";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*(){}:|~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 className="text-3xl text-white font-bold mb-6">Password Generator</h1>

      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-4 bg-gray-800">
        <div className="flex mb-4">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full py-2 px-3 text-white outline-none"
            ref={passwordRef}
          />
          <button className="bg-blue-600 text-white px-4 py-2" onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>

        <div className="flex gap-4 text-white text-sm">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <label>Length: {length}</label>

          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed(!numberAllowed)}
          />
          <label>Numbers</label>

          <input
            type="checkbox"
            checked={characterAllowed}
            onChange={() => setCharacterAllowed(!characterAllowed)}
          />
          <label>Symbols</label>
        </div>
      </div>
    </div>
  );
}

export default App
```

---

## How Data Flows (the full chain)

1. User checks "Symbols" → `onChange` fires → `setCharacterAllowed(true)`.
2. State change triggers a **re-render** of `App`.
3. `useCallback` sees `characterAllowed` changed (it's in `generatePassword`'s dependency array) → creates a **new** `generatePassword` function reference.
4. `useEffect` sees `generatePassword` (and `characterAllowed`) changed → runs its effect → calls `generatePassword()`.
5. Inside `generatePassword`, `str` gets built first (character pool decided), *then* the `for` loop runs, picking random characters from that pool.
6. `setPassword(pass)` fires once, after the loop finishes.
7. Final re-render — the `<input>` shows the new password.

**Key insight:** the `if` statements decide the *character pool* (upfront, once). The `for` loop's `Math.random()` decides *which* character gets picked from that pool, on each iteration. Two separate steps, not nested logic.

---

## Hooks Used, and Why

### `useState`
Holds values that the UI needs to react to — `length`, `numberAllowed`, `characterAllowed`, `password`. Calling the setter triggers a re-render.

### `useCallback`
Memoizes `generatePassword` and `copyPasswordToClipboard` — keeps the same function reference across renders unless a listed dependency changes. Matters here because `useEffect` depends on `generatePassword` itself; without `useCallback`, a new function would be created every render, causing `useEffect` to fire on every render too (infinite-loop-adjacent behavior).

### `useEffect`
Runs `generatePassword()` automatically whenever `length`, `numberAllowed`, or `characterAllowed` changes — so the password regenerates without manually calling the function from every input's `onChange`.

### `useRef`
`passwordRef` holds a direct reference to the `<input>` DOM element. Used in `copyPasswordToClipboard` to call `.select()` — visually highlighting the text right before copying it. Doesn't cause re-renders when accessed.

---

## Rules of Hooks (important)

- Hooks must be called at the **top level** of the component — never nested inside another function, another hook's callback, a loop, or an `if` block.
- Hooks must always run in the same order, every render — React tracks them by call order.

**Bug I hit:** defined `copyPasswordToClipboard` as a `useCallback` *inside* `generatePassword`'s `useCallback`. This broke the rules of hooks *and* scoped the function so it wasn't accessible outside — fixed by pulling it out as its own top-level hook.

---

## Bugs I Ran Into (and the lessons)

| Bug | Cause | Lesson |
|---|---|---|
| `array.length` in the for-loop | `array` was never defined | Should reference actual state (`length`) |
| Password not generating | Used `length` instead of state named `lenght` — silently resolved to `window.length` (a real browser global, defaults to 0) | A typo that accidentally matches something else in scope fails silently, not with an error — much harder to catch |
| Symbols checkbox not working | Called `setCharacterAllowed`, but state was declared with typo `setChracterAllowed` | Copy-paste setter names instead of retyping, to avoid typo mismatches |
| `onClick{...}` instead of `onClick={...}` | Missing `=` before the curly brace | Every JSX prop with a value needs `=` |
| `pass = str.charAt(char)` overwriting every loop | Used `=` instead of `+=` | `=` replaces, `+=` appends — needed for building a string in a loop |
| Random index going out of bounds | `Math.floor((Math.random() * str.length) + 1)` | Valid indices are `0` to `length - 1`; the standard formula is `Math.floor(Math.random() * str.length)`, no `+1` |
| Background color not changing | Passed a Tailwind class string into `style={{ backgroundColor: color }}` | Tailwind classes go in `className`; `style` needs real CSS values |
| Two `export default` in `vite.config.js` | Merged Tailwind setup by adding a second config block instead of merging into the existing one | A file can only have one `export default` |
| `npx tailwindcss init -p` failing | Command is for Tailwind v3; project used v4 (`@tailwindcss/vite`) | v4 with Vite needs no config file — just the plugin + one `@import "tailwindcss"` line |

---

## Core Concepts Recap

- **Virtual DOM**: an in-memory draft of the UI. React diffs the new draft against the old one (reconciliation) and only updates the real DOM where something actually changed.
- **State vs Ref**: `useState` changes trigger a re-render (for UI-visible data). `useRef` changes do not (for DOM access or values the UI doesn't need to react to).
- **Props**: one-directional data flow, parent → child. Destructuring props in the function signature (`{ name = "default" }`) means `props` no longer exists as a variable — use the destructured names directly.
- **`Math.floor(Math.random() * n)`**: the standard formula for a random valid index into an array/string of length `n` (range `0` to `n-1`).