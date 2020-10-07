import React, {ReactElement, useState} from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {deleteApartment, createOrder} from "../src/services/services";
import {connect} from "react-redux";
import {Dialog, DialogTitle, List, ListItem, TextField,} from "@material-ui/core";
import {createStyles} from "@material-ui/styles";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
    }));

export interface IApartmentItem {
    _id: any,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    roomsNumber: string,
}


export interface SimpleDialogProps {
    open: boolean;
    onClose: (value: string) => void;
    type: string,
    name: string,
}

const BuyModal = (props: SimpleDialogProps): ReactElement => {
    let {onClose, open, name, type} = props;
    const classes = useStyles();
    const [userFName, setUserFName] = useState<string>();
    const [userLName, setUserLName] = useState<string>();
    const [userMail, setUserMail] = useState<string>();
    const [dateTo, setDateTo] = useState<string>();
    const [dateFrom, setDateFrom] = useState<string>();
    const onChange = (event) => {
        let data = event.target.value.toString();
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
        createOrder(name, type, userFName, userLName, "0", userMail, dateTo, dateFrom).then(() => onClose("false"));
    }

    return (
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Book</DialogTitle>
            <List>
                <ListItem autoFocus button>
                    <TextField label={"First name"} name={"fname"} onChange={onChange}/>
                </ListItem>
                <ListItem autoFocus button>
                    <TextField label={"Last Name"} name={"lname"} onChange={onChange}/>
                </ListItem>
                <ListItem autoFocus button>
                    <TextField label={"E-mail"} name={"email"} onChange={onChange}/>
                </ListItem>
                <ListItem>
                    <TextField
                        onChange={onChange}
                        name={"dateFrom"}
                        label="From"
                        type="datetime-local"
                        defaultValue="2020-01-24"
                        className={classes.textField}
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
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </ListItem>
                <ListItem autoFocus button>
                    <Button variant={"contained"} color={"secondary"}
                            onClick={onSend}>Book!</Button>
                </ListItem>
            </List>
        </Dialog>
    )
}

const SellerElements = (props): ReactElement => {
    const {_id} = props;
    return (
        <>
            <IconButton>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={() => deleteApartment(_id)}>
                <DeleteForeverIcon/>
            </IconButton>
        </>
    )
};

function ApartmentItem({access, ...props}) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    const classes = useStyles();
    const {_id, name, imageUrl, price, description, roomsNumber} = props;
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

export default connect(mapStateToProps, null)(ApartmentItem);