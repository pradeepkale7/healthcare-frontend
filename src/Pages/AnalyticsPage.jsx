import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Paper,
  CircularProgress
} from '@mui/material';
import Overview from '../components/AnalyticOverview';
import Trends from '../components/AnalyticTrend';

// Your mock data
const mockdata = {
  "summary": {
    "total_uploaded_files": 9,
    "successful_files": 0,
    "failed_files": 0,
    "success_percentage": 0,
    "total_records_inserted": 3587,
    "total_records_failed": 261
  },
  "files":[
	{
		file_id: "3461b604-2f1a-4c9e-bf8b-d1a43b1c0537",
		filename: "claims_6566.csv",
		status: "Failed",
		upload_time: "2024-12-09T03:00:50.263987",
	},
	{
		file_id: "8a466293-ec92-442b-876e-e39a135f4bee",
		filename: "claims_9264.csv",
		status: "Success",
		upload_time: "2024-12-11T17:04:40.263987",
	},
	{
		file_id: "dffb6e61-64ba-413e-864a-4fa180bc4eb2",
		filename: "claims_1115.csv",
		status: "Success",
		upload_time: "2024-12-13T15:30:04.263987",
	},
	{
		file_id: "a01ff419-c007-4142-ad83-ef20e012e2ff",
		filename: "claims_7789.csv",
		status: "Success",
		upload_time: "2024-12-13T08:21:34.263987",
	},
	{
		file_id: "a4710013-3de6-4a7d-88d9-863e0fe951d9",
		filename: "claims_6198.csv",
		status: "Failed",
		upload_time: "2024-12-15T17:29:48.263987",
	},
	{
		file_id: "181efb70-a62c-4898-b1ec-b8fcd47159d3",
		filename: "claims_7186.csv",
		status: "Success",
		upload_time: "2024-12-15T14:50:05.263987",
	},
	{
		file_id: "cac7099f-aa8f-41ea-90ec-51fad30454f1",
		filename: "claims_6064.csv",
		status: "Success",
		upload_time: "2024-12-15T23:31:12.263987",
	},
	{
		file_id: "1383b230-5579-4832-aaed-4e415de72e3f",
		filename: "claims_6516.csv",
		status: "Failed",
		upload_time: "2024-12-16T04:50:31.263987",
	},
	{
		file_id: "42e94cfe-8b49-4d1d-ade9-48229160b153",
		filename: "claims_9473.csv",
		status: "Success",
		upload_time: "2024-12-17T14:26:39.263987",
	},
	{
		file_id: "0779ccae-dac6-4678-ad13-8108cbcd3b6d",
		filename: "claims_8509.csv",
		status: "Success",
		upload_time: "2024-12-17T08:43:57.263987",
	},
	{
		file_id: "380d680c-ae4c-40bf-b51c-d7b5745b33d7",
		filename: "claims_1211.csv",
		status: "Success",
		upload_time: "2024-12-18T09:08:59.263987",
	},
	{
		file_id: "08aa9503-f5bf-42f0-aabb-baf829ee2a28",
		filename: "claims_8275.csv",
		status: "Success",
		upload_time: "2024-12-17T19:46:15.263987",
	},
	{
		file_id: "3646fe01-85ba-409e-9c46-e07e01329a9b",
		filename: "claims_5439.csv",
		status: "Failed",
		upload_time: "2024-12-19T13:16:15.263987",
	},
	{
		file_id: "aedff7d9-790f-4f2e-ac8b-9785111d572e",
		filename: "claims_7798.csv",
		status: "Success",
		upload_time: "2024-12-19T07:41:23.263987",
	},
	{
		file_id: "4da9470d-75fd-4668-a97e-bc8e252ecf9a",
		filename: "claims_4393.csv",
		status: "Success",
		upload_time: "2024-12-19T17:25:02.263987",
	},
	{
		file_id: "4823ce6f-f4cd-404e-adb7-4d3ca46db9a0",
		filename: "claims_5984.csv",
		status: "Success",
		upload_time: "2024-12-20T20:30:54.263987",
	},
	{
		file_id: "43cf5a7d-efb3-4caa-b529-e00db86b9f10",
		filename: "claims_6586.csv",
		status: "Success",
		upload_time: "2024-12-22T00:14:53.263987",
	},
	{
		file_id: "786bea8f-f93d-4b09-9744-9562e9aae348",
		filename: "claims_5677.csv",
		status: "Success",
		upload_time: "2024-12-22T12:23:51.263987",
	},
	{
		file_id: "d2a46768-069b-4a75-a4a1-1584d97bb0b2",
		filename: "claims_3102.csv",
		status: "Failed",
		upload_time: "2025-04-30T15:20:37.263987",
	},
	{
		file_id: "79caed2c-9bda-4a6d-9078-9773b95dd6db",
		filename: "claims_2895.csv",
		status: "Success",
		upload_time: "2025-05-01T02:06:52.263987",
	},
	{
		file_id: "015ff265-86db-4de4-9167-c13ae5d01912",
		filename: "claims_6974.csv",
		status: "Success",
		upload_time: "2025-05-01T12:59:47.263987",
	},
	{
		file_id: "1f2a31dd-bd54-46bc-972c-20177e34e225",
		filename: "claims_7978.csv",
		status: "Failed",
		upload_time: "2025-04-30T23:16:06.263987",
	},
	{
		file_id: "03cba08e-3cff-4c00-88c2-31cdf35777d3",
		filename: "claims_5938.csv",
		status: "Success",
		upload_time: "2025-05-02T15:31:22.263987",
	},
	{
		file_id: "017eada6-00dd-48ee-ae68-cc8a0d8b3017",
		filename: "claims_2256.csv",
		status: "Success",
		upload_time: "2025-05-01T21:01:16.263987",
	},
	{
		file_id: "2ccc3699-20cf-48bd-95a7-4c36a80c8bda",
		filename: "claims_4137.csv",
		status: "Success",
		upload_time: "2025-05-04T14:28:20.263987",
	},
	{
		file_id: "b5e8298e-eb99-4b04-9784-ba6b7595c08b",
		filename: "claims_1005.csv",
		status: "Success",
		upload_time: "2025-05-06T13:06:56.263987",
	},
	{
		file_id: "ad332179-243f-4d65-98b9-1a21504902c2",
		filename: "claims_6016.csv",
		status: "Success",
		upload_time: "2025-05-06T19:00:28.263987",
	},
	{
		file_id: "5157dacc-473b-4a29-808f-14e17ecf93fc",
		filename: "claims_9693.csv",
		status: "Success",
		upload_time: "2025-05-08T14:34:27.263987",
	},
	{
		file_id: "d058439e-dcdd-4ca6-9153-262d16a2150d",
		filename: "claims_8265.csv",
		status: "Success",
		upload_time: "2025-05-07T20:43:59.263987",
	},
	{
		file_id: "be89566b-c8d6-4994-89cc-245f4b6358d4",
		filename: "claims_6954.csv",
		status: "Success",
		upload_time: "2025-05-09T18:58:58.263987",
	},
	{
		file_id: "c3815716-a59e-47e6-b2a4-719408470b07",
		filename: "claims_6454.csv",
		status: "Success",
		upload_time: "2025-05-09T01:17:15.263987",
	},
	{
		file_id: "a2b4df73-d1c1-4262-a9c4-9a93b70b1418",
		filename: "claims_8760.csv",
		status: "Success",
		upload_time: "2025-05-09T03:31:20.263987",
	},
	{
		file_id: "c11bcefd-8685-420d-981d-46632adfd6f5",
		filename: "claims_7269.csv",
		status: "Success",
		upload_time: "2025-05-10T19:04:18.263987",
	},
	{
		file_id: "7c985d75-4b54-45ee-ab34-7a0cbfe49eba",
		filename: "claims_3460.csv",
		status: "Success",
		upload_time: "2025-05-11T18:26:06.263987",
	},
	{
		file_id: "9fdc7626-60f5-4eae-ba3c-a43c170397b9",
		filename: "claims_1927.csv",
		status: "Success",
		upload_time: "2025-05-11T08:27:45.263987",
	},
	{
		file_id: "4f797206-737e-41c7-b0f3-d8af0ccf5f8a",
		filename: "claims_2979.csv",
		status: "Failed",
		upload_time: "2025-05-10T22:42:43.263987",
	},
	{
		file_id: "d5a36956-caee-4a80-b1ae-c0170afdeace",
		filename: "claims_1107.csv",
		status: "Success",
		upload_time: "2025-05-12T12:07:17.263987",
	},
	{
		file_id: "591b1dde-e325-4148-b92f-df6c54282817",
		filename: "claims_9767.csv",
		status: "Success",
		upload_time: "2025-05-12T04:46:41.263987",
	},
	{
		file_id: "6eb85b1a-fb40-4627-a3ce-ce8c2475f382",
		filename: "claims_9578.csv",
		status: "Success",
		upload_time: "2025-05-13T12:03:28.263987",
	},
	{
		file_id: "44803175-ace6-4551-8888-ed093ab67592",
		filename: "claims_3109.csv",
		status: "Success",
		upload_time: "2025-05-13T12:45:12.263987",
	},
	{
		file_id: "33f6ae1b-5e0e-4eaa-888f-fafaa7f52e24",
		filename: "claims_2293.csv",
		status: "Success",
		upload_time: "2025-05-14T15:58:40.263987",
	},
	{
		file_id: "7cada9be-f2b2-482b-be31-bbffac2849c4",
		filename: "claims_2086.csv",
		status: "Success",
		upload_time: "2025-05-14T11:45:39.263987",
	},
	{
		file_id: "c0d49f52-3b82-41f7-a0eb-a9c2a08825e5",
		filename: "claims_3310.csv",
		status: "Success",
		upload_time: "2025-05-15T12:44:21.263987",
	},
	{
		file_id: "3f0c8320-9a36-4d7c-9647-64fed61d0d5c",
		filename: "claims_3583.csv",
		status: "Success",
		upload_time: "2025-05-15T10:14:47.263987",
	},
	{
		file_id: "ba86d7de-e14e-4f02-9b01-e3d0cd94ebf3",
		filename: "claims_8077.csv",
		status: "Success",
		upload_time: "2025-05-15T18:00:56.263987",
	},
	{
		file_id: "01e44cea-4a19-4e7f-a3d5-06f35920d3ac",
		filename: "claims_4575.csv",
		status: "Success",
		upload_time: "2025-05-16T03:31:34.263987",
	},
	{
		file_id: "d4a5b6bf-2c97-4592-b6ee-ec186fbea064",
		filename: "claims_7402.csv",
		status: "Failed",
		upload_time: "2025-05-16T18:07:10.263987",
	},
	{
		file_id: "b1e69dfc-e293-4734-85a7-b99d0303df6e",
		filename: "claims_4808.csv",
		status: "Failed",
		upload_time: "2025-05-17T03:14:40.263987",
	},
	{
		file_id: "691090ee-be4e-404c-8e53-82e70d4e2630",
		filename: "claims_1757.csv",
		status: "Success",
		upload_time: "2025-05-18T01:29:27.263987",
	},
	{
		file_id: "a7518128-2aae-43e2-86f5-d9465186a5b8",
		filename: "claims_2532.csv",
		status: "Success",
		upload_time: "2025-05-18T07:36:00.263987",
	},
	{
		file_id: "8c02123f-463d-4fed-9330-91af8138506d",
		filename: "claims_5446.csv",
		status: "Success",
		upload_time: "2025-05-19T07:41:27.263987",
	},
	{
		file_id: "717bbbe1-4fd0-4981-b7ef-c80e240574ab",
		filename: "claims_7159.csv",
		status: "Failed",
		upload_time: "2025-05-20T03:01:28.263987",
	},
	{
		file_id: "2774852f-7e21-4dcb-97ac-56bc1db766f8",
		filename: "claims_9625.csv",
		status: "Success",
		upload_time: "2025-05-20T04:59:14.263987",
	},
	{
		file_id: "af945448-b63f-44e1-8759-e72b3e010fd9",
		filename: "claims_8742.csv",
		status: "Success",
		upload_time: "2025-05-20T21:24:02.263987",
	},
	{
		file_id: "655f1012-7449-4231-a0ac-d980b3ed682d",
		filename: "claims_8276.csv",
		status: "Success",
		upload_time: "2025-05-21T02:27:45.263987",
	},
	{
		file_id: "500cf33a-af54-4b64-aee7-3b44fc3a6edd",
		filename: "claims_7436.csv",
		status: "Success",
		upload_time: "2025-05-21T20:13:52.263987",
	},
	{
		file_id: "864e91b7-b15f-4153-b426-9ee258599099",
		filename: "claims_8539.csv",
		status: "Success",
		upload_time: "2025-05-25T14:12:31.263987",
	},
	{
		file_id: "38f6bd2c-d0e1-49fd-af9b-268068500f14",
		filename: "claims_3804.csv",
		status: "Success",
		upload_time: "2025-05-26T15:01:20.263987",
	},
	{
		file_id: "da94d59b-dccd-4266-9114-c83503c590cd",
		filename: "claims_7549.csv",
		status: "Success",
		upload_time: "2025-05-26T06:53:02.263987",
	},
	{
		file_id: "d365f79d-7b3e-47bc-ab93-4d08436e854a",
		filename: "claims_4010.csv",
		status: "Success",
		upload_time: "2025-05-26T05:37:00.263987",
	},
	{
		file_id: "c76c246a-9d32-4571-b73c-8bd46a9d0add",
		filename: "claims_8312.csv",
		status: "Success",
		upload_time: "2025-05-28T12:50:51.263987",
	},
	{
		file_id: "9417528d-1ce6-4bbb-b8f6-6b0cc3127144",
		filename: "claims_4975.csv",
		status: "Success",
		upload_time: "2025-05-28T14:53:28.263987",
	},
	{
		file_id: "a0fe88f6-bf91-4256-847a-cf064553f8ff",
		filename: "claims_7871.csv",
		status: "Failed",
		upload_time: "2025-05-28T19:34:55.263987",
	},
	{
		file_id: "107bd805-beea-4fb9-90bf-01e84640499a",
		filename: "claims_3673.csv",
		status: "Failed",
		upload_time: "2025-05-28T22:14:29.263987",
	},
	{
		file_id: "091953a2-9511-4226-8293-2b856fddac9d",
		filename: "claims_4815.csv",
		status: "Success",
		upload_time: "2025-05-29T02:53:48.263987",
	},
	{
		file_id: "7b0a410f-7de0-4d84-b2c1-a1d32c81796a",
		filename: "claims_6733.csv",
		status: "Success",
		upload_time: "2025-05-29T15:55:04.263987",
	},
	{
		file_id: "dc5afeff-e1fd-4fe6-be8b-7d6e7da9c6ac",
		filename: "claims_8514.csv",
		status: "Success",
		upload_time: "2025-05-30T01:35:56.263987",
	},
	{
		file_id: "3de4f85d-58ad-4617-a0a6-9c5bdb7e99c5",
		filename: "claims_9634.csv",
		status: "Success",
		upload_time: "2025-05-30T14:42:37.263987",
	},
	{
		file_id: "b1b8b0c2-7ae6-4478-8364-31af53641ac9",
		filename: "claims_6645.csv",
		status: "Success",
		upload_time: "2025-05-31T01:48:21.263987",
	},
	{
		file_id: "0db4b3d7-2eb3-40e2-a652-c51b285e44b7",
		filename: "claims_7994.csv",
		status: "Success",
		upload_time: "2025-05-31T12:27:39.263987",
	},
	{
		file_id: "db8d3121-78e9-4df4-9d4a-8d126824052b",
		filename: "claims_1462.csv",
		status: "Success",
		upload_time: "2025-06-02T18:46:03.263987",
	},
	{
		file_id: "b70e3d7a-b533-4c53-b9a3-70749743fd43",
		filename: "claims_2296.csv",
		status: "Success",
		upload_time: "2025-06-04T16:52:57.263987",
	},
	{
		file_id: "2fdd4e6a-755c-4417-8272-b2c91ce3bc3c",
		filename: "claims_5911.csv",
		status: "Failed",
		upload_time: "2025-06-04T17:45:19.263987",
	},
	{
		file_id: "9451a883-cf64-4d70-92f1-7014fe089137",
		filename: "claims_2321.csv",
		status: "Success",
		upload_time: "2025-06-04T01:05:24.263987",
	}
]
};

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API:
        

const response = await fetch("http://127.0.0.1:8000/resource/analytics");
				const data = await response.json();        
         setAnalyticsData(data);      
        // Using mock data for now:
       // setAnalyticsData(mockdata);       
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (err) {
        setError('Failed to load analytics data');
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "calc(100% - 300px)",
          ml: "270px",
          backgroundColor: "#fafafa",
          minHeight: "100vh",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Alert severity="error" sx={{ width: '100%', maxWidth: 600 }}>
          {error}
          <Button 
            onClick={() => window.location.reload()} 
            sx={{ mt: 2 }}
            variant="contained"
          >
            Retry
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <Box 
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: "calc(100% - 300px)",
        ml: "270px",
        backgroundColor: "#fafafa",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          p: 3,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Avatar sx={{ 
            bgcolor: '#2196F3', 
            width: 56, 
            height: 56, 
            mr: 2,
            fontSize: '1.5rem',
            fontWeight: 600
          }}>
            H
          </Avatar>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
            HealthClaim AI
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <>
            {/* Overview Section - Pass summary data */}
            <Overview 
              data={analyticsData} 
              loading={loading} 
            />
            
            {/* Trends Section - Pass files data */}
            <Trends 
              data={analyticsData} 
              loading={loading} 
            />
          </>
        )}
      </Box>
    </Box>
  );
};



