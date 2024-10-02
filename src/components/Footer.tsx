import {
    FooterContainer,
    FooterSection,
    FooterTitle,
    FooterLink,
    SocialIconsContainer,
    SocialIcon,
    FooterInfo,
    ContactInfo,
    FooterRow,
    FooterTitleUnderline,
    HorizontalLine,
    CopyrightContainer
} from '@styles/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; // Importing icons for contact

const Footer = () => {
    return (
        <FooterContainer>
            <FooterRow>
                <FooterSection style={{ flex: 1.4 }}>
                    <FooterTitle>
                        CodeRefineX
                    </FooterTitle>
                    <FooterInfo>
                        Real-Time Automated Code Optimization Tool is designed to enhance code quality, efficiency, and collaboration. It integrates GitHub, provides Big O complexity analysis, and offers real-time feedback for code improvements.
                    </FooterInfo>
                    <SocialIconsContainer>
                        <SocialIcon href="https://www.linkedin.com" target="_blank">
                            <FaLinkedin />
                        </SocialIcon>
                        <SocialIcon href="https://www.github.com" target="_blank">
                            <FaGithub />
                        </SocialIcon>
                        <SocialIcon href="https://twitter.com" target="_blank">
                            <FaTwitter />
                        </SocialIcon>
                    </SocialIconsContainer>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>
                        Resources <FooterTitleUnderline />
                    </FooterTitle>
                    <FooterLink href="https://reactjs.org/">React</FooterLink>
                    <FooterLink href="https://www.typescriptlang.org/docs/">TypeScript Docs</FooterLink>
                    <FooterLink href="https://docs.github.com/en/rest">GitHub API</FooterLink>
                    <FooterLink href="https://learn.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0">ASP.NET Core</FooterLink>
                </FooterSection>

                <FooterSection style={{ flex: 1.5 }}>
                    <FooterTitle>
                        Contact <FooterTitleUnderline />
                    </FooterTitle>
                    <ContactInfo>
                        <FaPhone style={{ marginRight: '0.5rem', color: "#ff7210" }} /> Phone: +94716660179
                    </ContactInfo>
                    <ContactInfo>
                        <FaEnvelope style={{ marginRight: '0.5rem', color: "#ff7210" }} /> Email: abc@coderefinex.com
                    </ContactInfo>
                    <ContactInfo>
                        <FaMapMarkerAlt style={{ marginRight: '0.5rem', color: "#ff7210" }} /> Location: SLIIT Malabe Campus
                    </ContactInfo>
                </FooterSection>

                <FooterSection>
                    <FooterTitle>
                        Site Map <FooterTitleUnderline />
                    </FooterTitle>
                    <FooterLink href="/home">Home</FooterLink>
                    <FooterLink href="/features">Features</FooterLink>
                    <FooterLink href="/about">About Us</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                </FooterSection>
            </FooterRow>

            <HorizontalLine />

            <CopyrightContainer>
                <p>© 2024 CodeRefineX. All Rights Reserved.</p>
                <p>Digitally crafted by TechTribe</p>
            </CopyrightContainer>
        </FooterContainer>
    );
};

export default Footer;