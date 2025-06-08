import React, { useState } from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { CloudUpload, Analytics, FilePresentSharp } from "@mui/icons-material";

// Updated Sidebar Component
const Sidebar = ({ activePage, setActivePage }) => {
	const menuItems = [
		{
			text: "Upload",
			icon: <CloudUpload />,
			page: "home",
		},
		{
			text: "Analytics",
			icon: <Analytics />,
			page: "analytics",
		},
		{
			text:"FileReport",
			icon: <FilePresentSharp />,
			page: "fileReport",
		}
	];

	return (
		<Box
			sx={{
				width: 270,
				flexShrink: 0,
				position: "fixed",
				height: "100vh",
				overflowY: "auto",
				backgroundColor: "#f8f9fa",
				borderRight: "1px solid #e0e0e0",
			}}
		>
			<Box sx={{ px: 2, mb: 3 }}>
				<Typography variant="h6" fontWeight="bold" color="primary">
					HealthClaims AI
				</Typography>
			</Box>
			<List>
				{menuItems.map((item, index) => {
					const isActive = activePage === item.page;
					return (
						<ListItem
							key={index}
							onClick={() => setActivePage(item.page)}
							sx={{
								backgroundColor: isActive ? "#e3f2fd" : "transparent",
								borderRight: isActive ? "3px solid #1976d2" : "none",
								mb: 1,
								cursor: "pointer",
								"&:hover": {
									backgroundColor: isActive ? "#e3f2fd" : "#f0f0f0",
								},
								transition: "background-color 0.2s ease",
							}}
						>
							<ListItemIcon sx={{ color: isActive ? "#1976d2" : "inherit" }}>{item.icon}</ListItemIcon>
							<ListItemText
								primary={item.text}
								sx={{
									color: isActive ? "#1976d2" : "inherit",
									fontWeight: isActive ? "bold" : "normal",
								}}
							/>
						</ListItem>
					);
				})}
			</List>
		</Box>
	);
};

export default Sidebar;
