import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';

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

const ActivitySection = () => {
    // Activity data - Consider moving this data to a separate context or data file
    const activities = [
        { title: 'Total Logins', value: '1,000' },
        { title: 'Unique Days Logged In', value: '100' },
        { title: 'Total Sessions', value: '2,000' },
        { title: 'Avg. Session Duration', value: '30 min' },
    ];

    // Feature usage data - Consider moving this data to a separate context or data file
    const features = [
        { name: 'File View', usage: '100%' },
        { name: 'Dashboard', usage: '40%' },
        { name: 'Calendar', usage: '50%' },
        { name: 'Kanban', usage: '70%' },
    ];

    return (
        <MainContent>
            <Typography variant="h4" component="p" fontWeight="bold" px={2} pb={2}>
                Activity
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* ActivitySummary Component - Should be separated into its own file (e.g., ActivitySummary.tsx) */}
            <Box display="flex" gap={4} paddingY={2} flexWrap="wrap">
                {activities.map((activity, index) => (
                    <Paper key={index} elevation={2} sx={{ padding: 4, flex: 1, minWidth: 158 }}>
                        <Typography variant="h6" gutterBottom>
                            {activity.title}
                        </Typography>
                        <Typography variant="h4" fontWeight="bold">
                            {activity.value}
                        </Typography>
                    </Paper>
                ))}
            </Box>
            <Divider />
            {/* LoginFrequency Component - Should be separated into its own file (e.g., LoginFrequency.tsx) */}
            <Paper elevation={2} sx={{ padding: 4, marginY: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Login Frequency
                </Typography>
                {/* Placeholder for SVG or chart */}
                <Box height={180} display="flex" justifyContent="center" alignItems="center">
                    <Typography variant="body2">Chart Placeholder</Typography>
                </Box>
            </Paper>
            <Divider />
            {/* FeatureUsage Component - Should be separated into its own file (e.g., FeatureUsage.tsx) */}
            <Paper elevation={2} sx={{ padding: 4, marginY: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Most Used Features
                </Typography>
                <Box display="grid" gridTemplateColumns="auto 1fr" gap={2} alignItems="center">
                    {features.map((feature, index) => (
                        <React.Fragment key={index}>
                            <Typography variant="body2" fontWeight="bold">
                                {feature.name}
                            </Typography>
                            <Box width="100%" height={16} bgcolor="#f0f2f4" position="relative">
                                <Box
                                    width={feature.usage}
                                    height="100%"
                                    bgcolor="#637588"
                                    position="absolute"
                                    sx={{ borderRadius: '4px 0 0 4px' }}
                                />
                            </Box>
                        </React.Fragment>
                    ))}
                </Box>
            </Paper>
            <Box textAlign="right" marginTop={4}>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 2 }}
                >
                    Save
                </Button>
            </Box>
        </MainContent >
    )
}

export default ActivitySection
