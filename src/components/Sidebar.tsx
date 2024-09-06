import { RootState } from '@redux/reducers';
import { collapsed, extended } from '@redux/reducers/sideBarReducer';
import { CollapsedSidebar, Heading, HideButton, HorizontalLine, IconWrapper, LeftPanel, MainContainer, NavItem, RightPanel, SidebarContainer } from '@styles/Sidebar';
import { useState } from 'react';
import { PiLightbulbFilament, PiRecycleFill, PiShareNetwork } from "react-icons/pi";
import { TbMenuOrder, TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
    const dispatch = useDispatch();
    const isCollapsed = useSelector((state: RootState) => state.sideBar.isCollapsed);

    const [selectedItem, setSelectedItem] = useState<number>(0);

    const toggleSidebar = () => {
        if (isCollapsed) {
            dispatch(extended());
        } else {
            dispatch(collapsed());
        }
    };

    const handleItemClick = (index: number) => {
        setSelectedItem(index);
    };

    return (
        <MainContainer>
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
