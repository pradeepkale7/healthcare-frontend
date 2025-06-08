import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  CircularProgress
} from '@mui/material';
import {
  CloudUpload,
  CheckCircle,
  Error,
  HourglassEmpty,
  InsertChart
} from '@mui/icons-material';

const Overview = ({ data, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const statCards = [
    {
      title: 'Total Files',
      value: data?.summary?.total_uploaded_files || 0,
      subtitle: 'All uploads',
      icon: <CloudUpload />,
      color: '#2196F3'
    },
    {
      title: 'Success',
      value: data?.summary?.successful_files || 0,
      subtitle: 'Successful uploads',
      icon: <CheckCircle />,
      color: '#4CAF50'
    },
    {
      title: 'Failed',
      value: data?.summary?.failed_files || 0,
      subtitle: 'Failed uploads',
      icon: <Error />,
      color: '#FF5722'
    },
    {
      title: 'Records Processed',
      value: data?.summary?.total_records_inserted || 0,
      subtitle: `${data?.summary?.total_records_failed || 0} failed records`,
      icon: <InsertChart />,
      color: '#9C27B0'
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Overview
      </Typography>
      <Grid container spacing={3}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
              }
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: stat.color,
                    width: 48,
                    height: 48,
                    mr: 2
                  }}>
                    {stat.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                      {stat.value.toLocaleString()}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 500, color: '#333' }}>
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {stat.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Overview;