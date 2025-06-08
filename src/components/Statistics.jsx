import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { 
  TableView, 
  CheckCircle, 
  Error, 
  Assignment,
  Person,
  Business,
  Policy,
  LocalHospital
} from '@mui/icons-material';

const StatisticCard = ({ icon, title, value, subtitle, color }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        <Avatar sx={{ bgcolor: color, width: 40, height: 40 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {value?.toLocaleString() || 0}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Statistics = ({ statistics }) => {
  const statsConfig = [
    {
      icon: <TableView />,
      title: 'Records Extracted',
      value: statistics?.total_records_extracted,
      color: '#1976d2'
    },
    {
      icon: <CheckCircle />,
      title: 'Inserted',
      value: statistics?.records_inserted,
      color: '#2e7d32'
    },
    {
      icon: <Error />,
      title: 'Failed',
      value: statistics?.records_failed,
      color: '#d32f2f'
    },
    {
      icon: <Assignment />,
      title: 'Claims Created',
      value: statistics?.claims_created,
      color: '#1976d2'
    },
    {
      icon: <Person />,
      title: 'Patients',
      value: statistics?.patients_created,
      color: '#7b1fa2'
    },
    {
      icon: <Business />,
      title: 'Providers',
      value: statistics?.providers_created,
      color: '#1976d2'
    },
    {
      icon: <Policy />,
      title: 'Policies',
      value: statistics?.policies_created,
      color: '#1976d2'
    },
    {
      icon: <LocalHospital />,
      title: 'Diagnoses',
      value: statistics?.diagnoses_created,
      color: '#d32f2f'
    }
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Statistics
      </Typography>
      
      <Grid container spacing={2}>
        {statsConfig.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatisticCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Statistics;