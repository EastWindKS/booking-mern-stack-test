import {Header} from "../components/Header";
import Head from "next/head";
import React from "react";

export default function App(): React.ReactElement {
    return (
        <>
            <Head>
                <title>Booking Main Page</title>
            </Head>
            <Header/>
        </>
    )
};