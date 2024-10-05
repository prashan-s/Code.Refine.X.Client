import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const FlexColumnContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const SidebarContainer = styled(FlexColumnContainer)`
  width: 320px;
  gap: 8px;
  padding: 24px;
  background-color: ${(props) => props.theme?.colors?.background || '#fff'};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

interface SidebarItemProps {
    active?: boolean;
}

const SidebarItem = styled(Box) <SidebarItemProps>`
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${(props) => (props.active ? '#f0f2f4' : 'transparent')};
  cursor: pointer;
`;

interface SidebarProps {
    activeItem: string;
    setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };

    return (
        <SidebarContainer>
            <Typography variant="h6">Settings</Typography>
            <SidebarItem active={activeItem === 'Overview'} onClick={() => handleItemClick('Overview')}>
                <Typography variant="body1">Overview</Typography>
            </SidebarItem>
            <SidebarItem active={activeItem === 'Members'} onClick={() => handleItemClick('Members')}>
                <Typography variant="body1">Members</Typography>
            </SidebarItem>
            <SidebarItem active={activeItem === 'Labels'} onClick={() => handleItemClick('Labels')}>
                <Typography variant="body1">Labels</Typography>
            </SidebarItem>
            <SidebarItem active={activeItem === 'Templates'} onClick={() => handleItemClick('Templates')}>
                <Typography variant="body1">Templates</Typography>
            </SidebarItem>
            <SidebarItem active={activeItem === 'Roadmaps'} onClick={() => handleItemClick('Roadmaps')}>
                <Typography variant="body1">Roadmaps</Typography>
            </SidebarItem>
        </SidebarContainer>
    );
};

export default Sidebar;