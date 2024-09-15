import { useContext } from "react";
import BackdropContext from "../context/BackDropContext";

export const useBackdrop = () => useContext(BackdropContext);
