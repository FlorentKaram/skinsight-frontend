import { Box, Typography } from "@mui/material";
import React from "react";

interface ChildProps {
  label: string;
  data: string;
}
function ProfileInfoField({ label, data }: ChildProps) {
  return (
    <Box>
      <Typography fontWeight={400}>{label}</Typography>: {data}
    </Box>
  );
}

export default ProfileInfoField;
