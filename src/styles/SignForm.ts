import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #f0f2f5;
`;

const HeadingSection = styled.header`
  padding: 0.5rem 0 1rem 0;
`;

const SignSection = styled.div`
  max-width: 400px;
  min-width: 400px;
  width: 100%;
`;

const CompanyLogo = styled.div`
  display: flex;
  justify-content: center;
  corner-radius: 80px;
`;

const CompanyLogoImage = styled.img`
  max-width: 160px;
  max-height: 160px;
  background-color: #ffffff;

  box-shadow: 0px 10px 30px -8px rgba(0, 0, 0, 0.25);

  border-radius: 50%;
  padding: 1rem;
`;

const SignForm = styled.form`
  padding: 1em 0em;
`;

const FieldGroup = styled.div`
  padding: 0.5rem;
  align-items: center;
  flex-direction: row;
  margin-left: 0rem;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1em;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PasswordHandleSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SignButton = styled.button`
  width: 100%;
  padding: 0.8em 0;
  margin: 1em 0;
  border-radius: 5px;
  border: 0;
  background: linear-gradient(
    180deg,
    rgba(225, 189, 5, 1) 0%,
    rgba(225, 189, 5, 1) 100%
  );
  font-size: 1rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    cursor: pointer;
  }
`;

const AccountOption = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.3em 0;
`;

const HaveAccountButton = styled.span`
  font-weight: 600;
  color: #05961d;
  padding-left: 0.5em;
  &:hover {
    cursor: pointer;
  }
`;

export {
  Container,
  HeadingSection,
  SignSection,
  CompanyLogo,
  CompanyLogoImage,
  FieldGroup,
  FlexRow,
  SignForm,
  PasswordHandleSection,
  SignButton,
  AccountOption,
  HaveAccountButton,
};
