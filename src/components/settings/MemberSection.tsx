import { Box, Typography, Avatar, Button, Divider } from '@mui/material';
import styled from 'styled-components';

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

const MemberCard = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

interface Member {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
}

const MemberSection: React.FC = () => {
    const members: Member[] = [
        { id: 1, name: 'Heather Zhang', email: 'heather@facebook.com', role: 'Member', avatar: 'https://cdn.usegalileo.ai/stability/67315eff-a61d-4d96-9c39-a623c86255a2.png' },
        { id: 2, name: 'Aaron Gray', email: 'aaron@facebook.com', role: 'Admin', avatar: 'https://cdn.usegalileo.ai/stability/b8c158e6-68cf-43b3-8139-feb2b884ec49.png' },
        // Add more members here
    ];

    return (
        <MainContent>
            <Typography variant="h4" component="p" fontWeight="bold" px={2}>
                Members
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" px={2} pb={2}>
                Members with access to this workspace. Admins can grant and revoke access.
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {members.map((member) => (
                <MemberCard key={member.id}>
                    <Box display="flex" alignItems="center">
                        <Avatar src={member.avatar} sx={{ width: 56, height: 56, marginRight: 2 }} />
                        <Box>
                            <Typography variant="body1" fontWeight="bold">
                                {member.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {member.email}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                        {member.role}
                    </Typography>
                </MemberCard>
            ))}
            <Button variant="contained" color="primary" style={{ width: "200px", marginTop: "20px" }}>
                Invite Members
            </Button>
        </MainContent>
    );
};

export default MemberSection;