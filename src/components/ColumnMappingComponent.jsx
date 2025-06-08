import React, { useState, useEffect } from "react";
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
	Select,
	MenuItem,
	FormControl,
	Chip,
	IconButton,
	Tooltip,
	Alert,
} from "@mui/material";
import { Edit, Warning, CheckCircle, AutoFixHigh, Psychology, PsychologyRounded } from "@mui/icons-material";

const ColumnMappingComponent = ({ mappings, onMappingChange, availableTargets }) => {
	const [usedTargets, setUsedTargets] = useState(new Set());
	const [conflicts, setConflicts] = useState({});
	const [manuallyChanged, setManuallyChanged] = useState({});
	const [originalMappings, setOriginalMappings] = useState({});


	// Store original AI suggestions on first render
	useEffect(() => {
		const original = {};
		mappings.forEach((mapping, index) => {
			if (mapping.matched_column && mapping.matched_column !== "Unmapped") {
				original[index] = mapping.matched_column;
			}
		});
		setOriginalMappings(original);
	}, []); // Empty dependency array - only run once

	useEffect(() => {
		// Track which targets are already used
		const used = new Set();
		const conflictMap = {};

		mappings.forEach((mapping) => {
			if (mapping.matched_column && mapping.matched_column !== "Unmapped") {
				if (used.has(mapping.matched_column)) {
					conflictMap[mapping.matched_column] = true;
				}
				used.add(mapping.matched_column);
			}
		});

		setUsedTargets(used);
		setConflicts(conflictMap);
	}, [mappings]);

	const getConfidenceColor = (confidence) => {
		if (confidence >= 0.95) return "success";
		if (confidence >= 0.9) return "warning";
		if (confidence > 0) return "info";
		return "default";
	};

	const formatConfidence = (confidence) => {
		return Math.round(confidence * 100);
	};

	const handleMappingChange = (index, newValue) => {
		// Track if this mapping was manually changed
		if (!manuallyChanged[index] && newValue !== mappings[index].matched_column) {
			setManuallyChanged((prev) => ({ ...prev, [index]: true }));
		}

		onMappingChange(index, newValue);
	};

	const getAvailableOptions = (currentMapping, mappingIndex) => {
		const options = [
			<MenuItem key="unmapped" value="Unmapped">
				<em>-- Unmapped --</em>
			</MenuItem>,
		];

		availableTargets.forEach((target) => {
			const isUsed = usedTargets.has(target);
			const isSelected = target === currentMapping.matched_column;
			// Check if this target was the original AI suggestion for this mapping
			const isOriginalLLMSuggestion = target === originalMappings[mappingIndex];

			options.push(
				<MenuItem
					key={target}
					value={target}
					sx={{
						...(isUsed && !isSelected && {
							backgroundColor: "rgba(255, 0, 0, 0.1)",
						}),
						...(isOriginalLLMSuggestion && {
							fontWeight: "bold",
							backgroundColor: "rgba(107, 219, 107, 0.1)", // optional green highlight
						}),
					}}
				>
					{target}
					{isOriginalLLMSuggestion && (
						<PsychologyRounded color="primary" sx={{ ml: 1, fontSize: "1rem" }} />
					)}
					{isUsed && !isSelected && (
						<Warning color="error" sx={{ ml: 1, fontSize: "1rem" }} />
					)}
				</MenuItem>
			);
		});

		return options;
	};

	return (
		<Box sx={{ mb: 4 }}>
			<Typography variant="h6" gutterBottom fontWeight="bold">
				Review Column Mapping
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
				LLM-suggested mappings with confidence scores. Edit as needed.
			</Typography>

			{Object.keys(conflicts).length > 0 && (
				<Alert severity="warning" sx={{ mb: 2 }}>
					Warning: Some columns are mapped to the same target. Please resolve conflicts.
				</Alert>
			)}

			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell sx={{ fontWeight: "bold" }}>File Column</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Mapped To</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Confidence</TableCell>
							<TableCell sx={{ fontWeight: "bold" }}>Source</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{mappings.map((mapping, index) => (
							<TableRow
								key={index}
								hover
								sx={{
									...(conflicts[mapping.matched_column] && {
										backgroundColor: "rgba(255, 165, 0, 0.1)",
									}),
								}}
							>
								<TableCell sx={{ fontWeight: "medium" }}>{mapping.header}</TableCell>
								<TableCell>
									<FormControl size="small" sx={{ minWidth: 200 }}>
										<Select
											value={mapping.matched_column && mapping.matched_column !== "Unmapped" ? mapping.matched_column : "Unmapped"}
											onChange={(e) => handleMappingChange(index, e.target.value)}
											displayEmpty
											error={conflicts[mapping.matched_column]}
										>
											{getAvailableOptions(mapping, index)}
										</Select>
									</FormControl>
								</TableCell>
								<TableCell>
									{mapping.confidence_score > 0 ? (
										<Chip
											label={`${formatConfidence(mapping.confidence_score)}%`}
											color={getConfidenceColor(mapping.confidence_score)}
											size="small"
										/>
									) : (
										<Typography color="text.secondary">--</Typography>
									)}
								</TableCell>
								<TableCell>
									{/* Check if current mapping matches original LLM suggestion */}
									{mapping.matched_column === originalMappings[index] ? (
										<>
											<AutoFixHigh color="success" fontSize="small" />
											<Typography variant="caption" sx={{ ml: 0.5 }}>
												LLM Suggested
											</Typography>
										</>
									) : (
										<>
											<Edit color="primary" fontSize="small" />
											<Typography variant="caption" sx={{ ml: 0.5 }}>
												Manually Mapped
											</Typography>
										</>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default ColumnMappingComponent;