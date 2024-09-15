import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	TextField,
} from "@mui/material";
import ReportHelper from "./core/helpers/ReportHelper";
import ReportService from "./core/services/ReportService";
import UserService from "./core/services/UserService";
import AppPaginatedTable from "./components/app-ui-kit/app-paginated-table/AppPaginatedTable";
import { useBackdrop } from "./components/hooks/UseBackDrop";
import ConfirmationDialog from "./components/app-ui-kit/confirmation-dialog/ConfirmationDialog";
import { useConfirmationDialog } from "./components/hooks/UserConfirmationDialog";

function App() {
	const { showBackdrop, hideBackdrop } = useBackdrop();
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchText, setSearchText] = useState("");
	const [totalRecords, setTotalRecords] = useState(0);
	const { openDialog } = useConfirmationDialog();
	useEffect(() => {
		getPaginatedUsersByFilterAsync(page + 1, rowsPerPage);
	}, [page, rowsPerPage, searchText]);

	const getPaginatedUsersByFilterAsync = async (pageNumber = 1, pageSize = rowsPerPage) => {
		try {
			showBackdrop();
			const response = await UserService.getPaginatedUsersByFilterAsync(searchText, pageNumber, pageSize);
			const { items, totalRecordCount } = response.data;
			setUsers(items);
			setTotalRecords(totalRecordCount);
			setTimeout(() => {
				hideBackdrop();
			}, 2000);
		} catch (error) {
			hideBackdrop();
			toast.error("Error has been occurred please try again");
		}
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleSearchChange = (event) => {
		setSearchText(event.target.value);
		setPage(0);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleDownload = async () => {
		try {
			const response = await ReportService.downloadReportAsync();
			const contentDisposition = response.headers["content-disposition"];

			let fileName = ReportHelper.getFileNameByContentDispositionHeader(contentDisposition);

			const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers["content-type"] }));

			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", fileName);
			document.body.appendChild(link);
			link.click();

			link.remove();
			window.URL.revokeObjectURL(url);
		} catch (error) {
			toast.error("Error has been occurred please try again");
		}
	};

	const handleDelete = (userToDelete) => {
		openDialog({
			description: "Are you want to delete this record",
			onAgree: () => console.log("Agreed"),
			onDisagree: () => console.log("Disagreed"),
		});
	};

	const handleUpdate = (user) => {
		toast.warn("Please Implement your logic");
	};

	const columns = [
		{ label: "Full Name", field: "fullName" },
		{ label: "Phone Number", field: "phoneNumber" },
		{ label: "Email", field: "email" },
		{ label: "Address", field: "address" },
	];

	return (
		<div className="container mt-4">
			<div className="row mb-3">
				<div className="col-md-6 mb-2 mb-md-0">
					<Button variant="contained" color="primary" onClick={handleDownload}>
						Download File
					</Button>
				</div>
				<div className="col-md-6">
					<TextField
						label="Search"
						variant="outlined"
						fullWidth
						margin="normal"
						value={searchText}
						onChange={handleSearchChange}
					/>
				</div>
			</div>
			<AppPaginatedTable
				columns={columns}
				data={users}
				totalRecords={totalRecords}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				onDelete={handleDelete}
				onUpdate={handleUpdate}
			/>
			<ToastContainer />
			<ConfirmationDialog />
		</div>
	);
}

export default App;
