
declare const NODE_ENV: string;
if (NODE_ENV === "development")
  new EventSource("/esbuild").addEventListener("change", () =>
    location.reload()
  );
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./root_app/redux/store";

import "./index.css";
import "./root_app/styles/theme.css";
import "./root_app/styles/util.css";
import "./root_app/styles/editor.css";
import "./root_app/styles/PHome.css";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
