"use client";

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from 'react-router';
import { isTokenExpired, useAuth } from '../../auth';
import { requestApi } from '../../utils/wordpress';
import { loginSchema } from '../../utils/types';
import { FormField } from '../../components/General';
import { Button } from '../../components/ui/button';

export function Component() {
    const [pending, setPending] = useState();
    const [redirect, setRedirect] = useState();
    const navigate = useNavigate();
    const { token, actions: { setToken } } = useAuth();
    const { hash } = useLocation();

    useEffect(() => {
        if (redirect || (token && !isTokenExpired(token))) {
            navigate('/dashboard/');
        }
    }, [token, navigate, redirect]);

    const { handleSubmit, formState, reset, control } = useForm({
        mode: 'onChange',
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    });

    const onSubmit = async (formData) => {
        if (pending === true) {
            return;
        }

        setPending(true);

        switch (hash) {
            case '#reset':
                try {
                    toast.success('Password reset link has been sent.');
                } catch (err) {
                    toast.error('Ceva nu e in regulă - reincercați din nou.');
                } finally {
                    reset();
                    setPending(null);
                }
                break;
            default:
                try {
                    const { data } = await requestApi.post('jwt-auth/v1/token', formData);

                    if (data?.token) {
                        setToken(data.token);

                        toast.success('Te-ai autentificat cu success.');
                    }

                } catch (err) {
                    toast.error('Ceva nu e in regulă - reincercați din nou.');
                } finally {
                    reset();
                    setRedirect(true);
                    setPending(null);
                }
                break;
        }
    }

    return (
        <div className="container">
            <div className="flex flex-col justify-center my-10 md:py-10">
                {hash === '#reset' ? <>
                    <Helmet title="Resetare parolă" />
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Ați uitat parola?</h2>
                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <FormField type="email" name="username" autoComplete="off" label="Adresa de email" {...{ control }} />
                                <Button type="submit" className="w-full" disabled={!formState.isValid || pending}>
                                    {pending ? 'Se solicită...' : 'Trimite'}
                                </Button>
                            </form>
                            <p className="mt-10 text-center text-sm text-gray-500">
                                <span>Inapoi la</span>
                                <span>&nbsp;</span>
                                <button
                                    type="button"
                                    className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
                                    onClick={() => navigate('/login/')}
                                >autentificare</button>
                            </p>
                        </div>
                    </div>
                </> : <>
                    <Helmet title="Autentificare" />
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Conectați-vă la contul dvs.</h2>
                        <p className="text-center text-sm text-gray-500">
                            <span>Nu ești membru?</span>
                            <span>&nbsp;</span>
                            <button
                                type="button"
                                className="font-semibold leading-6 text-blue-500 hover:text-blue-400"
                                onClick={() => navigate('/join/')}
                                disabled={pending}
                            >Alătura-te!</button>
                        </p>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <FormField type="email" name="username" autoComplete="email" label="Adresa de email" {...{ control }} disabled={pending} />
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="input-password" className="block text-sm font-medium leading-6 text-gray-900">Parola</label>
                                    <div className="text-sm">
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login/#reset')}
                                            className="font-semibold text-blue-500 hover:text-blue-400"
                                        >Ai uitat parola?</button>
                                    </div>
                                </div>
                                <FormField type="password" name="password" autoComplete="current-password" {...{ control }} disabled={pending} />
                            </div>
                            <Button type="submit" className="w-full" disabled={!formState.isValid || pending}>
                                {pending ? 'Se conectează...' : 'Conectați-vă'}
                            </Button>
                        </form>
                        {/* <p className="mt-10 text-center text-sm text-gray-500">
                            By clicking continue, you agree to our Terms of Service and Privacy Policy.
                        </p> */}
                    </div>
                </>}
            </div>
        </div>
    );
}

export default Component;