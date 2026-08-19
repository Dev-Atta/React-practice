# React Props — Learning Notes

## What are props?

Props (short for "properties") let a parent component pass data into a child component.

```jsx
<Card username="Atta" channel="MyChannel" />
```

## Two ways to access them

**1. Without destructuring**
```jsx
function Card(props) {
  console.log(props.username)
}
```

**2. With destructuring (cleaner, and supports default values)**
```jsx
function Card({ username = "Guest", channel = "Default value" }) {
  console.log(username)
}
```

Once destructured in the function signature, `props` no longer exists as a variable — use `username`, `channel`, etc. directly. Mixing both styles (destructuring params but still writing `props.username` in JSX) causes a `ReferenceError`.

## Gotcha: no nested headings

```jsx
// Wrong — h1 inside h1 is invalid HTML
<h1>Welcome <h1>{username}</h1></h1>

// Right — use span for inline styling
<h1>Welcome <span className="text-indigo-600">{username}</span></h1>
```

## Key takeaway

Props flow one direction: parent → child. Default values (`= "Guest"`) kick in only when the parent doesn't pass that prop at all.