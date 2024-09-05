import { CollapsedSidebar, Heading, HideButton, HorizontalLine, IconWrapper, LeftPanel, MainContainer, NavItem, RightPanel, SidebarContainer } from '@styles/Sidebar';
import { useState } from 'react';
import { PiLightbulbFilament, PiRecycleFill, PiShareNetwork } from "react-icons/pi";
import { TbMenuOrder, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";

const Sidebar = () => {
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed((prev) => !prev);
    };

    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };

    return (
        <MainContainer>
            {/* Main content area */}
            <div style={{ flex: 1, transition: 'margin-right 0.3s ease', marginRight: isCollapsed ? '60px' : '600px' }}> {/* Adjusted margin for stripe */}
                {/* Your main content goes here */}
                <p>Main content area</p>
            </div>

            {/* Extend icon and icons stripe for collapsed sidebar */}
            {isCollapsed && (
                <CollapsedSidebar>
                    {/* Display icons in a white background stripe */}
                    <NavItem isSelected={selectedItem === null} onClick={toggleSidebar}>
                        <IconWrapper>
                            <TbLayoutSidebarRightExpandFilled />
                        </IconWrapper>
                    </NavItem>
                    <NavItem isSelected={selectedItem === 0} onClick={() => handleItemClick(0)}>
                        <IconWrapper>
                            <PiLightbulbFilament />
                        </IconWrapper>
                    </NavItem>
                    <NavItem isSelected={selectedItem === 1} onClick={() => handleItemClick(1)}>
                        <IconWrapper>
                            <TbMenuOrder />
                        </IconWrapper>
                    </NavItem>
                    <NavItem isSelected={selectedItem === 2} onClick={() => handleItemClick(2)}>
                        <IconWrapper>
                            <PiRecycleFill />
                        </IconWrapper>
                    </NavItem>
                    <NavItem isSelected={selectedItem === 3} onClick={() => handleItemClick(3)}>
                        <IconWrapper>
                            <PiShareNetwork />
                        </IconWrapper>
                    </NavItem>
                </CollapsedSidebar>
            )}

            {/* Sidebar */}
            <SidebarContainer isCollapsed={isCollapsed}>
                <LeftPanel>
                    <HideButton onClick={toggleSidebar} isCollapsed={isCollapsed}>
                        <h2>Hide ➔</h2>
                    </HideButton>
                </LeftPanel>
                <RightPanel>
                    <Heading>CodeRefineX</Heading>
                    <HorizontalLine />
                    <NavItem isSelected={selectedItem === 0} onClick={() => handleItemClick(0)}>
                        <IconWrapper>
                            <PiLightbulbFilament />
                        </IconWrapper>
                        Improve
                    </NavItem>
                    <NavItem isSelected={selectedItem === 1} onClick={() => handleItemClick(1)}>
                        <IconWrapper>
                            <TbMenuOrder />
                        </IconWrapper>
                        Format
                    </NavItem>
                    <NavItem isSelected={selectedItem === 2} onClick={() => handleItemClick(2)}>
                        <IconWrapper>
                            <PiRecycleFill />
                        </IconWrapper>
                        Reuse
                    </NavItem>
                    <NavItem isSelected={selectedItem === 3} onClick={() => handleItemClick(3)}>
                        <IconWrapper>
                            <PiShareNetwork />
                        </IconWrapper>
                        Share
                    </NavItem>
                </RightPanel>
            </SidebarContainer>
        </MainContainer>
    );
}

export default Sidebar;
