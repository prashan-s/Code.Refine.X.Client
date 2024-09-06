import React from 'react';
import 'ldrs'; // Make sure this is installed and registered globally
import { SpinnerOverlay } from '@styles/SpinnerOverlay';
import { Oval } from 'react-loader-spinner'

const Spinner: React.FC = () => {
    return (
        <SpinnerOverlay>
            <Oval
                visible={true}
                height="50"
                width="50"
                color="#4fa94d"
                ariaLabel="oval-loading"
                strokeWidth={6}
            />
        </SpinnerOverlay>
    );
};

export default Spinner;
