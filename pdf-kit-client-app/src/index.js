import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BackdropProvider } from "./components/app-ui-kit/back-drop-provider/BackdropProvider";
import { ConfirmationDialogProvider } from "./providers/ConfirmationDialogProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ConfirmationDialogProvider>
			<BackdropProvider>
				<App />
			</BackdropProvider>
		</ConfirmationDialogProvider>
	</React.StrictMode>
);

reportWebVitals();
