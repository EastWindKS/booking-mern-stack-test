import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from "next/link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
            textDecoration: "none"
        },
        menuButtonLink: {
            textDecoration: "none"
        },
        title: {
            marginLeft: 100,
            cursor: "pointer",
            color: "White",
            textDecoration: "none",
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

export function Header({}): React.ReactElement {
    const classes = useStyles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <Link href={"/"}>
                <MenuItem>
                    <p style={{textDecoration: "underline"}}>Booking</p>
                </MenuItem>
            </Link>
            <MenuItem>
                <Link href={"/apartments"}>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        fullWidth
                        className={classes.menuButton}>
                        Apartments</Button>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={"/vouchers"}>
                    <Button
                        variant={"outlined"}
                        color={"primary"}
                        fullWidth
                        className={classes.menuButton}>
                        Vouchers</Button>
                </Link>
            </MenuItem>
            <MenuItem>
                <Link href={"/seller-panel"}>
                    <Button
                        variant={"outlined"}
                        color={"secondary"}
                        fullWidth
                        className={classes.menuButton}>
                        For sellers</Button>
                </Link>
            </MenuItem>
        </Menu>
    );
    return (
        <div className={classes.grow}>
            <AppBar
                position="static"
                style={{backgroundColor: "black"}}>
                <Toolbar>
                    <Link href={"/"}>
                        <Typography
                            className={classes.title}
                            variant="h6" noWrap>
                            Booking
                        </Typography>
                    </Link>
                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>
                        <Link href={"/vouchers"}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                className={classes.menuButton}>
                                Vouchers
                            </Button>
                        </Link>
                        <Link href={"/apartments"}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                className={classes.menuButton}>
                                Apartments
                            </Button>
                        </Link>
                        <Link href={"/seller-sign-in"}>
                            <Button
                                variant={"contained"}
                                color={"secondary"}
                                className={classes.menuButton}>For sellers
                            </Button>
                        </Link>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon/>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}