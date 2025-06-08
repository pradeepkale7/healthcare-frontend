import React from 'react';
import { Box, Card, CardContent, Typography, CircularProgress, Avatar } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const SuccessRate = ({ successRate }) => {
  const rate = successRate || 0;
  const normalizedRate = Math.min(Math.max(rate, 0), 100);
  
  const getSuccessColor = (rate) => {
    if (rate >= 90) return '#4caf50';
    if (rate >= 70) return '#ff9800';
    return '#f44336';
  };

  const getSuccessMessage = (rate) => {
    if (rate >= 90) return 'Excellent data quality and mapping coverage.';
    if (rate >= 70) return 'Good data quality with room for improvement.';
    return 'Data quality needs attention. Review mappings.';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Success Rate
      </Typography>
      
      <Card>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <Box sx={{ position: 'relative', display: 'inline-flex', mb: 3 }}>
            <CircularProgress
              variant="determinate"
              value={normalizedRate}
              size={120}
              thickness={4}
              sx={{ 
                color: getSuccessColor(normalizedRate),
                '& .MuiCircularProgress-circle': {
                  strokeLinecap: 'round',
                }
              }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column'
              }}
            >
              <Avatar 
                sx={{ 
                  bgcolor: getSuccessColor(normalizedRate), 
                  width: 32, 
                  height: 32,
                  mb: 1
                }}
              >
                <CheckCircle sx={{ fontSize: 20 }} />
              </Avatar>
              <Typography 
                variant="h5" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  color: getSuccessColor(normalizedRate)
                }}
              >
                {`${Math.round(normalizedRate)}%`}
              </Typography>
            </Box>
          </Box>
          
          <Typography 
            variant="h6" 
            sx={{ 
              mb: 1, 
              fontWeight: 600,
              color: getSuccessColor(normalizedRate)
            }}
          >
            {`${Math.round(normalizedRate)}% Success`}
          </Typography>
          
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ maxWidth: 400, mx: 'auto' }}
          >
            {getSuccessMessage(normalizedRate)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SuccessRate;