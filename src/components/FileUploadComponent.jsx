import React from "react";
import {
	Box,
	Paper,
	Typography,
	CircularProgress,
	Alert,
} from "@mui/material";
import { CloudUpload, CheckCircle, Error as ErrorIcon, Upload as UploadIcon } from "@mui/icons-material";

const FileUploadComponent = ({ onFileUpload, file, isValid, isLoading, error }) => {
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		const files = e.dataTransfer.files;
		if (files.length > 0) {
			onFileUpload(files[0]);
		}
	};

	const handleFileSelect = (e) => {
		const file = e.target.files[0];
		if (file) {
			onFileUpload(file);
		}
	};

	return (
		<Box sx={{ mb: 4 }}>
			<Typography variant="h5" gutterBottom fontWeight="bold">
				Upload Claim File
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
				Supported: CSV, XLSX, TSV, PDF, DOCX (≤50MB)
			</Typography>

			<Paper
				sx={{
					border: "2px dashed #e0e0e0",
					borderRadius: 2,
					p: 4,
					textAlign: "center",
					backgroundColor: "#fafafa",
					cursor: isLoading ? "not-allowed" : "pointer",
					"&:hover": {
						backgroundColor: "#f5f5f5",
						borderColor: "#1976d2",
					},
				}}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
				onClick={() => !isLoading && document.getElementById("file-input").click()}
			>
				<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
					{isLoading ? (
						<CircularProgress size={40} />
					) : (
						<Box
							sx={{
								width: 60,
								height: 60,
								borderRadius: "50%",
								backgroundColor: "#1976d2",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<CloudUpload sx={{ color: "white", fontSize: 30 }} />
						</Box>
					)}
					<Typography variant="h6" fontWeight="bold">
						{isLoading ? "Processing File..." : "Drag & Drop or Select File"}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{isLoading ? "Please wait while we process your file" : "Drop your claim file here or click to browse."}
					</Typography>
				</Box>
				<input
					id="file-input"
					type="file"
					hidden
					accept=".csv,.xlsx,.tsv,.pdf,.docx"
					onChange={handleFileSelect}
					disabled={isLoading}
				/>
			</Paper>

			{file && (
				<Box sx={{ mt: 2 }}>
					{error ? (
						<Alert severity="error" icon={<ErrorIcon />}>
							{error}
						</Alert>
					) : (
						<Alert severity={isValid ? "success" : "info"} icon={isValid ? <CheckCircle /> : <UploadIcon />}>
							{isValid ? `File "${file.name} processed successfully!` : `File "${file.name}" uploaded`}
						</Alert>
					)}
				</Box>
			)}
		</Box>
	);
};

export default FileUploadComponent;