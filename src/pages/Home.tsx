import CodeEditor from "@components/CodeEditor";
import SignIn from "@components/SignIn";
import SignUp from "@components/SignUp";
import { useAuth } from "@contexts/AuthContext";
import { RootState } from "@redux/reducers";
import {
    ContentContainer,
    FullScreenContainer,
    HomeScreenContainer,
    ImageContainer,
    Wave,
    HeroSectionContainer,
    HeroButton
} from "@styles/Home";
import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@components/Footer";
import { useLocation } from "react-router-dom";
import { Typography, Grid } from "@mui/material";

const Home = () => {
    const isCollapsed = useSelector((state: RootState) => state.sideBar.isCollapsed);
    const { isAuthenticated } = useAuth();

    const [showSignUp, setShowSignUp] = useState(false);
    const location = useLocation();
    const selectedHistory = location.state?.selectedHistory;

    const toggleSignUp = () => setShowSignUp(!showSignUp);

    if (!isAuthenticated) {
        return (
            <HomeScreenContainer>
                <FullScreenContainer>
                    <ImageContainer>
                        <img src="/src/assets/CodeRefineX.png" alt="Decorative" />
                    </ImageContainer>
                    <AnimatePresence mode="wait">
                        {!showSignUp ? (
                            <motion.div
                                key="signIn"
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100, transition: { duration: 0.4 } }}
                                transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
                            >
                                <SignIn onSignUpClick={toggleSignUp} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signUp"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100, transition: { duration: 0.4 } }}
                                transition={{ type: "spring", stiffness: 100, damping: 20, duration: 0.5 }}
                            >
                                <SignUp onSignInClick={toggleSignUp} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </FullScreenContainer>
                <Wave />
                <Footer />
            </HomeScreenContainer>
        );
    }

    return (
        <ContentContainer isCollapsed={isCollapsed}>
            <CodeEditor selectedHistory={selectedHistory} />
        </ContentContainer>
    );
};

export default Home;
