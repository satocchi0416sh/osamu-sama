import React, { useState, useEffect } from 'react';

import { AccountCircle, AddCircleOutline, Chat, ExpandLess, ExpandMore, Home, LoginOutlined, LogoutOutlined, MenuSharp, Settings, Help} from "@mui/icons-material"
import { AppBar, Badge, Button, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Modal, Stack, ThemeProvider, Toolbar, Tooltip, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { memo } from "react"
import { useHistory } from "react-router-dom"
import "./header.css"
import { themeOption } from "./ThemeOptions"

const Header = memo((props) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const { isLoggedIn, id, logout, openModal } = props
    console.log(isLoggedIn)
    const history = useHistory()

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const handleClick = () => {
        setProfileOpen(!profileOpen);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const pcProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const pcProfileClose = () => {
        setAnchorEl(null);
    };

    const [logoutModal, setLogoutModal] = useState(false);
    useEffect(() => {
        console.log(`ログアウトモーダル：${logoutModal}`)
    }, [logoutModal]);

    const list = () => (
        <Box
            sx={{ width: 250 }}
        >
            <List>
                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push("/")
                        openModal()
                    }}
                >
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="トップ" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push(`/selectChat/${id}`)
                        openModal()
                    }}
                >
                    <ListItemIcon>
                        <Chat />
                    </ListItemIcon>
                    <ListItemText primary="チャット" />
                </ListItemButton>

                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push("/inquiry")
                        openModal()
                    }}
                >
                    <ListItemIcon>
                        <Help />
                    </ListItemIcon>
                    <ListItemText primary="お問い合わせ" />
                </ListItemButton>

                <ListItemButton
                    onClick=
                    {() => {
                        handleClick()
                    }}
                >
                    <ListItemIcon>
                        <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="プロフィール" />
                    {profileOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={profileOpen} timeout="auto" unmountOnExit>
                    <Divider />
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}
                            onClick={() => {
                                setDrawerOpen(false)
                                history.push(`/profile/${id}`)
                            }}
                        >
                            <ListItemIcon>
                                <Settings />
                            </ListItemIcon>
                            <ListItemText primary="プロフィール設定" />
                        </ListItemButton>
                        <ListItemButton sx={{ pl: 4 }}
                            onClick={() => {
                                setDrawerOpen(false)
                                setLogoutModal(true)
                            }}
                        >
                            <ListItemIcon>
                                <LogoutOutlined />
                            </ListItemIcon>
                            <ListItemText primary="ログアウト" />
                        </ListItemButton>
                    </List>
                </Collapse>
            </List>
        </Box >
    );
    const listLoggedOut = () => (
        <Box
            sx={{ width: 250 }}
            onKeyDown={() => { setDrawerOpen(false) }}
        >
            <List>
                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push("/")
                        openModal();
                    }}
                >
                    <ListItemIcon>
                        <Home />
                    </ListItemIcon>
                    <ListItemText primary="トップ" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push(`/login`)
                    }}
                >
                    <ListItemIcon>
                        <LoginOutlined />
                    </ListItemIcon>
                    <ListItemText primary="ログイン" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push(`/signup`)
                    }}
                >
                    <ListItemIcon>
                        <AddCircleOutline />
                    </ListItemIcon>
                    <ListItemText primary="新規登録" />
                </ListItemButton>
                <ListItemButton
                    onClick={() => {
                        setDrawerOpen(false)
                        history.push("/inquiry")
                        openModal()
                    }}
                >
                    <ListItemIcon>
                        <Help />
                    </ListItemIcon>
                    <ListItemText primary="お問い合わせ" />
                </ListItemButton>
            </List>
        </Box >
    );

    const theme = themeOption
    return (
        <ThemeProvider theme={theme}>
            <Modal
                open={logoutModal}
                onClose={() => { setLogoutModal(false) }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ログアウトします。よろしいですか？
                    </Typography>
                    <Stack spacing={2} direction="row" sx={{ mt: 2, justifyContent: "center" }}>
                        <Button variant="contained" onClick={() => { setLogoutModal(false) }}>キャンセル</Button>
                        <Button variant="outlined" onClick={() => { setLogoutModal(false); logout(); history.push("/"); openModal(); }}>はい</Button>
                    </Stack>
                </Box>
            </Modal>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    {isLoggedIn ?
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Tooltip title="トップ" arrow>
                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                                        onClick={() => { history.push("/"); openModal(); }}>
                                        <Home />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="チャット" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => { history.push(`/selectChat/${id}`); }}
                                    >
                                        <Badge badgeContent={0} color="error">
                                            <Chat />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="お問い合わせ" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => { history.push(`/inquiry`); }}
                                    >
                                        <Badge badgeContent={0} color="error">
                                            <Help />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="プロフィール" arrow>
                                    <IconButton
                                        size="large"
                                        color="inherit"
                                        id="basic-button"
                                        aria-controls="basic-menu"
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={pcProfileClick}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={pcProfileClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={() => {
                                        pcProfileClose()
                                        history.push(`/profile/${id}`)
                                    }}>
                                        プロフィール設定</MenuItem>
                                    <MenuItem onClick={() => {
                                        pcProfileClose()
                                        setLogoutModal(true)
                                    }}>ログアウト</MenuItem>

                                </Menu>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls="primary-search-account-menu-mobile"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => { setDrawerOpen(true) }}
                                >
                                    <MenuSharp />
                                </IconButton>
                            </Box>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={() => { setDrawerOpen(false) }}
                            >
                                {list()}
                            </Drawer>
                        </Toolbar>
                        :
                        <Toolbar>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Tooltip title="トップ" arrow>
                                    <IconButton size="large" aria-label="show 4 new mails" color="inherit"
                                        onClick={() => { history.push("/"); openModal(); }}>
                                        <Home />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="ログイン" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => { history.push("/login") }}
                                    >
                                        <LoginOutlined />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="新規登録" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => { history.push("/signup") }}
                                    >
                                        <AddCircleOutline />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="お問い合わせ" arrow>
                                    <IconButton
                                        size="large"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                        onClick={() => { history.push(`/inquiry`); }}
                                    >
                                        <Badge badgeContent={0} color="error">
                                            <Help />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="show more"
                                    aria-controls="primary-search-account-menu-mobile"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => { setDrawerOpen(true) }}
                                >
                                    <MenuSharp />
                                </IconButton>
                            </Box>
                            <Drawer
                                anchor="right"
                                open={drawerOpen}
                                onClose={() => { setDrawerOpen(false) }}
                            >
                                {listLoggedOut()}
                            </Drawer>
                        </Toolbar>
                    }
                </AppBar>
            </Box>
        </ThemeProvider >
    )
})
export default Header