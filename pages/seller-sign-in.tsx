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
import {useRouter} from "next/router";
import {checkSellerAccount} from "../src/services/services";
import {updateAccess} from "../src/store/actions";
import {connect} from "react-redux";

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function SignIn({access,accessFunction}) {
    const classes = useStyles();
    const router = useRouter();
    const [errors, setErrors] = useState<any | null>({});
    const [login, setLogin] = useState<string>(null);
    const [password, setPassword] = useState<string>(null);
    const validate = (): boolean => {
        let temp: any = {};
        temp.login = login ? "" : "Login is required";
        temp.password = password ? "" : "Password is required";
        setErrors({...temp});
        return Object.values(temp).every(x => x === "");
    };
    const onChange = (event): void => {
        const id = event.target.id;
        const data = event.target.value;
        if (id == "login") {
            setLogin(data)
        } else {
            setPassword(data);
        }
    };
    const onSubmit = async (event): Promise<void> => {
        event.preventDefault();
        if (validate()) {
            let res;
            await checkSellerAccount(login, password).then(result => res = result);
            if (res) {
                console.log(access)
                accessFunction();
                await router.push("/seller-panel");
            }
        }
    };
    return (
        <>
            <Head>
                <title>
                    Sing in
                </title>
            </Head>
            <Header/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography
                        component="h1"
                        variant="h5">
                        Sign in
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            onChange={onChange}
                            autoFocus
                            {...(errors.login && {error: true, helperText: errors.login})}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...(errors.password && {error: true, helperText: errors.password})}
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onSubmit={onSubmit}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link
                                    href={"/seller-sign-up"}>
                                    {"Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
};
const mapStateToProps = state => ({
    access: state.access.access
});

const mapDispatchToProps = {
    accessFunction: updateAccess,

};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
