import React, { useState } from 'react';
import styled from 'styled-components';
import {
    Box,
    Button,
    Typography,
    Divider,
    FormControlLabel,
    Switch,
    Avatar
} from '@mui/material';

// MainContent Component - Styled for Personalization Section
const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 960px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  align-items: center;
`;

// InputField Component - Styled for fields
const InputField = styled(Box)`
  display: flex;
`;

const PersonalizationSection: React.FC = () => {
    // State to manage dark mode toggle
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const handleToggle = () => {
        setDarkMode(!darkMode);
        // Handle dark/light mode change here (e.g., update theme in app context)
    };

    return (
        <MainContent>
            {/* User Avatar */}
            <Avatar
                src="https://cdn.usegalileo.ai/stability/67315eff-a61d-4d96-9c39-a623c86255a2.png"
                sx={{ width: 96, height: 96, marginBottom: 3 }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
                Personalization
            </Typography>
            <Divider sx={{ mb: 3, width: '100%' }} />

            {/* Dark Mode Toggle */}
            <InputField>
                <FormControlLabel
                    control={
                        <Switch
                            checked={darkMode}
                            onChange={handleToggle}
                            color="primary"
                        />
                    }
                    label={
                        <Typography variant="body1" fontWeight="bold">
                            {darkMode ? "Dark Mode" : "Light Mode"}
                        </Typography>
                    }
                />
            </InputField>

            {/* Save Button */}
            <Box mt={3}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleToggle}
                >
                    Save Changes
                </Button>
            </Box>
        </MainContent>
    );
};

export default PersonalizationSection;