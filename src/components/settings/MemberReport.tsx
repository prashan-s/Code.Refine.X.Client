import { Box, Button, Typography, List, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-color: white;
  overflow-x: hidden;
  font-family: 'Work Sans', 'Noto Sans', sans-serif;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding: 20px;
  gap: 20px;
  justify-content: center;
`;

const SidebarContainer = styled(Box)`
  width: 20%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 16px;
  border-right: 1px solid #f0f2f4;
`;

const HeaderContainer = styled(Box)`
  padding: 16px;
  background-color: #f0f2f4;
  text-align: center;
`;

const ReportsContainer = styled(Box)`
  flex-grow: 1;
  background-color: #ffffff;
  padding: 16px;
  border: 1px solid #dce0e5;
  border-radius: 8px;
`;

const FooterContainer = styled(Box)`
  text-align: center;
  padding: 16px;
  background-color: #f0f2f4;
`;

const MemberReport = () => {
    const members = [
        { name: 'Heather Zhang', role: 'Member', lastActive: '2023-01-01', projects: 'Project A, Project B' },
        { name: 'Aaron Gray', role: 'Admin', lastActive: '2023-01-02', projects: 'Project C, Project D' },
        { name: 'Bob Kramer', role: 'Member', lastActive: '2023-01-03', projects: 'Project E, Project F' },
    ];

    return (
        <Container>
            <HeaderContainer>
                <Typography variant="h3" fontWeight="bold" color="#111418">
                    Member Reports
                </Typography>
                <Typography variant="body1" color="#637588">
                    Generate reports on member activity and workspace metrics
                </Typography>
            </HeaderContainer>
            <ContentContainer>
                <SidebarContainer>
                    <Box>
                        <Typography variant="h6" fontWeight="medium" color="#111418">
                            Settings
                        </Typography>
                        <List>
                            {['Overview', 'Members', 'Labels', 'Templates', 'Roadmaps', 'Reports'].map((item, index) => (
                                <ListItem key={index} button selected={item === 'Reports'}>
                                    <ListItemText primary={item} primaryTypographyProps={{ fontWeight: 'medium', color: '#111418' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Button variant="contained" color="secondary" sx={{ marginTop: 2, borderRadius: 2 }}>
                        Invite Members
                    </Button>
                </SidebarContainer>
                <ReportsContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Member</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Last Active</TableCell>
                                <TableCell>Projects Accessed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {members.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell>{member.name}</TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.lastActive}</TableCell>
                                    <TableCell>{member.projects}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box textAlign="right" marginTop={2}>
                        <Button variant="contained" color="primary">
                            Export Report
                        </Button>
                    </Box>
                </ReportsContainer>
            </ContentContainer>
            <FooterContainer>
                <Typography variant="body2" color="#637588">
                    2023 CodeRefineX Inc.
                </Typography>
            </FooterContainer>
        </Container>
    )
}

export default MemberReport
