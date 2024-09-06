import { RootState } from "@redux/reducers";
import { useSelector } from "react-redux";

const Home = () => {
    // Access the isCollapsed state from Redux
    const isCollapsed = useSelector((state: RootState) => state.sideBar.isCollapsed);

    // Adjust the main content width based on the sidebar's state
    const contentStyle = {
        marginRight: isCollapsed ? '60px' : '600px', // Adjust according to sidebar width
        transition: 'margin-left 0.3s ease',        // Smooth transition
        padding: '20px',                            // Optional padding for better UX
    };

    return (
        <div style={contentStyle}>
            <h1>Home Page</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat, magni. Incidunt aliquam excepturi libero voluptatem officia illum sequi atque nostrum obcaecati, iure non nemo hic optio consectetur maxime corrupti reiciendis.</p>
        </div>
    );
};

export default Home;