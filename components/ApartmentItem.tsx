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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {deleteApartment} from "../src/services/services";
import {connect} from "react-redux";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export interface IApartmentItem {
    _id: any,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    roomsNumber: string,
}

const SellerElements = (props): React.ReactElement => {
    const {_id} = props;
    return (
        <>
            <IconButton>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={()=>deleteApartment(_id)}>
                <DeleteForeverIcon/>
            </IconButton>
        </>
    )
};

function ApartmentItem({access, ...props}) {
    const classes = useStyles();
        const {_id, name, imageUrl, price, description, roomsNumber} = props;
    return (
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
                    <Button size="small" color="primary">
                        Book now
                    </Button>
                    {access == true && <SellerElements _id={_id}/>}
                </CardActions>
            </Card>
        </Grid>
    );
}

const mapStateToProps = state => ({
    access: state.access.access
});

export default connect(mapStateToProps, null)(ApartmentItem);