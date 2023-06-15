import React from "react";
import ReactDOM from "react-dom/client";

const ele = document.getElementById("root");
const root = ReactDOM.createRoot(ele);

function App() {
  return <h1>Hello World!</h1>;
}

root.render(<App />);
