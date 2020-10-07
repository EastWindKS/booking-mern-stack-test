import React, {ReactElement, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import {createOrder, deleteVoucher} from "../src/services/services";
import {connect} from "react-redux";
import {Dialog, DialogTitle, List, ListItem, TextField} from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export interface IVoucherItem {
    _id: any,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    variant: string,
    quantity: string
}

export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
    type: string,
    name: string
}

const BuyModal = (props: SimpleDialogProps): ReactElement => {
    let {onClose, open, name, type} = props;
    const [userFName, setUserFName] = useState();
    const [userLName, setUserLName] = useState();
    const [userMail, setUserMail] = useState();
    const [dateTo, setDateTo] = useState<string>();
    const [dateFrom, setDateFrom] = useState<string>();
    const [qty, setQty] = useState();
    const onChange = (event) => {
        let data = event.target.value;
        switch (event.target.name) {
            case "fname":
                setUserFName(data)
                break;
            case "lname":
                setUserLName(data)
                break;
            case "email":
                setUserMail(data)
                break;
            case "qty":
                setQty(data)
                break;
            case "dateTo":
                console.log(data)
                setDateTo(data.toString())
                break;
            case "dateFrom":
                console.log(data)
                setDateFrom(data.toString())
                break;
        }
    }
    const onSend = () => {
        createOrder(name, type, userFName, userLName, qty, userMail, dateFrom, dateTo).then(() => onClose("false"));
    }

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Book</DialogTitle>
            <List>
                <ListItem autoFocus button>
                    <TextField label={"First name"} name={"fname"} onChange={onChange}/>
                </ListItem>
                <ListItem button>
                    <TextField label={"Last Name"} name={"lname"} onChange={onChange}/>
                </ListItem>
                <ListItem button>
                    <TextField label={"E-mail"} name={"email"} onChange={onChange}/>
                </ListItem>
                <ListItem button>
                    <TextField label={"Quantity"} name={"qty"} onChange={onChange}/>
                </ListItem>
                <ListItem>
                    <TextField
                        onChange={onChange}
                        name={"dateFrom"}
                        label="From"
                        type="datetime-local"
                        defaultValue="2020-01-24"

                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        onChange={onChange}
                        name={"dateTo"}
                        label="To"
                        type="datetime-local"
                        defaultValue="2020-01-24"

                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </ListItem>
                <ListItem button>
                    <Button variant={"contained"} color={"secondary"}
                            onClick={onSend}>Book!</Button>
                </ListItem>
            </List>
        </Dialog>
    )
}

const SellerElements = (props): React.ReactElement => {
    const {_id} = props;
    return (
        <>
            <IconButton>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={() => deleteVoucher(_id)}>
                <DeleteForeverIcon/>
            </IconButton>
        </>
    )
};

function VoucherItem({access, ...props}) {
    const classes = useStyles();
    const {_id, name, imageUrl, price, description, variant, quantity} = props;
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <Grid item xs={11} xl={6} sm={12} md={6}>
                <Card className={classes.root} id={_id}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={imageUrl}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Price : {price}
                        </Button>
                        <Button size="small" color="primary" onClick={() => setOpen(true)}>
                            Book now
                        </Button>
                        {access == true && <SellerElements _id={_id}/>}
                    </CardActions>
                </Card>
            </Grid>
            <BuyModal open={open} onClose={() => setOpen(false)} type={"apartment"} name={name}/>
        </>
    );
}

const mapStateToProps = state => ({
    access: state.access.access
});

export default connect(mapStateToProps, null)(VoucherItem);