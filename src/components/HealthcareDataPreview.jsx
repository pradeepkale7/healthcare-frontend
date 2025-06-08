import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tabs,
  Tab,
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
  Grid,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { Close as CloseIcon, LocalHospital, Person, Policy, Assignment, HealthAndSafety, HealthAndSafetyOutlined } from '@mui/icons-material';


function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function HealthcareDataPreview({ open, onClose, sampleData }) {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'denied (eligibility)':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const ClaimsTable = () => (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Claim ID</TableCell>
            <TableCell>Amount Claimed</TableCell>
            <TableCell>Amount Approved</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Claim Date</TableCell>
            <TableCell>Admission Date</TableCell>
            <TableCell>Discharge Date</TableCell>
            <TableCell>Rejection Reason</TableCell>  
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.claims?.map((claim) => (
            <TableRow key={claim.claim_id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {claim.claim_id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>₹{claim.amount_claimed}</TableCell>
              <TableCell>₹{claim.amount_approved}</TableCell>
              <TableCell>
                <Chip 
                  label={claim.claim_status} 
                  color={getStatusColor(claim.claim_status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {claim.patient_id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                {claim.claim_date}
              </TableCell>
              <TableCell>
                {claim.admission_date}
              </TableCell>
              <TableCell>
                {claim.discharge_date}
              </TableCell>
              <TableCell>
                {claim.rejection_reason}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const PatientsGrid = () => (
    <Grid container spacing={2}>
      {sampleData.patients?.map((patient) => (
        <Grid item xs={12} md={6} key={patient.patient_id}>
          <Card variant="outlined">
            <CardContent>
              <Box display="flex" alignItems="center" mb={1}>
                <Person color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {patient.first_name} {patient.last_name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Member ID: {patient.member_id}
              </Typography>
              <Typography variant="body2">
                Gender: {patient.gender} | Email: {patient.email}
              </Typography>
              <Typography variant="body2" >
                Dob :{patient.dob }
                </Typography>
              <Typography variant="body2">
                Phone: {patient.phone}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Address: {patient.address}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const ProvidersTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Provider Name</TableCell>
            <TableCell>NPI Number</TableCell>
            <TableCell>Provider ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.providers?.map((provider) => (
            <TableRow key={provider.provider_id} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <LocalHospital color="primary" sx={{ mr: 1 }} />
                  {provider.provider_name}
                </Box>
              </TableCell>
              <TableCell>{provider.npi_number}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {provider.provider_id.substring(0, 8)}...
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const PoliciesTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Plan Name</TableCell>
            <TableCell>Policy Number</TableCell>
            <TableCell>Group Number</TableCell>
            <TableCell>Policy ID</TableCell>
            <TableCell>Policy Start Date</TableCell>
            <TableCell>Policy End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.policies?.map((policy) => (
            <TableRow key={policy.policy_id} hover>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <Policy color="primary" sx={{ mr: 1 }} />
                  {policy.plan_name}
                </Box>
              </TableCell>
              <TableCell>{policy.policy_number}</TableCell>
              <TableCell>{policy.group_number}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {policy.policy_id.substring(0, 8)}...
                </Typography>
              </TableCell>
              <TableCell>
                {policy.policy_start_date}
              </TableCell>
              <TableCell>
                {policy.policy_end_date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const DiagnosesTable = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Diagnosis Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Claim ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.diagnoses?.map((diagnosis) => (
            <TableRow key={diagnosis.claim_diagnose_id} hover>
              <TableCell>
                <Chip 
                  label={diagnosis.diagnosis_code || 'N/A'} 
                  variant="outlined"
                  size="small"
                />
              </TableCell>
              <TableCell>{diagnosis.diagnosis_description || 'N/A'}</TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                  {diagnosis.claim_id.substring(0, 8)}...
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            Healthcare Data Overview
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
            <Tab icon={<Assignment />} label="Claims" />
            <Tab icon={<Person />} label="Patients" />
            <Tab icon={<LocalHospital />} label="Providers" />
            <Tab icon={<Policy />} label="Policies" />
            <Tab icon={<HealthAndSafetyOutlined/>} label="Diagnoses" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>Claims Data</Typography>
          <ClaimsTable />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>Patients Information</Typography>
          <PatientsGrid />
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>Healthcare Providers</Typography>
          <ProvidersTable />
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>Insurance Policies</Typography>
          <PoliciesTable />
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom>Medical Diagnoses</Typography>
          <DiagnosesTable />
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

