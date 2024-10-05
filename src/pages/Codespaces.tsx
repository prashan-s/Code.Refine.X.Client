import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
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

const Codespaces: React.FC<PageProps> = ({ setIsSidebarHidden }) => {
    const location = useLocation();
    const { codespaces } = location.state;

    // Hide sidebar when on the Codespaces page
    useEffect(() => {
        setIsSidebarHidden(true);

        // Cleanup: show sidebar when leaving the Codespaces page
        return () => setIsSidebarHidden(false);
    }, [setIsSidebarHidden]);

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
                        <ListItemButton key={index}>
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
                <Typography variant="h4" gutterBottom>
                    {codespaces[0]?.name || "No Codespace Selected"}
                </Typography>

                <Typography variant="body1" style={{ marginBottom: 10 }}>
                    {codespaces.length} files, 2 pull requests
                </Typography>

                <OpenButton variant="contained" color="primary">
                    Open in GitHub
                </OpenButton>

                <FileList>
                    <FileItem>
                        <ChevronRightIcon />
                        <Typography variant="body1" style={{ marginLeft: 10 }}>
                            main.ts - Renamed file (10 minutes ago)
                        </Typography>
                    </FileItem>
                    <FileItem>
                        <ChevronRightIcon />
                        <Typography variant="body1" style={{ marginLeft: 10 }}>
                            logo.svg - New file (10 minutes ago)
                        </Typography>
                    </FileItem>
                    <FileItem>
                        <ChevronRightIcon />
                        <Typography variant="body1" style={{ marginLeft: 10 }}>
                            index.html - New file (10 minutes ago)
                        </Typography>
                    </FileItem>
                </FileList>
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

const OpenButton = styled(Button)`
  margin-bottom: 20px;
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