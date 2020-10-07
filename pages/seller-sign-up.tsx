import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from "next/link";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Head from "next/head";
import {Header} from "../components/Header";
import {createSeller} from "../src/services/services";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();
    const [errors, setErrors] = useState<any | null>({});
    const [login, setLogin] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const [repeatPassword, setRepeatPassword] = useState<string>(null);
    const validate = (): boolean => {
        let temp: any = {};
        temp.login = login ? "" : "Login is required";
        temp.password = password ? "" : "Password is required";
        if (repeatPassword == null) {
            temp.repeatPassword = "Repeat password is required";
        } else if (password !== repeatPassword) {
            temp.repeatPassword = "Passwords do not match";
        } else {
            temp.repeatPassword = "";
        }

        setErrors({...temp});
        return Object.values(temp).every(x => x === "");
    };
    const onChange = (event): void => {
        const id = event.target.id;
        const data = event.target.value;
        if (id == "login") {
            setLogin(data)
        } else if (id == "password") {
            setPassword(data);
        } else {
            setRepeatPassword(data);
        }
    };
    const onSubmit =  (event)  => {
        event.preventDefault();
        if (validate()) {
             createSeller(login, password).then(r=>console.log(r));
        }
    };
    return (
        <>
            <Header/>
            <Head>
                <title>Sign Up</title>
            </Head>
            <Container
                component="main"
                maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography
                        component="h1"
                        variant="h5">
                        Sign up
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={onSubmit}>
                        <Grid
                            container
                            spacing={2}>
                            <Grid
                                item xs={12}>
                                <TextField
                                    autoFocus
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="login"
                                    label="Login"
                                    name="login"
                                    onChange={onChange}
                                    {...(errors.login && {error: true, helperText: errors.login})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onChange={onChange}
                                    {...(errors.password && {error: true, helperText: errors.password})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="repeat-password"
                                    label="Repeat password"
                                    type="password"
                                    id="repeat-password"
                                    onChange={onChange}
                                    {...(errors.repeatPassword && {error: true, helperText: errors.repeatPassword})}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onSubmit={onSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid
                            container
                            justify="flex-end">
                            <Grid item>
                                <Link
                                    href={"/seller-sign-in"}>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
};