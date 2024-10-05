import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, TextField, Typography, Box, Card, CardContent, CircularProgress, Avatar as MUIAvatar, IconButton, Divider } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axiosInstance from '@utils/axiosInstance';
import useSessionStorage from "@hooks/useSessionStorage";

const MainContent = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 960px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 960px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const ProfileEditSection = styled.div`
  background-color: #ffffff;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const ProfileImageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

const StatsSection = styled.div`
  background-color: #ffffff;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
`;

const StatCard = styled(Card)`
  flex: 1;
  min-width: 250px;
  padding: 24px;
  background-color: #ffffff;
  color: #000000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;
`;

const ProfileEditForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 16px;
`;

const ProfileSection = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [role, setRole] = useState("");
    const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
    const [loading, setLoading] = useState(false);
    const [storedUserId, ] = useSessionStorage("userId", null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axiosInstance.get(`/Users/${storedUserId}`);
                const userData = response.data;
                
                // Set user details from API response
                setFirstName(userData.firstName || "");
                setLastName(userData.lastName || "");
                setRole(userData.role || "");
                setProfileImage(userData.profileImage || "https://via.placeholder.com/150");
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, [storedUserId]);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setProfileImage(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        setLoading(true); 
        try {
            const payload = {
                firstName,
                lastName,
                role,
                profileImage
            };

            const response = await axiosInstance.put(`/Users/${storedUserId}`, payload);
            console.log('Profile updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <MainContent>
            <ContentWrapper>
                {/* Profile Edit Form */}
                <ProfileEditSection>
                    <ProfileEditForm>
                        <Typography variant="h4" component="p" fontWeight="bold" px={2} pb={2}>
                            User Profile
                        </Typography>

                        <Divider sx={{ mb: 2 }} />

                        <ProfileImageContainer>
                            <MUIAvatar src={profileImage} alt="Profile Image" sx={{ width: 150, height: 150 }} />
                            <label htmlFor="profile-image-upload">
                                <IconButton color="primary" component="span">
                                    <PhotoCamera />
                                </IconButton>
                                <input
                                    accept="image/*"
                                    id="profile-image-upload"
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={handleProfileImageChange}
                                />
                            </label>
                        </ProfileImageContainer>
                        <TextField label="First name" variant="outlined" fullWidth margin="normal" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        <TextField label="Last name" variant="outlined" fullWidth margin="normal" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        <TextField label="Role" variant="outlined" placeholder="Developer" fullWidth margin="normal" value={role} onChange={(e) => setRole(e.target.value)} />
                    </ProfileEditForm>

                    <ButtonContainer>
                        <Button variant="outlined" color="secondary">Cancel</Button>
                        <Button variant="contained" color="primary" onClick={handleSave} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                    </ButtonContainer>
                </ProfileEditSection>

                {/* Stats Overview Section */}
                <StatsSection>
                    <Typography variant="h4" component="p" fontWeight="bold" px={2} pb={2}>
                        Usage Statistics
                    </Typography>

                    <Divider sx={{ mb: 2 }} />
                    <StatsContainer>
                        <StatCard>
                            <CardContent>
                                <Typography variant="h6" color="primary">GitHub Contributions</Typography>
                                <ProgressContainer>
                                    <CircularProgress variant="determinate" value={45} thickness={6} />
                                    <Typography variant="body2" color="textSecondary">45% completion rate</Typography>
                                </ProgressContainer>
                            </CardContent>
                        </StatCard>
                        <StatCard>
                            <CardContent>
                                <Typography variant="h6" color="primary">Code Efficiency Gains</Typography>
                                <ProgressContainer>
                                    <CircularProgress variant="determinate" value={35} thickness={6} />
                                    <Typography variant="body2" color="textSecondary">35% efficiency gain</Typography>
                                </ProgressContainer>
                            </CardContent>
                        </StatCard>
                        <StatCard>
                            <CardContent>
                                <Typography variant="h6" color="primary">Shared Snippets</Typography>
                                <Typography variant="body2" color="textSecondary">20 snippets shared</Typography>
                            </CardContent>
                        </StatCard>
                        <StatCard>
                            <CardContent>
                                <Typography variant="h6" color="primary">Supported Languages</Typography>
                                <Typography variant="body2" color="textSecondary">5 languages supported</Typography>
                            </CardContent>
                        </StatCard>
                    </StatsContainer>
                </StatsSection>
            </ContentWrapper>
        </MainContent>
    );
};

export default ProfileSection;
