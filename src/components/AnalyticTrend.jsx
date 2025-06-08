import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	CircularProgress,
	Alert,
	Paper,
	Button,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";
import dayjs from "dayjs";


const groupBy = (data, type) => {
	const grouped = {};

	data.forEach((file) => {
		const date = dayjs(file.upload_time); // Fixed: using created_at instead of upload_time
		let key = "";
		let displayKey = "";
		let sortKey = "";

		switch (type) {
			case "day":
				sortKey = date.format("YYYY-MM-DD");
				displayKey = date.format("MMM DD, YYYY"); // More readable: "Jun 06, 2025"
				key = sortKey;
				break;
			case "week":
				const weekStart = date.startOf("week");
				const weekEnd = date.endOf("week");
				sortKey = weekStart.format("YYYY-MM-DD"); // Use start date for sorting
				displayKey = `${weekStart.format("MMM DD")} - ${weekEnd.format("MMM DD, YYYY")}`; // "Jun 01 - Jun 07, 2025"
				key = sortKey;
				break;
			case "month":
				sortKey = date.format("YYYY-MM");
				displayKey = date.format("MMMM YYYY"); // "June 2025"
				key = sortKey;
				break;
			case "year":
				sortKey = date.format("YYYY");
				displayKey = date.format("YYYY"); // "2025"
				key = sortKey;
				break;
			default:
				sortKey = "unknown";
				displayKey = "Unknown";
				key = sortKey;
		}

		if (!grouped[key]) {
			grouped[key] = {
				count: 0,
				key,
				displayKey,
				sortKey,
			};
		}
		grouped[key].count += 1;
	});

	// Better sorting: sort by actual date values, not string comparison
	return Object.values(grouped).sort((a, b) => {
		// For proper chronological sorting
		return dayjs(a.sortKey).valueOf() - dayjs(b.sortKey).valueOf();
	});
};

const Trends = ({data,loading}) => {
	const files = data.files || [];
	const [groupType, setGroupType] = useState("day");
	const [chartData, setChartData] = useState([]);
	const [dateRange, setDateRange] = useState("last30"); // New state for date filtering

	// Filter files based on date range
	const getFilteredFiles = () => {
		if (files.length === 0) return [];

		const now = dayjs();
		let startDate;

		switch (dateRange) {
			case "last7":
				startDate = now.subtract(7, "day");
				break;
			case "last30":
				startDate = now.subtract(30, "day");
				break;
			case "last90":
				startDate = now.subtract(90, "day");
				break;
			case "last6months":
				startDate = now.subtract(6, "month");
				break;
			case "lastYear":
				startDate = now.subtract(1, "year");
				break;
			case "all":
			default:
				return files;
		}

		return files.filter((file) => {
			const fileDate = dayjs(file.upload_time);
			return fileDate.isAfter(startDate) || fileDate.isSame(startDate, "day");
		});
	};

	// Auto-suggest better grouping based on data range
	const getSuggestedGroupType = (filteredFiles) => {
		if (filteredFiles.length === 0) return groupType;

		const dates = filteredFiles.map((f) => dayjs(f.created_at));

		// Find min and max dates manually
		let oldestDate = dates[0];
		let newestDate = dates[0];

		dates.forEach((date) => {
			if (date.isBefore(oldestDate)) oldestDate = date;
			if (date.isAfter(newestDate)) newestDate = date;
		});

		const daysDiff = newestDate.diff(oldestDate, "day");

		// Auto-suggest grouping based on time span
		if (daysDiff <= 14) return "day"; // 2 weeks or less: daily
		if (daysDiff <= 90) return "week"; // 3 months or less: weekly
		if (daysDiff <= 365) return "month"; // 1 year or less: monthly
		return "year"; // More than 1 year: yearly
	};

	useEffect(() => {
		if (files.length > 0) {
			const filteredFiles = getFilteredFiles();
			console.log("Filtered files count:", filteredFiles.length);
			console.log("Date range:", dateRange);
			console.log("First file date:", filteredFiles[0]?.created_at);
			console.log("Last file date:", filteredFiles[filteredFiles.length - 1]?.created_at);

			const grouped = groupBy(filteredFiles, groupType);
			setChartData(grouped);
		}
	}, [files, groupType, dateRange]);

	// Custom tooltip to show user-friendly labels
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			const data = payload[0].payload;
			return (
				<Paper elevation={2} sx={{ p: 1 }}>
					<Typography variant="body2" sx={{ fontWeight: "bold" }}>
						{data.displayKey}
					</Typography>
					<Typography variant="body2" color="primary">
						Files: {payload[0].value}
					</Typography>
				</Paper>
			);
		}
		return null;
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h5" gutterBottom>
				File Upload Trends
			</Typography>

			{/* Smart suggestion banner */}
			{(() => {
				const filteredFiles = getFilteredFiles();
				const suggested = getSuggestedGroupType(filteredFiles);
				if (suggested !== groupType && filteredFiles.length > 0) {
					return (
						<Alert
							severity="info"
							sx={{ mb: 2 }}
							action={
								<Button color="inherit" size="small" onClick={() => setGroupType(suggested)}>
									Switch to {suggested}ly
								</Button>
							}
						>
							For better readability, consider switching to {suggested}ly view
						</Alert>
					);
				}
				return null;
			})()}

			{/* Controls */}
			<Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel>Time Range</InputLabel>
					<Select value={dateRange} onChange={(e) => setDateRange(e.target.value)} label="Time Range">
						<MenuItem value="last7">Last 7 Days</MenuItem>
						<MenuItem value="last30">Last 30 Days</MenuItem>
						<MenuItem value="last90">Last 3 Months</MenuItem>
						<MenuItem value="last6months">Last 6 Months</MenuItem>
						<MenuItem value="lastYear">Last Year</MenuItem>
						<MenuItem value="all">All Time</MenuItem>
					</Select>
				</FormControl>

				<FormControl sx={{ minWidth: 150 }}>
					<InputLabel>Group By</InputLabel>
					<Select value={groupType} onChange={(e) => setGroupType(e.target.value)} label="Group By">
						<MenuItem value="day">Daily</MenuItem>
						<MenuItem value="week">Weekly</MenuItem>
						<MenuItem value="month">Monthly</MenuItem>
						<MenuItem value="year">Yearly</MenuItem>
					</Select>
				</FormControl>
			</Box>

			{loading ? (
				<Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
					<CircularProgress />
				</Box>
			) : !files ? (
				<Alert severity="error" sx={{ mt: 2 }}>
					Error Loading filea
				</Alert>
			) : chartData.length === 0 ? (
				<Alert severity="info" sx={{ mt: 2 }}>
					No file upload data available
				</Alert>
			) : (
				<Paper elevation={3} sx={{ p: 2 }}>
					<ResponsiveContainer width="100%" height={400}>
						<BarChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis
								dataKey="displayKey"
								angle={-45}
								textAnchor="end"
								height={80}
								interval={chartData.length > 30 ? "preserveStartEnd" : 0} // Smart interval
							/>
							<YAxis label={{ value: "Number of Files", angle: -90, position: "insideLeft" }} />
							<Tooltip content={<CustomTooltip />} />
							<Bar
								dataKey="count"
								fill="#1976d2"
								radius={[4, 4, 0, 0]} // Rounded corners for better look
							/>
						</BarChart>
					</ResponsiveContainer>

					{/* Summary stats */}
					<Box
						sx={{
							mt: 2,
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							flexWrap: "wrap",
							gap: 1,
						}}
					>
						<Typography variant="body2" color="text.secondary">
							Showing: {getFilteredFiles().length} files
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Total Files: {files.length}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Time Period: {chartData.length} {groupType === "day" ? "days" : `${groupType}s`}
						</Typography>
					
						{chartData.length > 0 && (
							<Typography variant="body2" color="text.secondary">
								Showing data from {dayjs(chartData[0].sortKey).format("MMM D, YYYY")} to{" "}
								{dayjs(chartData[chartData.length - 1].sortKey).format("MMM D, YYYY")}
							</Typography>
						)}
					</Box>
				</Paper>
			)}
		</Box>
	);
};

export default Trends;
