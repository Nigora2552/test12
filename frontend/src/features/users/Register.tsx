import React, {useState} from 'react';
import type {RegisterMutation} from "../../types";
import {Avatar, Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectRegisterError, selectRegisterLoading} from "./usersSelectore.ts";
import {googleLogin, register} from "./usersThunks.ts";
import {GoogleLogin} from "@react-oauth/google";
import {toast} from "react-toastify";
import FileInput from "../../components/UI/FileInput/FileInput.tsx";


const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError);
    const loading = useAppSelector(selectRegisterLoading);
    const navigation = useNavigate();

    const [form, setForm] = useState<RegisterMutation>({
        username: '',
        password: '',
        avatar: null,
    });

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    }
    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(register(form)).unwrap();
            navigation('/');
        } catch (e) {
            console.log(e);
        }
    }

    const getFieldError = (fieldName: string) => {
        try {
            return error?.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if (files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0]
            }))
        }
    };

    const googleRegisterHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigation('/');
    };

    return (
        <Container component="main" maxWidth="xs">

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={onSubmitHandler} sx={{mt: 3}}>
                    <Grid container spacing={1}>
                        <Grid size={12}>
                            <TextField
                                type='text'
                                name="username"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                autoFocus
                                value={form.username}
                                onChange={onInputChange}
                                error={Boolean(getFieldError('email'))}
                                helperText={getFieldError('email')}
                            />
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={form.password}
                                onChange={onInputChange}
                                error={Boolean(getFieldError('password'))}
                                helperText={getFieldError('password')}
                            />
                        </Grid>
                        <Grid size={12}>
                          <FileInput
                              label='avatar'
                              name='avatar'
                              onChange={fileInputChangeHandler}
                          />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        disabled={loading}
                    >
                        Sign Up
                    </Button>
                    <Box sx={{py: 2, width: '100%'}}>
                        <GoogleLogin
                            size='large'
                            onSuccess={(credentialResponse) => {
                                if(credentialResponse.credential) {
                                    googleRegisterHandler(credentialResponse.credential)
                                }
                            }}
                            onError={() => toast.error('Google login failed')}>

                        </GoogleLogin>
                    </Box>
                    <Grid >
                        <Grid>
                            <Link to='/login'>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;