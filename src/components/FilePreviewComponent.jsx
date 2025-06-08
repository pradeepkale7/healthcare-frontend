import React from "react";
import {
	Box,
	Paper,
	Typography,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";

const FilePreviewComponent = ({ data, headers }) => (
	<Box sx={{ mb: 4  , backgroundColor: "#f5f5f5"}}>
		<Typography variant="h6" gutterBottom fontWeight="bold">
			File Preview
		</Typography>
		<TableContainer component={Paper} sx={{ maxHeight: 800 }}>
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						{headers.map((header, index) => (
							<TableCell key={index} sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
								{header}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.slice(0,10).map((row, rowIndex) => (
						<TableRow key={rowIndex} hover>
							{headers.map((header, cellIndex) => (
								<TableCell key={cellIndex}>{row[header] || "--"}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	</Box>
);

export default FilePreviewComponent;