import CodeEditor from "@components/CodeEditor";
import { useAuth } from "@contexts/AuthContext";
import { RootState } from "@redux/reducers";
import { ContentContainer } from "@styles/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axiosInstance from "@utils/axiosInstance";
import { setProjects } from "@redux/reducers/projectsReducer";
import useSessionStorage from "@hooks/useSessionStorage";

interface PageProps {
    setIsSidebarHidden: (hidden: boolean) => void;
}

const Editor = ({ setIsSidebarHidden }: PageProps) => {

    const { isAuthenticated } = useAuth();
    const dispatch = useDispatch();
    const [storedUserId,] = useSessionStorage("userId", null);
    const [projectCount, setProjectCount] = useState(0);
    const [editorCode, setEditorCode] = useState<string>("");
    const [initialCodeMounted, setInitialCodeMounted] = useState<boolean>(false); // Track initial mount

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

    const createProject = async (userId: string) => {
        try {
            const response = await axiosInstance.post(`/Projects`, {
                userId,
                projectName: "untitled project",
                description: "untitled",
                repositoryURL: ""
            });

            const newProject = response.data;
            console.log("New project created:", newProject);

            // await createFileInProject(newProject.projectId, editorCode);
            await createFileInProject(newProject.projectId, `
                // Write your Java code here
                public class Main {
                    public static void main(String[] args) {
                        System.out.println("Hello World");
                    }
                }`
            );
        } catch (err) {
            console.error("Error creating a new project:", err);
        }
    };

    // Create a file in the project using the current editor code
    const createFileInProject = async (projectId: number, code: string) => {
        try {
            const response = await axiosInstance.post(`/files`, {
                projectId: projectId,
                fileName: "untitled",
                code: code,
            });
            console.log("New file created:", response.data);
        } catch (err) {
            console.error("Error creating file in project:", err);
        }
    };

    useEffect(() => {
        const checkProjects = async () => {
            if (isAuthenticated) {
                if (storedUserId) {
                    const projects = await fetchProjects(storedUserId);
                    setProjectCount(projects.length);

                    // If the user has no projects, create a new one
                    if (projects.length === 0) {
                        await createProject(storedUserId);
                    }
                }
            }
        };

        checkProjects();
    }, [isAuthenticated, storedUserId]); // Re-run if authentication status changes

    if (isAuthenticated) {
        return (
            <ContentContainer isCollapsed={isCollapsed}>
                <CodeEditor
                    selectedHistory={selectedHistory}
                    onCodeChange={setEditorCode} // Capture the code changes
                    onInitialMount={(code: string) => {
                        setEditorCode(code); // Capture initial code
                        setInitialCodeMounted(true); // Mark that initial code has been captured
                    }}
                />
            </ContentContainer>
        );
    }
};

export default Editor;