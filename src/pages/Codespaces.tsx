import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ButtonBase from '@mui/material/ButtonBase';
import { formatDistanceToNow } from 'date-fns';

// Define the PageProps and Codespace interface
interface PageProps {
    setIsSidebarHidden: (hidden: boolean) => void;
}

interface Codespace {
    id: number;
    projectId: number;
    name: string;
    createdDate: string;
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
    const navigate = useNavigate();  // For navigating to the CodeEditor

    // State to store the selected codespace ID and its code history
    const [selectedFileId, setSelectedFileId] = useState<number | null>(null);
    const [codeHistory, setCodeHistory] = useState<CodeHistory[]>([]);

    useEffect(() => {
        setIsSidebarHidden(true);
        return () => setIsSidebarHidden(false);
    }, [setIsSidebarHidden]);

    useEffect(() => {
        if (codespaces.length > 0) {
            const sortedCodespaces = [...codespaces].sort(
                (a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            );
            const latestCodespace = sortedCodespaces[0];
            setSelectedFileId(latestCodespace.id);
            fetchCodeHistory(latestCodespace.id);
        }
    }, [codespaces]);

    const handleCodespaceClick = async (fileId: number) => {
        setSelectedFileId(fileId);
        fetchCodeHistory(fileId);
    };

    const fetchCodeHistory = async (fileId: number) => {
        try {
            const response = await axiosInstance.get(`/CodeHistory/${fileId}`);
            const sortedHistory = response.data.sort(
                (a: CodeHistory, b: CodeHistory) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
            );
            setCodeHistory(sortedHistory);
        } catch (error) {
            console.error("Error fetching code history:", error);
        }
    };

    // Handle version click and navigate to the editor
    const handleVersionClick = (historyItem: CodeHistory) => {
        // Navigate to the home page (or editor) with the selected version
        navigate("/", { state: { selectedHistory: historyItem } });
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
                    {[...codespaces]
                        .sort((a, b) => b.id - a.id) // Sort by id in descending order
                        .map((codespace: Codespace, index: number) => (
                            <ListItemButton
                                key={index}
                                active={codespace.id === selectedFileId}
                                onClick={() => handleCodespaceClick(codespace.id)}
                            >
                                <StyledIconButton>
                                    <DescriptionIcon />
                                </StyledIconButton>
                                <Typography variant="body1" style={{ marginLeft: 10 }}>
                                    {codespace.name}
                                </Typography>
                                <FileCount>
                                    <Badge color="primary" badgeContent={codeHistory.length} />
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
                                    <ButtonBase key={historyItem.codeId} onClick={() => handleVersionClick(historyItem)}
                                        style={{ width: "100%", display: "flex" }}>
                                        <FileItem style={{ width: "100%", display: "flex" }}>
                                            {/* <StyledChevronIcon /> */}
                                            <StyledTypography variant="body1">
                                                {`Version ${historyItem.version}`}
                                            </StyledTypography>
                                            <Typography variant="body2" color="#777777" style={{ marginLeft: 'auto' }}>
                                                {`${formatDistanceToNow(new Date(historyItem.createdDate))} ago`}
                                            </Typography>
                                        </FileItem>
                                    </ButtonBase>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

// Styled FileItem Component
const FileItem = styled.div`
  margin-bottom: 15px;
  padding: 12px 18px;
  border-radius: 12px; /* Slightly reduced corner radius for a modern subtle look */
  background: #f9f9f9; /* Removed gradient for a subtle flat background color */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); /* Softer shadow for subtle depth */
  display: flex;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); /* Enhance shadow on hover for a slight interactive feel */
    transform: translateY(-2px); /* Subtle lift-up effect for interaction */
  }

  &:active {
    transform: translateY(1px); /* Slight depression effect on click */
  }
`;

// Styled ChevronRightIcon Component
// const StyledChevronIcon = styled(ChevronRightIcon)`
//   color: #6d6d6d;
//   transition: color 0.2s ease;

//   ${FileItem}:hover & {
//     color: #2b2b2b;
//   }
// `;

// Styled Typography Component
const StyledTypography = styled(Typography)`
  font-weight: 500;
  margin-left: 12px;
  color: #3a3a3a; /* Darker gray for modern look */
  user-select: none; /* Disable text selection for better UX */
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