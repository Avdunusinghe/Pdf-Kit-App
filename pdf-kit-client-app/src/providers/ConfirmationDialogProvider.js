import { useState } from "react";
import { ConfirmationDialogContext } from "../components/context/ConfirmationDialogContext";

export const ConfirmationDialogProvider = ({ children }) => {
	const [dialogState, setDialogState] = useState({
		open: false,
		title: "",
		description: "",
		agreeButtonText: "",
		disagreeButtonText: "",
		onAgree: null,
		onDisagree: null,
	});

	const openDialog = (options) => {
		setDialogState({
			open: true,
			title: options.title || "Confirmation",
			description: options.description || "",
			agreeButtonText: options.agreeButtonText || "Agree",
			disagreeButtonText: options.disagreeButtonText || "Disagree",
			onAgree: options.onAgree,
			onDisagree: options.onDisagree,
		});
	};

	const closeDialog = () => {
		setDialogState((prevState) => ({
			...prevState,
			open: false,
		}));
	};

	return (
		<ConfirmationDialogContext.Provider value={{ dialogState, openDialog, closeDialog }}>
			{children}
		</ConfirmationDialogContext.Provider>
	);
};
