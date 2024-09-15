import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useConfirmationDialog } from "../../hooks/UserConfirmationDialog";

const ConfirmationDialog = () => {
	const { dialogState, closeDialog } = useConfirmationDialog(); // Access state and methods from the service

	const handleAgree = () => {
		if (dialogState.onAgree) {
			dialogState.onAgree();
		}
		closeDialog();
	};

	const handleDisagree = () => {
		if (dialogState.onDisagree) {
			dialogState.onDisagree();
		}
		closeDialog();
	};

	return (
		<Dialog
			open={dialogState.open}
			onClose={closeDialog}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{dialogState.title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">{dialogState.description}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleDisagree}>{dialogState.disagreeButtonText}</Button>
				<Button onClick={handleAgree} autoFocus>
					{dialogState.agreeButtonText}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
