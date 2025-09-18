import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("App Version: 1.0.0");
createRoot(document.getElementById("root")!).render(
<App/>
);
console.log("React App Initialized");
