import {Typography, TextField, Button} from "@material-ui/core";
import {makeStyles, Theme} from '@material-ui/core/styles';
import React, {useState} from "react";
import Head from "next/head";
import {Header} from "../components/Header";
import {createVoucher} from "../src/services/services";

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
        width: '40ch'
    }
}));
export default function AddApartment() {
    const classes = useStyles();
    const [errors, setErrors] = useState<any | null>({});
    const [name, setName] = useState<string>(null);
    const [imgUrl, setImgUrl] = useState<string>(null);
    const [voucherVariant, setVoucherVariant] = useState<string>(null);
    const [price, setPrice] = useState<string>(null);
    const [description, setDescription] = useState<string>(null);
    const [quantity, setQuantity] = useState<string>(null);
    const validate = (): boolean => {
        let temp: any = {};
        temp.name = name ? "" : "This field is required";
        temp.imgUrl = imgUrl ? "" : "This field is required";
        temp.voucherVariant = voucherVariant ? "" : "This field is required";
        temp.price = price ? "" : "This field is required";
        temp.description = description ? "" : "This field is required";
        temp.quantity = quantity ? "" : "This field is required";
        setErrors({...temp});
        return Object.values(temp).every(x => x === "")
    };
    const onSubmit = (event): void => {
        event.preventDefault();
        if (validate()) {
            createVoucher(name, description, imgUrl, price, voucherVariant, quantity).then(r => console.log(r));
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
            case "voucherVariant":
                setVoucherVariant(value)
                break;
            case "price":
                setPrice(value)
                break;
            case "description":
                setDescription(value)
                break;
            case "quantity":
                setQuantity(value)
        }
    };
    return (
        <>
            <Header/>
            <Head>
                <title>Add new voucher</title>
            </Head>
            <Typography
                variant={"h3"}
                className={classes.title}>
                Add new voucher
            </Typography>
            <form
                className={classes.form}
                onSubmit={onSubmit}>
                <TextField
                    id="name" label="Name"
                    variant="outlined"
                    className={classes.formField}
                    onChange={onChange}
                    {...(errors.name && {error: true, helperText: errors.name})}
                />
                <TextField
                    id="imgUrl"
                    label="Img url"
                    variant="outlined"
                    className={classes.formField}
                    onChange={onChange}
                    {...(errors.imgUrl && {error: true, helperText: errors.imgUrl})}
                />
                <TextField
                    id="price"
                    label="Price"
                    variant="outlined"
                    className={classes.formField}
                    onChange={onChange}
                    {...(errors.price && {error: true, helperText: errors.price})}
                />
                <TextField
                    id="voucherVariant"
                    label="Variant"
                    variant="outlined"
                    className={classes.formField}
                    onChange={onChange}
                    placeholder={"Club, restaurant, cinema, museum "}
                    {...(errors.voucherVariant && {error: true, helperText: errors.voucherVariant})}
                />
                <TextField
                    id="description"
                    label="Description"
                    multiline
                    variant="filled"
                    onChange={onChange}
                    className={classes.formField}
                    {...(errors.description && {error: true, helperText: errors.description})}
                />
                <TextField
                    id="quantity"
                    label="Quantity"
                    multiline
                    variant="filled"
                    onChange={onChange}
                    className={classes.formField}
                    {...(errors.quantity && {error: true, helperText: errors.quantity})}
                />
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