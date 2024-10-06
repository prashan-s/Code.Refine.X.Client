import React, { useState } from 'react';
import styled from 'styled-components';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import ActivitySection from '@components/settings/ActivitySection';
import ProfileSection from '@components/settings/ProfileSection';
import PersonalizationSection from '@components/settings/PersonalizationSection';
import APISection from '@components/settings/APISection';
import { useNavigate } from 'react-router-dom';
import SecuritySection from '@components/settings/SecuritySection';
import MemberSection from '@components/settings/MemberSection';

// Layout Component - Should be separated into its own file (e.g., Layout.tsx)
const Layout = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #fff;
  width: 100%;
`;

// ContentContainer Component - Should be separated into its own file (e.g., ContentContainer.tsx)
const ContentContainer = styled(Box)`
  display: flex;
  flex: 1;
  padding: 16px;
  gap: 24px;
  justify-content: space-around;
  flex-direction: row;
  width: "100%";
`;

// Sidebar Component - Should be separated into its own file (e.g., Sidebar.tsx)
const StyledSidebar = styled(Box)`
  min-width: 240px;
  padding: 16px;
`;

const SettingsPage: React.FC = () => {

    const navigate = useNavigate();

    // State for tracking selected setting
    const [selectedSection, setSelectedSection] = useState<string>('Activity');

    // Function to render the appropriate component based on the selected section
    const renderSection = () => {
        switch (selectedSection) {
            case 'Profile':
                return <ProfileSection />;
            case 'Team':
                return <MemberSection />;
            // case 'Activity':
            //     return <ActivitySection />;
            case 'Personalization':
                return <PersonalizationSection />;
            case 'Security':
                return <SecuritySection />;
            case 'API':
                return <APISection />;
            default:
                return <ProfileSection />;
        }
    };

    return (
        <Layout>
            {/* <AppBar position="static" color="transparent" elevation={0} style={{ padding: "0 1rem" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
                        CodeRefineX
                    </Typography>
                    <Button color="inherit">Projects</Button>
                    <Button color="inherit">Resources</Button>
                    <Button color="inherit">Settings</Button>
                    <Button variant="contained" color="primary" sx={{ marginX: 2 }}>
                        New
                    </Button>
                    <IconButton>
                        <Avatar alt="User Avatar" />
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Container maxWidth="xl">
                <ContentContainer>
                    {/* Sidebar Component - Should be separated into its own file (e.g., Sidebar.tsx) */}
                    <StyledSidebar>
                        <Typography variant="h6" gutterBottom>
                            Settings
                        </Typography>
                        <List>
                            {/* {['Profile', 'Team', 'Activity', 'Personalization', 'Security', 'API'].map( */}
                            {['Profile', 'Security'].map(
                                (item, index) => (
                                    <ListItem
                                        button
                                        key={index}
                                        onClick={() => setSelectedSection(item)} // Update selected section
                                        selected={selectedSection === item} // Highlight selected item
                                    >
                                        <ListItemText primary={item} />
                                    </ListItem>
                                )
                            )}
                        </List>
                    </StyledSidebar>
                    {renderSection()}
                </ContentContainer>
            </Container>
        </Layout>
    );
};

export default SettingsPage;