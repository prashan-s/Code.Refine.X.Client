import CodeEditor from "@components/CodeEditor";
import { useAuth } from "@contexts/AuthContext";
import { RootState } from "@redux/reducers";
import { ContentContainer } from "@styles/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "@utils/axiosInstance";
import { setProjects } from "@redux/reducers/projectsReducer";
import useSessionStorage from "@hooks/useSessionStorage";

interface PageProps {
    setIsSidebarHidden: (hidden: boolean) => void;
}

const Editor = ({ setIsSidebarHidden }: PageProps) => {

    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [storedUserId,] = useSessionStorage("userId", null);
    const [projectCount, setProjectCount] = useState(0);

    // Show sidebar when on the editor page
    useEffect(() => {
        setIsSidebarHidden(false);

        // Cleanup: hide sidebar when leaving the editor page
        return () => setIsSidebarHidden(true);
    }, [setIsSidebarHidden]);

    // Access the isCollapsed state from Redux
    const isCollapsed = useSelector((state: RootState) => state.sideBar.isCollapsed);

    const location = useLocation(); // Get the location object
    const selectedHistory = location.state?.selectedHistory; // Access the passed state (CodeHistory)

    const fetchProjects = async (userId: string) => {
        try {
            const response = await axiosInstance.get(`/Users/${userId}/projects`);
            const projectsData = response.data.projects;

            // Update the Redux store with fetched projects
            dispatch(setProjects(projectsData));

            return projectsData;
        } catch (err) {
            console.error("Error fetching projects:", err);
            return [];
        }
    };

    useEffect(() => {
        const checkProjects = async () => {
            if (isAuthenticated) {
                if (storedUserId) {
                    const projects = await fetchProjects(storedUserId);
                    setProjectCount(projects.length);
                    // If the user has more than 0 projects, navigate to the /projects page
                    if (projectCount === 0) {
                        //
                    }
                }
            }
        };

        checkProjects();
    }, [isAuthenticated, navigate]); // Re-run if authentication status changes

    if (isAuthenticated) {
        return (
            <ContentContainer isCollapsed={isCollapsed}>
                <CodeEditor selectedHistory={selectedHistory} />
            </ContentContainer>
        );
    }
};

export default Editor;