import {Typography, TextField, Button} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import React, {useState} from "react";
import Head from "next/head";
import {Header} from "../components/Header";
import {createApartment} from "../src/services/services";

const useStyles = makeStyles((theme: Theme) => ({
    title: {
        margin: theme.spacing(5),
    },
    form: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    formField: {
        margin: theme.spacing(2),
        width: '30ch'
    }
}));
export default function AddApartment() {
    const classes = useStyles();
    const [errors, setErrors] = useState<any | null>({});
    const [name, setName] = useState<string>(null);
    const [imgUrl, setImgUrl] = useState<string>(null);
    const [numberOfRoom, setNumberOfRoom] = useState<string>(null);
    const [price, setPrice] = useState<string>(null);
    const [description, setDescription] = useState<string>(null);
    const validate = (): boolean => {
        let temp: any = {};
        temp.name = name ? "" : "This field is required";
        temp.imgUrl = imgUrl ? "" : "This field is required";
        temp.numberOfRoom = numberOfRoom ? "" : "This field is required";
        temp.price = price ? "" : "This field is required";
        temp.description = description ? "" : "This field is required";
        setErrors({...temp});
        return Object.values(temp).every(x => x === "")
    };
    const onSubmit = (event): void => {
        event.preventDefault();
        if (validate()) {
            createApartment(name, description, imgUrl, price, numberOfRoom).then(r => console.log(r))
        }
    };
        const onChange = (event): void => {
            const value = event.target.value;
            const id = event.target.id;
            switch (id) {
                case "name":
                    setName(value)
                    break;
                case "imgUrl":
                    setImgUrl(value)
                    break;
                case "numberOfRoom":
                    setNumberOfRoom(value)
                    break;
                case "price":
                    setPrice(value)
                    break;
                case "description":
                    setDescription(value)
                    break;
            }
        };
        return (
            <>
                <Header/>
                <Head>
                    <title>Add new apartment</title>
                </Head>
                <Typography
                    variant={"h3"}
                    className={classes.title}>
                    Add new apartment
                </Typography>
                <form
                    className={classes.form}
                    onSubmit={onSubmit}>
                    <TextField
                        id="name"
                        label="Name"
                        variant="outlined"
                        className={classes.formField}
                        onChange={onChange}
                        {...(errors.name && {error: true, helperText: errors.name})}/>
                    <TextField
                        id="imgUrl"
                        label="Img url"
                        variant="outlined"
                        className={classes.formField}
                        onChange={onChange}
                        {...(errors.imgUrl && {error: true, helperText: errors.imgUrl})}/>
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        className={classes.formField}
                        onChange={onChange}
                        {...(errors.price && {error: true, helperText: errors.price})}/>
                    <TextField
                        id="numberOfRoom"
                        label="Number of room"
                        variant="outlined"
                        className={classes.formField}
                        onChange={onChange}
                        {...(errors.numberOfRoom && {error: true, helperText: errors.numberOfRoom})}/>
                    <TextField
                        id="description"
                        label="Description"
                        multiline variant="filled"
                        className={classes.formField}
                        onChange={onChange}
                        {...(errors.description && {error: true, helperText: errors.description})}/>
                    <Button
                        variant={"contained"}
                        color={"secondary"}
                        className={classes.formField}
                        type={"submit"}
                        onSubmit={onSubmit}>
                        Add
                    </Button>
                </form>
            </>
        )
    };