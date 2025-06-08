import React, { useState } from "react";
import { Box, Button, Breadcrumbs, Link, Typography } from "@mui/material";
import axios from "axios";
import FileUploadComponent from "../components/FileUploadComponent";
import FilePreviewComponent from "../components/FilePreviewComponent";
import ColumnMappingComponent from "../components/ColumnMappingComponent";
import DatabaseInsertPreviewComponent from "../components/DataBaseInsertPreviewComponent";

export default function HomePage() {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fileData, setFileData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [mappings, setMappings] = useState([]);
    const [availableTargets] = useState([
        "member_id", "first_name", "last_name", "dob", "gender", "email", "phone", "address",
        "npi_number", "provider_name", "policy_number", "plan_name", "group_number",
        "policy_start_date", "policy_end_date", "claim_date", "admission_date", "discharge_date",
        "amount_claimed", "amount_approved", "claim_status", "rejection_reason",
        "diagnosis_code", "diagnosis_description",
    ]);
    const [currentStep, setCurrentStep] = useState("upload");
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isInserting, setIsInserting] = useState(false);
    const [insertResult, setInsertResult] = useState(null);
    const [fileImportId, setFileImportId] = useState(null);

    const renderBreadcrumbs = () => {
        return (
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Link
                    underline="hover"
                    color={currentStep === 'upload' ? 'text.primary' : 'inherit'}
                    onClick={() => setCurrentStep('upload')}
                    sx={{ cursor: 'pointer' }}
                >
                    Upload
                </Link>

                {currentStep !== 'upload' && (
                    <Link
                        underline="hover"
                        color={currentStep === 'preview' ? 'text.primary' : 'inherit'}
                        onClick={() => setCurrentStep('preview')}
                        sx={{ cursor: 'pointer' }}
                    >
                        Preview
                    </Link>
                )}

                {currentStep === 'mapping' && (
                    <Link
                        underline="hover"
                        color="text.primary"
                        sx={{ cursor: 'default' }}
                    >
                        Mapping
                    </Link>
                )}

                {currentStep === 'insert' && (
                    <Typography color="text.primary">
                        Insert
                    </Typography>
                )}
            </Breadcrumbs>
        );
    };

    const handleFileUpload = async (file) => {
        setUploadedFile(file);
        setIsLoading(true);
        setError(null);
        setIsValid(false);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://127.0.0.1:8000/resource/upload/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setHeaders(response.data.headers || []);
            setFileData(response.data.sample_data || []);
            setMappings(response.data.mapping_result || []);
            setFileImportId(response.data.file_import_id);
            setIsValid(true);
            setCurrentStep("preview");
        } catch (error) {
            setIsValid(false);
            setError(error.response?.data?.detail || "Failed to process file. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMappingChange = (index, newValue) => {
        const newMappings = [...mappings];
        newMappings[index] = {
            ...newMappings[index],
            matched_column: newValue,
            confidence_score: newValue === "Unmapped" ? 0 : newMappings[index].confidence_score || 0.85,
        };
        setMappings(newMappings);
    };

    const handleNextStep = () => {
        setCurrentStep("mapping");
    };

    const handleSubmitMapping = () => {
        if (!uploadedFile || mappings.length === 0) {
            alert("No file or mappings to submit.");
            return;
        }
        setCurrentStep("insert");
    };

    const resetUpload = () => {
        setUploadedFile(null);
        setFileData([]);
        setHeaders([]);
        setMappings([]);
        setIsValid(false);
        setError(null);
        setCurrentStep("upload");
    };

    const handleInsertData = async () => {
        setIsInserting(true);
        setInsertResult(null);

        try {
            const mappingData = mappings.map((mapping) => ({
                import_id: fileImportId,
                header: mapping.header,
                llm_suggestion: mapping.llm_suggestion,
                final_mapping: mapping.matched_column,
                confidence_score: mapping.confidence_score,
                user_edited_mapping: mapping.llm_suggestion !== mapping.matched_column,
            }));

            const insertData = {
                import_id: fileImportId,
                filename: uploadedFile.name,
                mappings: mappingData,
                data: fileData,
            };

            const response = await axios.post("http://127.0.0.1:8000/resource/process", insertData);
            setInsertResult({
                success: true,
                message: `Successfully inserted ${response.data.statistics.fields.success_rate} records out of ${response.data.statistics.fields.total} records into the database.`,
            });
        } catch (error) {
            setInsertResult({
                success: false,
                message: error.response?.data?.detail || "Failed to insert data into database. Please try again.",
            });
        } finally {
            setIsInserting(false);
        }
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
            }}
        >
            {renderBreadcrumbs()}

            {currentStep === "upload" && (
                <FileUploadComponent
                    onFileUpload={handleFileUpload}
                    file={uploadedFile}
                    isValid={isValid}
                    isLoading={isLoading}
                    error={error}
                />
            )}

            {currentStep === "preview" && fileData.length > 0 && headers.length > 0 && (
                <>
                    <FilePreviewComponent data={fileData} headers={headers} />
                    <Box sx={{ mb: 3, display: "flex", gap: 2 }}>
                        <Button variant="contained" onClick={handleNextStep} sx={{ textTransform: "none" }}>
                            Next: Review Mapping
                        </Button>
                        <Button variant="outlined" onClick={resetUpload} sx={{ textTransform: "none" }}>
                            Upload Different File
                        </Button>
                    </Box>
                </>
            )}

            {currentStep === "mapping" && mappings.length > 0 && (
                <>
                    <ColumnMappingComponent
                        mappings={mappings}
                        onMappingChange={handleMappingChange}
                        availableTargets={availableTargets}
                    />
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" onClick={handleSubmitMapping} sx={{ textTransform: "none" }}>
                            Submit Mapping
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => setCurrentStep("preview")}
                            sx={{ textTransform: "none" }}
                        >
                            Back to Preview
                        </Button>
                    </Box>
                </>
            )}

            {currentStep === "insert" && (
                <DatabaseInsertPreviewComponent
                    mappings={mappings}
                    fileData={fileData}
                    onInsertData={handleInsertData}
                    isInserting={isInserting}
                    insertResult={insertResult}
                />
            )}
        </Box>
    );
}