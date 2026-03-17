import type React from "react";

import ReactDOM from "react-dom/client";

import { ClockPage } from "./clock";
import "./styles/index.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

export const App: React.FC = () => <ClockPage />;

ReactDOM.createRoot(rootElement).render(<App />);
