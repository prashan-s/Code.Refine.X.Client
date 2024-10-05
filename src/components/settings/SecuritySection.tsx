import React, { useState } from "react";
import styled from "styled-components";
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import axiosInstance from "@utils/axiosInstance";
import useSessionStorage from "@hooks/useSessionStorage";

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

const PasswordField: React.FC<{
    label: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, placeholder, value, onChange }) => (
    <Box maxWidth={480} py={1} px={2}>
        <TextField
            label={label}
            placeholder={placeholder}
            type="password"
            fullWidth
            value={value} // Accept value prop
            onChange={onChange} // Accept onChange prop
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
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [storedUserId] = useSessionStorage("userId", null);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handlePasswordChange = async () => {
        console.log("currentPassword", currentPassword);
        console.log("newPassword", newPassword);
        console.log("confirmPassword", confirmPassword);
        if (newPassword !== confirmPassword) {
            setErrorMessage("New Password and Confirm Password do not match.");
            return;
        }

        try {
            const payload = {
                currentPassword,
                newPassword
            };

            const response = await axiosInstance.put(`/Users/change-password/${storedUserId}`, payload);

            console.log("Password changed successfully", response);
        } catch (error) {
            console.error("Error changing password:", error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            console.log("handleDeleteAccount called");

            await axiosInstance.delete(`/Users/${storedUserId}`);
            console.log("Account deleted successfully");
        } catch (error) {
            console.error("Error deleting account:", error);
        } finally {
            setOpenDeleteDialog(false);
        }
    };

    return (
        <MainContent>
            <Typography variant="h4" component="p" fontWeight="bold" px={2} pb={2}>
                Security
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Password Section */}
            <Section>
                <Typography variant="h6" component="h3" fontWeight="bold" px={2} pb={2}>
                    Password
                </Typography>
                <PasswordField
                    label="Current Password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <PasswordField
                    label="New Password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <PasswordField
                    label="Confirm Password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errorMessage && (
                    <Typography color="error" variant="body2" px={2} py={1}>
                        {errorMessage}
                    </Typography>
                )}
                <Box px={2} py={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handlePasswordChange}
                    >
                        Change Password
                    </Button>
                </Box>
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* Delete Account Section */}
            <Section>
                <Typography variant="h6" component="h3" fontWeight="bold" px={2} pb={2}>
                    Delete Account
                </Typography>
                <Typography variant="body1" component="p" px={2} pb={2}>
                    Once you delete your account, there is no going back. Please be certain.
                </Typography>
                <Box px={2} py={3}>
                    <Button
                        variant="contained"
                        color="error"
                        size="large"
                        onClick={() => setOpenDeleteDialog(true)}
                    >
                        Delete Account
                    </Button>
                </Box>
            </Section>

            <Divider sx={{ my: 3 }} />

            {/* Request Report Section */}
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

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">
                    {"Delete Account"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-dialog-description">
                        Are you sure you want to delete your account?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDeleteAccount} color="error" autoFocus>
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </MainContent>
    );
};

export default SecuritySection;
