import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { 
  SmartToy,
  Edit,
  Block,
  CheckCircle,
  
  RemoveCircle,
  ParkOutlined
} from '@mui/icons-material';

const ProcessingSummaryCard = ({ icon, title, value, color }) => (
  <Card sx={{ textAlign: 'center', height: '100%' }}>
    <CardContent>
      <Avatar 
        sx={{ 
          bgcolor: color, 
          width: 48, 
          height: 48, 
          mx: 'auto', 
          mb: 2 
        }}
      >
        {icon}
      </Avatar>
      
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mb: 1, fontWeight: 500 }}
      >
        {title}
      </Typography>
      
      <Typography 
        variant="h4" 
        sx={{ fontWeight: 700, color: color }}
      >
        {value || 0}
      </Typography>
    </CardContent>
  </Card>
);

const ProcessingSummary = ({ processingSummary }) => {
  const summaryConfig = [
    {
      icon: <SmartToy />,
      title: 'Total Header',
      value: processingSummary?.total_file_headers,
      color: '#1976d2'
    },
    {
      icon: <SmartToy />,
      title: 'LLM Mapped',
      value: processingSummary?.llm_mapped_columns,
      color: '#1976d2'
    },
    {
      icon: <Edit />,
      title: 'Manually Mapped',
      value: processingSummary?.manually_mapped_columns,
      color: '#2e7d32'
    },
    {
      icon: <Block />,
      title: 'Unmapped',
      value: processingSummary?.unmapped_columns,
      color: '#ed6c02'
    },
    {
      icon: <CheckCircle />,
      title: 'Fully Populated',
      value: processingSummary?.fully_populated_columns,
      color: '#1976d2'
    },
    {
      icon: <ParkOutlined />,
      title: 'Partially Populated',
      value: processingSummary?.partially_populated_columns,
      color: '#1976d2'
    },
    {
      icon: <RemoveCircle />,
      title: 'Empty Columns',
      value: processingSummary?.empty_columns,
      color: '#1976d2'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 600 }}>
        Processing Summary
      </Typography>
      
      <Grid container spacing={2}>
        {summaryConfig.map((item, index) => (
          <Grid item xs={12} sm={6} md={2} key={index}>
            <ProcessingSummaryCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};



export default ProcessingSummary;