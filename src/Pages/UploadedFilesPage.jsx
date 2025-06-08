import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  InsertDriveFileOutlined,
  CheckCircleOutline,
  ErrorOutline,
  HourglassEmpty,
  Refresh
} from '@mui/icons-material';
import axios from 'axios';
import FileReport from '../components/FileReport';


const UploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImportId, setSelectedImportId] = useState(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/resource/files');
      setFiles(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch file history');
      console.error('Error fetching files:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return <CheckCircleOutline color="success" />;
      case 'failed':
        return <ErrorOutline color="error" />;
      case 'processing':
        return <HourglassEmpty color="warning" />;
      default:
        return <HourglassEmpty color="info" />;
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRowClick = (importId) => {
    setSelectedImportId(importId);
  };

  const handleBackToList = () => {
    setSelectedImportId(null);
  };

  return (
    <Box  
    component="main"
			sx={{
				flexGrow: 1,
				p: 3,
				width: "calc(100% - 300px)",
				ml: "270px",
				backgroundColor: "#f5f5f5",
				minHeight: "100vh",
			}}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          underline="hover"
          color="inherit"
          onClick={handleBackToList}
        >
          Files  
        </Link>
        {selectedImportId && (
          <Typography color="text.primary">  File Report</Typography>
        )}
      </Breadcrumbs>

      {/* If file selected, show report */}
      {selectedImportId ? (
        <FileReport importId={selectedImportId} />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              File Import History
            </Typography>
            <Tooltip title="Refresh">
              <IconButton onClick={fetchFiles} color="primary">
                <Refresh />
              </IconButton>
            </Tooltip>
          </Box>

          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <Paper elevation={3} sx={{ overflow: 'hidden' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'primary.main' }}>
                      <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>File</TableCell>
                      <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Uploaded</TableCell>
                      <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Records</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {files.map((file) => (
                      <TableRow
                        key={file.import_id}
                        hover
                        onClick={() => handleRowClick(file.import_id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <InsertDriveFileOutlined sx={{ mr: 1, color: 'text.secondary' }} />
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                {file.filename}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {file.file_extension.toUpperCase()}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatDate(file.upload_time)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {getStatusIcon(file.processing_status)}
                            <Chip
                              label={file.processing_status}
                              size="small"
                              sx={{
                                fontWeight: 'medium',
                                backgroundColor:
                                  file.processing_status === 'Success'
                                    ? 'success.light'
                                    : file.processing_status === 'Failed'
                                    ? 'error.light'
                                    : 'warning.light',
                                color:
                                  file.processing_status === 'Success'
                                    ? 'success.dark'
                                    : file.processing_status === 'Failed'
                                    ? 'error.dark'
                                    : 'warning.dark'
                              }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Extracted
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                {file.records_extracted}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                Inserted
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 'medium',
                                  color:
                                    file.records_extracted === file.records_inserted
                                      ? 'success.main'
                                      : 'error.main'
                                }}
                              >
                                {file.records_inserted}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          )}

          {!loading && !error && files.length === 0 && (
            <Alert severity="info" sx={{ mt: 2 }}>
              No file import history found.
            </Alert>
          )}
        </>
      )}
    </Box>
  );
};

export default UploadedFiles;
