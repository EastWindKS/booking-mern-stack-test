import React, {useEffect, useState} from "react";
import Head from "next/head";
import {Header} from "../components/Header";
import {
    Grid,
    List,
    ListItem,
    Radio,
    RadioGroup,
    FormControl,
    FormLabel,
    FormControlLabel
} from "@material-ui/core";
import {getAllVouchers} from "../src/services/services";
import VoucherItem, {IVoucherItem} from "../components/VoucherItem";


export default function Vouchers(): React.ReactElement {
    const [vouchersList, setVouchersList] = useState<IVoucherItem[]>([]);
    const [priceFilter, setPriceFilter] = React.useState<string>();
    const [variantFilter, setVariantFilter] = React.useState<string>()
    const handlePriceFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPriceFilter((event.target as HTMLInputElement).value);
        if (event.target.value == "max") {
            sortByPriceMax(vouchersList)
        } else {
            sortByPriceMin(vouchersList);
        }

    };
    const handleVariantFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
        sortByVariant(vouchersList, event.target.value);
    }
    const sortByVariant = (vouchersList: IVoucherItem[], variant: string): void => {
        if (variant == "All") {
            getAllVouchers().then(r => setVouchersList(r));
        } else {
            getAllVouchers().then((r: IVoucherItem[]) => {
                return r.filter(voucher => voucher.variant == variant)
            }).then(r => setVouchersList(r));
        }
        ;
    }
    const sortByPriceMin = (voucherList: IVoucherItem[]): void => {
        const sorted = voucherList.sort((a: IVoucherItem, b: IVoucherItem) => parseInt(a.price) > parseInt(b.price) ? 1 : -1);
        setVouchersList(sorted);
    };
    const sortByPriceMax = (voucherList: IVoucherItem[]): void => {
        const sorted = voucherList.sort((a: IVoucherItem, b: IVoucherItem) => parseInt(a.price) < parseInt(b.price) ? 1 : -1);
        setVouchersList(sorted);
    };
    useEffect(() => {
        getAllVouchers().then(r => setVouchersList(r));
    }, []);
    return (
        <>
            <Header/>
            <Head>
                <title>
                    Voucher
                </title>
            </Head>
            <Grid container spacing={10} style={{marginTop: 25}}>
                <Grid item xs={12} sm={4} md={4} lg={3} style={{marginLeft: 25}}>
                    <List>
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Price:</FormLabel>
                                <RadioGroup aria-label="price" name="price" value={priceFilter}
                                            onChange={handlePriceFilter}>
                                    <FormControlLabel value="min" control={<Radio/>} label="Min"/>
                                    <FormControlLabel value="max" control={<Radio/>} label="Max"/>
                                </RadioGroup>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Voucher variants:</FormLabel>
                                <RadioGroup aria-label="voucherVariant" name="voucherVariant" value={variantFilter}
                                            onChange={handleVariantFilter}>
                                    <FormControlLabel value="Cafe" control={<Radio/>} label="Cafe"/>
                                    <FormControlLabel value="Cinema" control={<Radio/>} label="Cinema"/>
                                    <FormControlLabel value="Museum" control={<Radio/>} label="Museum"/>
                                    <FormControlLabel value="All" control={<Radio/>} label="All"/>
                                </RadioGroup>
                            </FormControl>
                        </ListItem>
                    </List>
                </Grid>
                <Grid container item xs={12} sm={8} md={8} lg={9} spacing={10}>
                    {vouchersList?.map((voucher: IVoucherItem) => {
                        const {name, description, price, quantity, variant, _id, imageUrl} = voucher;
                        return (
                            <VoucherItem _id={_id} name={name} imageUrl={imageUrl} price={price}
                                         description={description} variant={variant} quantity={quantity}/>
                        )
                    })}
                </Grid>
            </Grid>
        </>
    )
}