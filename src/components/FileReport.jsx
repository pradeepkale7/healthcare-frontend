import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Breadcrumbs, Link, CircularProgress, Alert, Snackbar, Button } from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import axios from "axios";

// Import your components
import FileInformation from "./FileInformation";
import Statistics from "./Statistics";
import ColumnMappingFile from "./ColumnMappingFile";
import ProcessingSummary from "./ProcessingSummary";
import SuccessRate from "./SuccessRate";
import HealthcareDataPreview from "./HealthcareDataPreview";

const FileReport = ({ importId }) => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const fetchReportData = async () => {
			if (!importId) {
				setError("Import ID is required");
				setLoading(false);
				return;
			}

			try {
				setLoading(true);
				const response = await axios.get(`http://127.0.0.1:8000/resource/report/${importId}`);
				console.log("Response data:", response.data);
				setData(response.data);

				console.log("File report data:", response.data.sample_data);
				setError(null);
			} catch (err) {
				console.error("Error fetching report data:", err);
				setError(err.response?.data?.message || "Failed to fetch report data");
			} finally {
				setLoading(false);
			}
		};

		fetchReportData();
	}, [importId]);

	const handleCloseError = () => {
		setError(null);
	};

	if (loading) {
		return (
			<Container maxWidth="xl" sx={{ py: 4 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: "50vh",
					}}
				>
					<CircularProgress size={48} />
				</Box>
			</Container>
		);
	}

	return (
		<Box
			sx={{
				p: 3,
			}}
		>
			{/* Main Content */}
			{data ? (
				<Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
					<FileInformation fileInfo={data.file_info} />
					<Statistics statistics={data.statistics} />
					<ColumnMappingFile columnMappings={data.column_mappings} />
					<Button variant="contained" onClick={() => setOpen(true)}>
						View Sample Data
					</Button>
					<HealthcareDataPreview open={open} onClose={() => setOpen(false)} sampleData={data.sample_data || {}} />

					<ProcessingSummary processingSummary={data.processing_summary} />
					<SuccessRate successRate={data.success_rate} />
				</Box>
			) : (
				<Alert severity="info">No data available for this import ID.</Alert>
			)}

			{/* Error Snackbar */}
			<Snackbar
				open={!!error}
				autoHideDuration={6000}
				onClose={handleCloseError}
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
			>
				<Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
					{error}
				</Alert>
			</Snackbar>
		</Box>
	);
};

export default FileReport;
