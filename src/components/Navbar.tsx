import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'; // Material UI components
import { AccountCircle, Logout } from '@mui/icons-material'; // Material UI icon for profile
import { Logo, NavbarContainer, NavItems, NavLink } from '@styles/Navbar';

const Navbar = () => {
    // State for handling dropdown menu
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    // Handle opening and closing of dropdown
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <NavbarContainer>
            <Logo onClick={() => navigate('/')}>CodeRefineX</Logo>
            <NavItems>
                <NavLink to="/">Home</NavLink>
                {/* <NavLink to="/about">About</NavLink>
                <IconButton onClick={handleClick}>
                    <AccountCircle fontSize="large" style={{ color: "black" }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <AccountCircle style={{ color: "black" }} />
                        </ListItemIcon>
                        <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout style={{ color: "black" }} />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu> */}
            </NavItems>
        </NavbarContainer>
    );
};

export default Navbar;