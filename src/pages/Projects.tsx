import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/utils/axiosInstance';
import styled from "styled-components";
import { Container, Grid, Typography, Box, TextField, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { formatDistanceToNow } from 'date-fns';  // Import the date formatting function

interface PageProps {
    setIsSidebarHidden: (hidden: boolean) => void;
}

interface Project {
    projectID: number;
    projectName: string;
    description: string;
    createdDate: string;
}

interface Codespace {
    id: number;
    projectId: number;
    name: string;
}

const Projects = ({ setIsSidebarHidden }: PageProps) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [codespaces, setCodespaces] = useState<Codespace[]>([]);
    const navigate = useNavigate();

    // Hide sidebar when on the Projects page
    useEffect(() => {
        setIsSidebarHidden(true);

        // Cleanup: show sidebar when leaving the Projects page
        return () => setIsSidebarHidden(false);
    }, [setIsSidebarHidden]);

    // Fetch projects and map files to codespaces
    const fetchProjectsAndCodespaces = async () => {
        try {
            const projectsResponse = await axiosInstance.get('/Users/1/projects');
            const projectsData = projectsResponse.data.projects;

            // Map files in projects to codespaces
            const codespacesData = projectsData.flatMap((project: any) =>
                project.files.map((file: any) => ({
                    id: file.fileId,
                    projectId: project.projectID,
                    name: file.fileName,
                }))
            );

            setProjects(projectsData);
            setCodespaces(codespacesData);

            // Navigate if no projects
            if (projectsData.length === 0) {
                navigate('/');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        fetchProjectsAndCodespaces();
    }, []);

    // Handle project click - navigate to the Codespaces page
    const handleProjectClick = (projectID: number) => {
        // Filter codespaces for this project
        const projectCodespaces = codespaces.filter(cs => cs.projectId === projectID);

        // Navigate to the codespaces page with the project codespaces
        navigate(`/projects/${projectID}/codespaces`, { state: { codespaces: projectCodespaces } });
    };

    return (
        <StyledContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={5} mt={3}>
                <Typography variant="h4" fontWeight="bold" color="#222222">
                    All Projects
                </Typography>
                <StyledButton variant="contained" startIcon={<AddCircleOutlineIcon />}>New Project</StyledButton>
            </Box>

            {/* Search Section */}
            <Box mb={5} maxWidth="600px">
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="Search projects"
                    InputProps={{
                        startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
                        style: { paddingLeft: "16px", backgroundColor: "#EFEFEF", borderRadius: 20, boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }
                    }}
                />
            </Box>

            {/* Recent Projects Section */}
            <Box my={3}>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="#222222">
                    Recent Projects
                </Typography>
                <Grid container spacing={4}>
                    {projects.map((project, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <StyledProjectCard onClick={() => handleProjectClick(project.projectID)}>
                                <img src={project.image} alt={project.projectName} className="project-image" />
                                <Typography variant="h6" fontWeight="bold" mt={2} color="#333333">
                                    {project.projectName}
                                </Typography>
                                <Typography variant="body2" color="#777777" mt={1}>
                                    {`${project.description}, ${formatDistanceToNow(new Date(project.createdDate))} ago`}
                                </Typography>
                            </StyledProjectCard>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </StyledContainer>
    );
};

// Styled Components
const StyledContainer = styled(Container)`
  padding: 32px;
  min-width: 100vw;  /* Full viewport width */
  height: 100vh; /* Full viewport height */
  margin: 0;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled(Button)`
  background-color: #007bff !important;
  color: #ffffff !important;
  border-radius: 24px;
  padding: 10px 28px;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #0056cc !important;
    box-shadow: 0 6px 16px rgba(0, 86, 204, 0.4);
  }
`;

const StyledProjectCard = styled(Box)`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.2);
  }
  .project-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin-bottom: 16px;
    border-radius: 12px;
  }
`;

export default Projects;