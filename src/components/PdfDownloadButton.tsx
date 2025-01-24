import React from 'react';
import html2pdf from 'html2pdf.js';
import { AiOutlineDownload } from 'react-icons/ai'; // Import download icon from react-icons
import styled from 'styled-components';

// Styling for the button to appear as an icon
const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #030303; /* Adjust icon color */
    font-size: 36px; /* Adjust icon size */
    font-weight: 700;
    display: flex;
    align-items: center;
    padding: 8px;
    transition: color 0.3s;

    &:hover {
        color: #155a9a; /* Hover color */
    }
`;

interface PdfDownloadButtonProps {
    htmlContent: string;
    fileName?: string;
}

const PdfDownloadButton: React.FC<PdfDownloadButtonProps> = ({
    htmlContent,
    fileName = 'document.pdf',
}) => {
    const handleDownload = () => {
        const element = document.createElement('div');
        element.innerHTML = htmlContent;

        html2pdf().from(element).save(fileName);
    };

    return (
        <IconButton onClick={handleDownload} title="Download as PDF">
            <AiOutlineDownload /> {/* React icon for download */}
        </IconButton>
    );
};

export default PdfDownloadButton;