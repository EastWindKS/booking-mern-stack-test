import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export interface IOrderItem {
    _id: any,
    name: string,
    type: string,
    userFirstName: string,
    userLastName: string,
    email: string,
    quantity: string
}

export default function OrderItem(props: IOrderItem) {
    const classes = useStyles();
    const {_id, name, type, userFirstName, userLastName, email, quantity} = props;
    return (
        <Grid item xs={11} xl={6} sm={12} md={6}>
            <Card className={classes.root} id={_id}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>Type: {type}</p>
                            <p>Name: {userFirstName}</p>
                            <p> Last Name: {userLastName}</p>
                            <p>E-mail: {email}</p>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Card>
        </Grid>
    );
}