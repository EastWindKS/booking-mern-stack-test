import React, {useEffect, useState} from "react";
import Head from "next/head";
import {Header} from "../components/Header";
import {FormControl, FormControlLabel, FormLabel, Grid, List, ListItem, Radio, RadioGroup} from "@material-ui/core";
import ApartmentItem, {IApartmentItem} from "../components/ApartmentItem";
import {getAllApartments} from "../src/services/services";

export default function Apartments(): React.ReactElement {
    const [apartmentList, setApartmentList] = useState<IApartmentItem[]>([]);
    const [priceFilter, setPriceFilter] = React.useState<string>();
    const [roomFilter, setRoomFilter] = React.useState<string>()
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        if (event.target.name == "price") {
            setPriceFilter((event.target as HTMLInputElement).value);
            if (event.target.value == "max") {
                sortMax(apartmentList, event.target.name);
            } else {
                sortMin(apartmentList, event.target.name);
            }
        } else {
            setRoomFilter((event.target as HTMLInputElement).value);
            if (event.target.value == "max") {
                sortMax(apartmentList, event.target.name);
            } else {
                sortMin(apartmentList, event.target.name);
            }

        }

    };
    const sortMin = (voucherList: IApartmentItem[], typeSort: string): void => {
        const sorted = voucherList.sort((a: IApartmentItem, b: IApartmentItem) => parseInt(a[typeSort]) > parseInt(b[typeSort]) ? 1 : -1);
        setApartmentList(sorted);
    };
    const sortMax = (voucherList: IApartmentItem[], typeSort: string): void => {
        const sorted = voucherList.sort((a: IApartmentItem, b: IApartmentItem) => parseInt(a[typeSort]) < parseInt(b[typeSort]) ? 1 : -1);
        setApartmentList(sorted);
    };
    useEffect(() => {
        getAllApartments().then(r => setApartmentList(r));
    }, []);
    return (
        <>
            <Header/>
            <Head>
                <title>
                    Apartments
                </title>
            </Head>
            <Grid container spacing={10} style={{marginTop: 25}}>
                <Grid item xs={12} sm={4} md={4} lg={3} style={{marginLeft: 25}}>
                    <List>
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Price:</FormLabel>
                                <RadioGroup aria-label="price" name="price" value={priceFilter}
                                            onChange={handleFilterChange}>
                                    <FormControlLabel value="min" name={"price"} control={<Radio/>} label="Min"/>
                                    <FormControlLabel value="max" name={"price"} control={<Radio/>} label="Max"/>
                                </RadioGroup>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Room number:</FormLabel>
                                <RadioGroup aria-label="roomNumber" name="roomNumber" value={roomFilter}
                                            onChange={handleFilterChange}>
                                    <FormControlLabel name={"roomsNumber"} value="min" control={<Radio/>} label="Min"/>
                                    <FormControlLabel name={"roomsNumber"} value="max" control={<Radio/>} label="Max"/>
                                </RadioGroup>
                            </FormControl>
                        </ListItem>
                    </List>
                </Grid>
                <Grid container item xs={12} sm={8} md={8} lg={9} spacing={10}>
                    {apartmentList?.map((apartment: IApartmentItem) => {
                        const {name, description, price, roomsNumber, _id, imageUrl} = apartment;
                        return (
                            <ApartmentItem _id={_id} name={name} imageUrl={imageUrl} price={price}
                                           description={description} roomsNumber={roomsNumber}/>
                        )
                    })}
                </Grid>
            </Grid>
        </>
    )
}

