import React from 'react';
import { Box, Card, CardContent, Typography, Avatar } from '@mui/material';
import { Description } from '@mui/icons-material';

const FileInformation = ({ fileInfo }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        File Information
      </Typography>
      
      <Card sx={{ p: 2 }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: '#1976d2', width: 48, height: 48 }}>
              <Description />
            </Avatar>
            
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                {fileInfo?.filename || 'Loading...'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                Extension: {fileInfo?.file_extension || '-'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                Uploaded: {fileInfo?.upload_time ? new Date(fileInfo.upload_time).toLocaleString() : '-'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.25 }}>
                Status: {fileInfo?.processing_status || '-'}
              </Typography>
              
              <Typography variant="body2" color="text.secondary">
                Storage: {fileInfo?.storage_type || '-'}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FileInformation;