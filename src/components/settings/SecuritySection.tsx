import React from "react";
import styled from "styled-components";
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
    Divider,
} from "@mui/material";
import { Lock } from "@mui/icons-material";

// MainContent Component
const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 960px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

// Section Component
const Section = styled(Box)`
  padding: 16px;
  background-color: white;
`;

// PasswordField Component - Styled for Password Fields
const PasswordField: React.FC<{ label: string; placeholder: string }> = ({
    label,
    placeholder,
}) => (
    <Box maxWidth={480} py={1} px={2}>
        <TextField
            label={label}
            placeholder={placeholder}
            type="password"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Lock />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            sx={{
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
            }}
        />
    </Box>
);

const SecuritySection = () => {
    return (
        <MainContent>
            <Typography variant="h4" component="p" fontWeight="bold" px={2} pb={2}>
                Security
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Password Section Component - Split this into a separate component in future */}
            <Section>
                <Typography variant="h6" component="h3" fontWeight="bold" px={2} pb={2}>
                    Password
                </Typography>
                <PasswordField label="Current Password" placeholder="••••••••" />
                <PasswordField label="New Password" placeholder="••••••••" />
                <Box px={2} py={3}>
                    <Button variant="contained" color="primary" size="large">
                        Change Password
                    </Button>
                </Box>
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* Delete Account Section Component - Split this into a separate component in future */}
            <Section>
                <Typography variant="h6" component="h3" fontWeight="bold" px={2} pb={2}>
                    Delete Account
                </Typography>
                <Typography variant="body1" component="p" px={2} pb={2}>
                    Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <Box px={2} py={3}>
                    <Button variant="contained" color="error" size="large">
                        Delete Account
                    </Button>
                </Box>
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* Request Report Section Component - Split this into a separate component in future */}
            <Section>
                <Typography variant="h6" component="h3" fontWeight="bold" px={2} pb={2}>
                    Request Report
                </Typography>
                <Typography variant="body1" component="p" px={2} pb={2}>
                    You can request a report of your data at any time.
                </Typography>
                <Box px={2} py={3}>
                    <Button variant="outlined" color="primary" size="large">
                        Request Report
                    </Button>
                </Box>
            </Section>
        </MainContent>
    )
}

export default SecuritySection
