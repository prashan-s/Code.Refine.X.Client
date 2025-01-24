import React from 'react';
import { SpinnerOverlay } from '@styles/SpinnerOverlay';
import { CircleSpinner } from "react-spinners-kit";

const Spinner: React.FC = () => {
    return (
        <SpinnerOverlay>
            <CircleSpinner
                size={35}      // Adjust the size as per your requirement
                color="#4801FF" // Adjust the color as per your requirement
                loading={true}  // Spinner visibility control
            />
        </SpinnerOverlay>
    );
};

export default Spinner
