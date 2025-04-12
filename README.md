# @sahilphondekar/react-component-library

A lightweight React component library built with **Vite**, **React**, and **pure CSS** — no Tailwind, no UI frameworks.

## 📦 Installation

```bash
npm install @sahilphondekar/react-component-library
```

## 🚀 Usage

1. **Import global CSS** (in `main.jsx` or `App.jsx`):

```js
import "@sahilphondekar/react-component-library/dist/react-component-library.css";
```

2. **Use components**:

```js
import { Button } from "@sahilphondekar/react-component-library";

function App() {
  return <Button onClick={() => alert("Clicked!")}>Click Me</Button>;
}
```