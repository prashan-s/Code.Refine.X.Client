import SignIn from "@components/SignIn";
import SignUp from "@components/SignUp"; // Import SignUp component
import { FullScreenContainer, HomeScreenContainer, ImageContainer, Wave } from "@styles/Home";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "@components/Footer";

interface PageProps {
    setIsSidebarHidden: (hidden: boolean) => void;
}

const Home = ({ setIsSidebarHidden }: PageProps) => {

    const [showSignUp, setShowSignUp] = useState(false);

    const toggleSignUp = () => setShowSignUp(!showSignUp);

    // Hide sidebar when on the home page
    useEffect(() => {
        setIsSidebarHidden(true);

        // Cleanup: hide sidebar when leaving the home page
        return () => setIsSidebarHidden(false);
    }, [setIsSidebarHidden]);

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
};

export default Home;
