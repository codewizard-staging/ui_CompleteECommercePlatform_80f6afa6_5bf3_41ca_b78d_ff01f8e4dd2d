import React from 'react';
import { Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import { AddLink, ShoppingBasket, Toc, EditNote, Checklist, Tab, GridView } from '@mui/icons-material';
import { DRAWER_WIDTH } from "config";
import { useNavigate } from 'react-router-dom';

const openedMixin = (theme) => ({
    width: DRAWER_WIDTH,
    border: 0,
    borderRight: `solid rgba(0,0,0,.15) 1px`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    border: 0,
    borderRight: `solid rgba(0,0,0,.15) 1px`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const CustomDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

const Component = (props) => {
    const { open } = props;
    const [expand, setExpand] = React.useState(false);
    const NavigateTo = useNavigate();

    const handleClick = () => {
        setExpand(!expand);
    };

    const theme = useTheme();

    return (
        <CustomDrawer variant="permanent" open={open} anchor="left">
            <Toolbar />
            <List>
                <ListItem disablePadding sx={{ display: 'block' }}>
                    <List component="div" disablePadding>
                        <ListItemButton onClick={() => NavigateTo("/category_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Category Table">
                                    <AddLink color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Category Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/order_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Order Table">
                                    <AddLink color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Order Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/wishlist_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Wishlist Table">
                                    <AddLink color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Wishlist Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/payment_tiles")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Payment Tiles">
                                    <AddLink color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Payment Tiles" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/analytics_tiles")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Analytics Tiles">
                                    <AddLink color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Analytics Tiles" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/customersupport_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="CustomerSupport Table">
                                    <EditNote color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="CustomerSupport Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/discount_tiles")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Discount Tiles">
                                    <EditNote color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Discount Tiles" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/review_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Review Table">
                                    <GridView color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Review Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/product_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Product Table">
                                    <ShoppingBasket color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Product Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/user_tiles")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="User Tiles">
                                    <ShoppingBasket color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="User Tiles" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/shipment_tiles")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Shipment Tiles">
                                    <ShoppingBasket color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Shipment Tiles" sx={{ pl: 1 }} />}
                        </ListItemButton>
                        <ListItemButton onClick={() => NavigateTo("/cart_table")} sx={{ height: 50 }}>
                            <ListItemIcon sx={{ minWidth: 30 }}>
                                <Tooltip title="Cart Table">
                                    <Toc color="primary" />
                                </Tooltip>
                            </ListItemIcon>
                            {open && <ListItemText primary="Cart Table" sx={{ pl: 1 }} />}
                        </ListItemButton>
                    </List>
                </ListItem>
            </List>
        </CustomDrawer>
    );
}

export default Component;
