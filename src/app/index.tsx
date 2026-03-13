import type React from "react";

import { ClockPage } from "@pages/clock";
import ReactDOM from "react-dom/client";

import { MoscowTimeProvider } from "./providers";
import "./styles/index.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

export const App: React.FC = () => (
  <MoscowTimeProvider>
    <ClockPage />
  </MoscowTimeProvider>
);

ReactDOM.createRoot(rootElement).render(<App />);
