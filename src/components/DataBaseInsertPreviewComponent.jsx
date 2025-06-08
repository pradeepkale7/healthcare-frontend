import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";

export default function DatabaseInsertPreviewComponent({
  mappings,
  fileData,
  onInsertData,
  isInserting,
  insertResult,
}) {
  // Extract only mapped columns
  const mappedColumns = mappings
    .filter((m) => m.matched_column)
    .map((m) => ({
      header: m.header,
      matched_column: m.matched_column,
    }));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Preview of Data to be Inserted
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 2 ,maxHeight: 400}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {mappedColumns.map((col) => (
                <TableCell key={col.matched_column}>
                  {col.matched_column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {fileData.slice(0,10).map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {mappedColumns.map((col) => (
                  <TableCell key={col.matched_column}>
                    {row[col.header] ?? ""}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={onInsertData}
        disabled={isInserting}
        sx={{ textTransform: "none" }}
      >
        {isInserting ? <CircularProgress size={20} /> : "Insert into Database"}
      </Button>

      {insertResult && (
        <Typography
          variant="body2"
          color={insertResult.success ? "green" : "error"}
          sx={{ mt: 2 }}
        >
          {insertResult.message}
        </Typography>
      )}
    </Box>
  );
}
