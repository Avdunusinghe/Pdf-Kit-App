import { useContext } from "react";
import { ConfirmationDialogContext } from "../context/ConfirmationDialogContext";

export const useConfirmationDialog = () => useContext(ConfirmationDialogContext);
