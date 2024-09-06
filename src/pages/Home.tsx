import SignIn from "@components/SignIn";
import { useAuth } from "@contexts/AuthContext";
import { RootState } from "@redux/reducers";
import { ContentContainer, FullScreenContainer } from "@styles/Home";
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
    // Access the isCollapsed state from Redux
    const isCollapsed = useSelector((state: RootState) => state.sideBar.isCollapsed);
    const { isAuthenticated } = useAuth();

    const [showSignUp, setShowSignUp] = useState(false);

    const toggleSignUp = () => setShowSignUp(!showSignUp);

    if (!isAuthenticated) {
        return (
            <FullScreenContainer>
                <SignIn onSignUpClick={toggleSignUp} />
            </FullScreenContainer>
        );
    }

    // Adjust the main content width based on the sidebar's state
    // const contentStyle = {
    //     marginRight: isCollapsed ? '60px' : '600px',
    //     transition: 'margin-left 0.3s ease',
    //     padding: '20px',
    // };

    // const [showSignUp, setShowSignUp] = useState(false);

    // const toggleSignUp = () => setShowSignUp(!showSignUp);

    return (
        <ContentContainer isCollapsed={isCollapsed}>
            {!isAuthenticated && <SignIn onSignUpClick={toggleSignUp} />}
        </ContentContainer>
    );
};

export default Home;