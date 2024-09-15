import { Backdrop, CircularProgress } from "@mui/material";
import BackdropContext from "../../context/BackDropContext";
import { useState } from "react";

export const BackdropProvider = ({ children }) => {
	const [open, setOpen] = useState(false);

	const showBackdrop = () => setOpen(true);
	const hideBackdrop = () => setOpen(false);

	return (
		<BackdropContext.Provider value={{ showBackdrop, hideBackdrop }}>
			{children}
			<Backdrop
				open={open}
				style={{ zIndex: 9999 }}
				sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</BackdropContext.Provider>
	);
};
