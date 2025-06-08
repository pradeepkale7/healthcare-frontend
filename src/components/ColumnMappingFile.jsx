import React from 'react';
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import { Star, Warning, Info, ViewAgendaOutlined, ViewCarousel, RemoveRedEye, PanoramaFishEye, RemoveRedEyeOutlined } from '@mui/icons-material';

const ColumnMappingsFile = ({ columnMappings }) => {
  const getStatusIcon = (mapping) => {
    if (mapping.user_edited) {
      return <Star sx={{ color: '#ffa726', fontSize: 16 }} />;
    }
    if (mapping.confidence_score === 0) {
      return <Warning sx={{ color: '#f44336', fontSize: 16 }} />;
    }
    return null;
  };

  const getConfidenceColor = (score) => {
    if (score >= 0.9) return '#4caf50';
    if (score >= 0.7) return '#ff9800';
    if (score > 0) return '#f44336';
    return '#9e9e9e';
  };


  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Column Mappings
        </Typography>
        <Tooltip title="Information about column mappings">
          <IconButton size="small">
            <Info sx={{ fontSize: 18 }} />
          </IconButton>
        </Tooltip>
      </Box>
      
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ bgcolor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 600 }}>Header</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Matched Column</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>LLM Suggestion</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Final Mapping</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Confidence</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>User Edited</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Records Populated</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Empty Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {columnMappings?.map((mapping, index) => (
              <TableRow key={index} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getStatusIcon(mapping)}
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {mapping.header}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {mapping.matched_column || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {mapping.llm_suggestion || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {mapping.final_mapping || '—'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${Math.round(mapping.confidence_score * 100)}%`}
                    size="small"
                    sx={{
                      bgcolor: getConfidenceColor(mapping.confidence_score),
                      color: 'white',
                      fontWeight: 500
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {mapping.user_edited ? 'Yes' : 'No'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {mapping.records_populated?.toLocaleString() || 0}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {mapping.empty_values?.toLocaleString() || 0}
                  </Typography>
                </TableCell>
                
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ColumnMappingsFile;