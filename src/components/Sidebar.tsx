import { RootState } from '@redux/reducers';
import { collapsed, extended, setIsSidebarHidden } from '@redux/reducers/sideBarReducer';
import { CollapsedSidebar, Heading, HideButton, HorizontalLine, IconWrapper, LeftPanel, MainContainer, NavItem, RightPanel, SidebarContainer } from '@styles/Sidebar';
import { useState, useEffect } from 'react';
import { PiLightbulbFilament, PiRecycleFill, PiShareNetwork } from "react-icons/pi";
import { TbMenuOrder, TbLayoutSidebarRightExpandFilled, TbSettings, TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import SideHoldingContainer from "@components/common/SideHoldingContainer";
import ImprovePanel from "@components/panel/ImprovePanel";
import ReusePanel from "@components/panel/ReusePanel";
import GistPanel from '@components/panel/GistPanel';
import { useNavigate } from 'react-router-dom';
import ReorderPanel from '@components/panel/ReorderPanel';
import { BlockCategory } from '@components/panel/ReorderPanel';
import { useAuth } from '@contexts/AuthContext';
import useSessionStorage from '@hooks/useSessionStorage';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isCollapsed = useSelector((state: RootState) => state.sideBar.isCollapsed);
    const { logout } = useAuth();

    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [contentData, setContentData] = useState<{ title: string; content: React.ReactNode }>({
        title: '',
        content: <div>Select an option to view content</div>,
    });
    const [storedUserId,] = useSessionStorage("userId", null);
    const [projects, setProjects] = useState([]); // State to store the fetched projects
    const [isLoading, setIsLoading] = useState(true); // Add loading state to control rendering

    const defaultBlocks: BlockCategory = {
        static: ['defaultStaticBlock1', 'defaultStaticBlock2'],
        public: ['defaultPublicBlock1', 'defaultPublicBlock2'],
        private: ['defaultPrivateBlock1', 'defaultPrivateBlock2'],
    };

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

    const navigateItemClick = (path: string) => {
        dispatch(collapsed());
        navigate(path);
    }

    const handleLogout = () => {
        logout();
    }

    useEffect(() => {
        let title = '';
        let content: React.ReactNode;

        switch (selectedItem) {
            case 0:
                title = 'Improve Content';
                content = <ImprovePanel />;
                break;
            case 1:
                title = 'Format Content';
                content = <ReorderPanel
                    blocks={defaultBlocks} // Or pass a different BlockCategory object
                    onReorder={(newBlocks: BlockCategory) => {
                        console.log('XX Reordered blocks: ', newBlocks);
                    }}
                    setMonacoValue={(value: string) => {
                        console.log('XX Monaco Editor Value Set: ', value);
                    }}
                />;
                break;
            case 2:
                title = 'Reuse';
                content = <ReusePanel />;
                break;
            case 3:
                title = 'Share';
                content = <GistPanel />;
                break;
            default:
                title = 'Select an option';
                content = <div>Select an option to view content</div>;
                break;
        }

        // Update contentData state
        setContentData({ title, content });

    }, [selectedItem]);

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
                    <NavItem isSelected={selectedItem === 4} onClick={() => navigateItemClick('/settings')}>
                        <IconWrapper>
                            <TbSettings />
                        </IconWrapper>
                    </NavItem>
                    <NavItem isSelected={selectedItem === 5} onClick={handleLogout}>
                        <IconWrapper>
                            <TbLogout />
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
                    <SideHoldingContainer title={contentData.title} selectedComponent={contentData.content} />
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
                    <NavItem isSelected={selectedItem === 4} onClick={() => navigateItemClick('/settings')}>
                        <IconWrapper>
                            <TbSettings />
                        </IconWrapper>
                        Settings
                    </NavItem>
                    <NavItem isSelected={selectedItem === 5} onClick={handleLogout}>
                        <IconWrapper>
                            <TbLogout />
                        </IconWrapper>
                        Logout
                    </NavItem>
                </RightPanel>
            </SidebarContainer>
        </MainContainer>
    );
}

export default Sidebar;