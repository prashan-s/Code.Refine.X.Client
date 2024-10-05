import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Checkbox from "@mui/material/Checkbox";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    SignSection,
    HeadingSection,
    PasswordHandleSection,
    SignButton,
    AccountOption,
    HaveAccountButton,
    SignHeading,
} from "@styles/SignForm";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "src/utils/axiosInstance";
import { useAuth } from "@contexts/AuthContext";  // Import useAuth from your context
import { useNavigate } from "react-router-dom";
import useSessionStorage from "@hooks/useSessionStorage";

interface SignInProps {
    onSignUpClick: () => void;
}

// Define form input types
interface IFormInputs {
    email: string;
    password: string;
}

// Validation schema using Yup
const schema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
}).required();

const SignIn: React.FC<SignInProps> = ({ onSignUpClick }) => {
    const { login } = useAuth();  // Use login from the useAuth hook
    const navigate = useNavigate();

    // Initialize useSessionStorage hook for userId
    const [storedUserId, setStoredUserId] = useSessionStorage("userId", null);

    // Initialize useForm with yupResolver for validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInputs>({
        resolver: yupResolver(schema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
        try {
            const response = await axiosInstance.post("/users/authenticate", data);
            const token = response.data.token;
            const userId = response.data.userId;

            // Call the login method from useAuth to save the token
            login(token);

            // Store the userId in session storage
            setStoredUserId(userId);

            // After successful sign-in, navigate to the projects page
            navigate('/projects');
        } catch (err: any) {
            console.error("Login failed:", err);
        }
    };

    return (
        <SignSection>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HeadingSection>
                    <SignHeading style={{ textAlign: "center" }}>CodeRefineX</SignHeading>
                    {/* <p>Welcome! Please enter your credentials.</p> */}
                </HeadingSection>
                <TextField
                    label="Email"
                    defaultValue=""
                    size="small"
                    placeholder="someone@example.com"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="dense"
                />
                <TextField
                    label="Password"
                    defaultValue=""
                    size="small"
                    placeholder="***************"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    margin="dense"
                />
                <PasswordHandleSection>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </PasswordHandleSection>
                <SignButton type="submit">Sign in</SignButton>
                <AccountOption>
                    Don’t have an account?{" "}
                    <HaveAccountButton onClick={onSignUpClick}>Sign Up</HaveAccountButton>
                </AccountOption>
            </form>
        </SignSection >
    );
};

export default SignIn;