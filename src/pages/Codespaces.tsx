import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import axiosInstance from 'src/utils/axiosInstance';  // Assuming axiosInstance is already configured
import {
    Button,
    List,
    ListItem,
    Typography,
    Divider,
    IconButton,
    InputBase,
    Badge,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Define the PageProps and Codespace interface
interface PageProps {
    setIsSidebarHidden: (hidden: boolean) => void;
}

interface Codespace {
    id: number;
    projectId: number;
    name: string;
}

interface CodeHistory {
    codeId: number;
    fileID: number;
    code: string;
    analysisResult: string;
    language: string;
    createdDate: string;
    version: number;
}

const Codespaces: React.FC<PageProps> = ({ setIsSidebarHidden }) => {
    const location = useLocation();
    const { codespaces } = location.state;

    // State to store the selected codespace ID and its code history
    const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
    const [codeHistory, setCodeHistory] = useState<CodeHistory[]>([]);

    // Hide sidebar when on the Codespaces page
    useEffect(() => {
        setIsSidebarHidden(true);

        // Cleanup: show sidebar when leaving the Codespaces page
        return () => setIsSidebarHidden(false);
    }, [setIsSidebarHidden]);

    // Function to handle codespace click and fetch code history
    const handleCodespaceClick = async (fileId: number) => {
        setSelectedFileId(fileId);
        try {
            const response = await axiosInstance.get(`/CodeHistory/${fileId}`);
            setCodeHistory(response.data);  // Assuming response data is an array of code history
        } catch (error) {
            console.error("Error fetching code history:", error);
        }
    };

    return (
        <AppContainer>
            <Sidebar>
                <SearchContainer>
                    <SearchIconWrapper>
                        <SearchOutlined />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder="Search codespaces" inputProps={{ "aria-label": "search" }} />
                </SearchContainer>

                <Typography variant="h6" gutterBottom>
                    Codespaces
                </Typography>

                <List>
                    {codespaces.map((codespace: Codespace, index: number) => (
                        <ListItemButton key={index} onClick={() => handleCodespaceClick(codespace.id)}>
                            <StyledIconButton>
                                <DescriptionIcon />
                            </StyledIconButton>
                            <Typography variant="body1" style={{ marginLeft: 10 }}>
                                {codespace.name}
                            </Typography>
                            <FileCount>
                                <Badge color="primary" badgeContent={2} />
                            </FileCount>
                        </ListItemButton>
                    ))}
                </List>

                <Divider />

                <CreateButton>
                    <AddIcon />
                    <Typography variant="body2" style={{ marginLeft: 10 }}>
                        Create New Codespace
                    </Typography>
                </CreateButton>
            </Sidebar>

            <MainContent>
                {selectedFileId && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            Code History for Codespace {selectedFileId}
                        </Typography>

                        <FileList>
                            {codeHistory.length > 0 ? (
                                codeHistory.map((historyItem) => (
                                    <FileItem key={historyItem.codeId}>
                                        <ChevronRightIcon />
                                        <Typography variant="body1" style={{ marginLeft: 10 }}>
                                            {historyItem.code} - Version {historyItem.version} ({new Date(historyItem.createdDate).toLocaleString()})
                                        </Typography>
                                    </FileItem>
                                ))
                            ) : (
                                <Typography variant="body1">No code history available</Typography>
                            )}
                        </FileList>
                    </>
                )}
            </MainContent>
        </AppContainer>
    );
};

// Styled Components
const AppContainer = styled.div`
  display: flex;
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 300px;
  background-color: #ffffff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-right: 1px solid #e0e0e0;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SearchIconWrapper = styled.div`
  padding: 0 10px;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const StyledInputBase = styled(InputBase)`
  flex: 1;
  padding-left: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const CreateButton = styled(Button)`
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
`;

const FileList = styled.div`
  margin-top: 20px;
`;

const FileItem = styled.div`
  margin-bottom: 10px;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
`;

const ListItemButton = styled(ListItem) <{ active?: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: ${({ active }) => (active ? "#e3f2fd" : "transparent")};
  padding: 10px;
  border-radius: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const StyledIconButton = styled(IconButton)`
  color: #757575;
`;

const FileCount = styled.div`
  margin-left: auto;
`;

export default Codespaces;