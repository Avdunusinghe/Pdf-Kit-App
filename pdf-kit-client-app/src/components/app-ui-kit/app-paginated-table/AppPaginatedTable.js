import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TablePagination,
	Button,
} from "@mui/material";

const AppPaginatedTable = ({
	columns,
	data,
	totalRecords,
	rowsPerPage,
	page,
	onPageChange,
	onRowsPerPageChange,
	onDelete,
	onUpdate,
}) => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Actions</TableCell>
						{columns.map((column, index) => (
							<TableCell key={index}>{column.label}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row, index) => (
						<TableRow key={index}>
							<TableCell>
								{onUpdate && (
									<Button variant="contained" color="primary" onClick={() => onUpdate(row)}>
										Update
									</Button>
								)}

								{onDelete && (
									<Button variant="contained" color="secondary" onClick={() => onDelete(row)}>
										Delete
									</Button>
								)}
							</TableCell>
							{columns.map((column, colIndex) => (
								<TableCell key={colIndex}>{row[column.field]}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className="d-flex justify-content-end mt-3">
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={totalRecords}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={onPageChange}
					onRowsPerPageChange={onRowsPerPageChange}
				/>
			</div>
		</TableContainer>
	);
};

export default AppPaginatedTable;
