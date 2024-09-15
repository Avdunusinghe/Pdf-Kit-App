import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
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
function App() {
	const [users, setUsers] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [searchText, setSearchText] = useState("");
	const [totalRecords, setTotalRecords] = useState(0);

	useEffect(() => {
		fetchUsers(page + 1, rowsPerPage);
	}, [page, rowsPerPage, searchText]);

	const fetchUsers = async (pageNumber = 1, pageSize = rowsPerPage) => {
		try {
			const response = await UserService.getPaginatedUsersByFilterAsync(searchText, pageNumber, pageSize);
			const { items, totalRecordCount } = response.data;
			setUsers(items);
			setTotalRecords(totalRecordCount);
		} catch (error) {
			console.error("Error fetching users:", error);
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
			console.log(error);

			toast.error("Error has been occurred please try again");
		}
	};

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

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Full Name</TableCell>
							<TableCell>Phone Number</TableCell>
							<TableCell>Email</TableCell>
							<TableCell>Address</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user, index) => (
							<TableRow key={index}>
								<TableCell>{user.fullName}</TableCell>
								<TableCell>{user.phoneNumber}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{user.address}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<div className="d-flex justify-content-end mt-3">
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={totalRecords}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</div>
			<ToastContainer />
		</div>
	);
}

export default App;
