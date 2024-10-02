import TextField from "@mui/material/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "src/utils/axiosInstance";
import {
    SignSection,
    HeadingSection,
    SignButton,
    AccountOption,
    HaveAccountButton,
    SignHeading,
} from "@styles/SignForm";

interface SignUpProps {
    onSignInClick: () => void;
}

// Define form input types
interface IFormInputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// Validation schema using Yup
const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
}).required();

const SignUp: React.FC<SignUpProps> = ({ onSignInClick }) => {

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

        // Prepare the payload for the API
        const payload = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            role: "User"
        };

        try {
            const response = await axiosInstance.post("/users", payload);
            console.log("Registration successful", response.data);
            // Handle successful registration, such as redirecting to login
        } catch (err) {
            console.error("Registration failed:", err);
        }
    };

    return (
        <SignSection>
            <form onSubmit={handleSubmit(onSubmit)}>
                <HeadingSection>
                    <SignHeading style={{ textAlign: "center" }}>CodeRefineX</SignHeading>
                    <h5 style={{ textAlign: "center", color: "rgb(115, 115, 115)", margin: 0 }}>Join Us to Enhance Your Code Efficiency and Collaboration. Sign up to Explore Real-Time Optimization and Automated Insights.</h5>
                </HeadingSection>

                <TextField
                    label="First Name"
                    defaultValue=""
                    size="small"
                    fullWidth
                    {...register("firstName")}
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    margin="dense"
                    autoComplete="off"
                />

                <TextField
                    label="Last Name"
                    defaultValue=""
                    size="small"
                    fullWidth
                    {...register("lastName")}
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    margin="dense"
                    autoComplete="off"
                />

                <TextField
                    label="Email"
                    defaultValue=""
                    size="small"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    margin="dense"
                    autoComplete="off"
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
                    autoComplete="off"
                />
                <SignButton type="submit">Sign Up</SignButton>
                <AccountOption>
                    Have an account?{" "}
                    <HaveAccountButton onClick={onSignInClick}>Sign in</HaveAccountButton>
                </AccountOption>
            </form>
        </SignSection>
    );
};

export default SignUp;