import React, { ChangeEvent, FC, memo } from 'react';
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Paper,
    Grid,
    Typography,
    makeStyles,
    Modal,
    IconButton,
    Box
} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send'
import CameraIcon from "@material-ui/icons/Camera"
import EmailIcon from '@material-ui/icons/Email'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import styles from './Auth.module.css'
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { findAllByRole } from "@testing-library/react";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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

const Auth: FC = () => {
    const classes = useStyles();
    const {
        signInGoogle,
        email,
        password,
        signUpEmail,
        signInEmail,
        isLogin,
        handleChangeEmail,
        handleChangePassword,
        handleChangeIsLogin,
        username,
        handleChangeUserName,
        avatarImage,
        handleChangeImage
    } = useFirebaseAuth()

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {isLogin ? "Login" : "Register"}
                    </Typography>
                    <form className={classes.form} noValidate>
                        {!isLogin && (
                            <>
                                <TextField
                                    variant={"outlined"}
                                    margin={"normal"}
                                    required
                                    fullWidth
                                    id={'username'}
                                    label={'username'}
                                    name={'username'}
                                    autoComplete={'username'}
                                    autoFocus
                                    value={username}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeUserName(e)}
                                />
                                <Box textAlign={"center"}>
                                    <IconButton>
                                        <label>
                                            <AccountCircleIcon
                                                fontSize={"large"}
                                                className={
                                                    avatarImage
                                                        ? styles.login_addIconLoaded
                                                        : styles.login_addIcon
                                                }
                                            />
                                            <input
                                                className={styles.login_hiddenIcon}
                                                type={"file"}
                                                onChange={handleChangeImage}
                                            />
                                        </label>
                                    </IconButton>
                                </Box>
                            </>
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)}
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
                            value={password}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePassword(e)}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            startIcon={<EmailIcon/>}
                            onClick={
                                isLogin ? async () => {
                                    try {
                                        await signInEmail()
                                    } catch (err: any) {
                                        alert(err.message)
                                    }
                                } : async () => {
                                    try {
                                        await signUpEmail()
                                    } catch (err: any) {
                                        alert(err.message)
                                    }
                                }
                            }
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <span className={styles.login_reset}>Forgot password?</span>
                            </Grid>
                            <Grid item>
                                <span className={styles.login_toggleMode}
                                      onClick={() => handleChangeIsLogin()}
                                >
                                {isLogin ? "Create new account?" : "Back to login"}
                                </span>
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signInGoogle}
                        >
                            Sign In with Google
                        </Button>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export const AuthComponent = memo(Auth)