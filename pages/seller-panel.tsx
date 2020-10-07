import React, {useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Head from "next/head";
import {Header} from "../components/Header";
import {getAllVouchers, getAllApartments, getAllOrders} from "../src/services/services";
import ApartmentItem, {IApartmentItem} from "../components/ApartmentItem";
import VoucherItem, {IVoucherItem} from "../components/VoucherItem";
import OrderItem, {IOrderItem} from "../components/OrderItem";

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    buttons: {
        marginRight: theme.spacing(2),
    },
    gridWrapper: {
        marginTop: 30
    }
}));

export default function SellerPanel() {
    const classes = useStyles();
    const [value, setValue] = useState<number>(0);
    const [apartmentsList, setApartmentsList] = useState<IApartmentItem[]>([]);
    const [vouchersList, setVouchersList] = useState<IVoucherItem[]>([]);
    const [ordersList, setOrdersList] = useState<IOrderItem[]>([]);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Header/>
            <Head>
                <title>
                    Seller Panel
                </title>
            </Head>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                        <Tab label="Apartments" {...a11yProps(0)} />
                        <Tab label="Vouchers" {...a11yProps(1)} />
                        <Tab label="Orders" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel
                    value={value}
                    index={0}>
                    <Link href={"/add-new-apartment"}>
                        <Button
                            className={classes.buttons}
                            variant={"contained"}
                            color={"primary"}>
                            Add apartment
                        </Button>
                    </Link>
                    <Button
                        onClick={() => getAllApartments().then(r => setApartmentsList(r))}
                        variant={"contained"}
                        color={"primary"}
                        className={classes.buttons}>
                        Get all apartments
                    </Button>
                    <Grid container className={classes.gridWrapper}>
                        {apartmentsList?.map((apartment: IApartmentItem): React.ReactElement => {

                            const {_id, name, imageUrl, price, description, roomsNumber} = apartment;
                            return (
                                <ApartmentItem _id={_id} name={name} imageUrl={imageUrl} price={price}
                                               description={description} roomsNumber={roomsNumber}/>
                            )
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel
                    value={value}
                    index={1}>
                    <Link href={"/add-new-voucher"}>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            className={classes.buttons}>
                            Add voucher
                        </Button>
                    </Link>
                    <Button
                        onClick={() => getAllVouchers().then(r => setVouchersList(r))}
                        variant={"contained"}
                        color={"primary"}
                        className={classes.buttons}>
                        Get all vouchers
                    </Button>
                    <Grid container className={classes.gridWrapper}>
                        {vouchersList?.map((voucher: IVoucherItem): React.ReactElement => {

                            const {_id, name, imageUrl, price, description, variant, quantity} = voucher;
                            return (
                                <VoucherItem _id={_id} name={name} imageUrl={imageUrl} price={price}
                                             description={description} variant={variant} quantity={quantity}/>
                            )
                        })}
                    </Grid>
                </TabPanel>
                <TabPanel
                    value={value}
                    index={2}>
                    <Button
                        onClick={() => getAllOrders().then(r => setOrdersList(r))}
                        variant={"contained"}
                        color={"primary"}>
                        Get orders
                    </Button>
                    <Grid container className={classes.gridWrapper}>
                        {ordersList?.map((order: IOrderItem): React.ReactElement => {
                            const {_id, name, type, userFirstName, userLastName, email, quantity} = order;
                            return (
                                <OrderItem _id={_id} name={name} type={type} userFirstName={userFirstName}
                                           userLastName={userLastName} email={email} quantity={quantity}/>
                            )
                        })}
                    </Grid>
                </TabPanel>
            </div>
        </>
    );
}
