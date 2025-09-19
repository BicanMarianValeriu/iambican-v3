"use client";

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../auth';
import { userSchema } from '../../../utils/types';
import { requestApi } from '../../../utils/wordpress';
import { FormField, Rect } from '../../../components/General';
import { Button } from './../../../components/ui/button';

const Settings = () => {
    const [pending, setPending] = useState(false);
    const { user, actions, loading } = useAuth();

    const { handleSubmit, formState, setValue, control, reset } = useForm({
        mode: 'onChange',
        resolver: zodResolver(userSchema),
        defaultValues: {
            username: '',
            email: '',
            first_name: '',
            last_name: '',
            description: '',
            address: '',
            city: '',
            region: '',
            zip: '',
        }
    });

    useEffect(() => {
        if (user) {
            const { acf } = user;

            setValue('username', user.username);
            setValue('email', user.email);
            setValue('first_name', user.first_name);
            setValue('last_name', user.last_name);
            setValue('description', user.description);
            setValue('address', acf.address.strada);
            setValue('city', acf.address.oras);
            setValue('region', acf.address.judet);
            setValue('zip', acf.address.zip);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        if (pending === true) {
            return;
        }

        setPending(true);

        const { address, city, region, zip, ...rest } = data;
        const newData = {
            ...rest, acf: {
                address: {
                    strada: address,
                    oras: city,
                    judet: region,
                    zip: zip,
                }
            }
        };

        try {
            const { data: newUser } = await requestApi.post('wp/v2/users/me', {
                ...newData,
                params: { context: 'edit' },
            });

            actions.setUser(newUser);
            toast.success('Informațiile tale au fost modificate.');
            reset(data);
        } catch (err) {
            toast.error(err);
        } finally {
            setPending(false);
        }
    }

    const TitlePreloader = ({ children }) => {
        if (loading) {
            return <Rect width="30%" height="15" />
        }

        return children;
    }

    const DescPreloader = ({ children }) => {
        if (loading) {
            return (
                <>
                    <Rect className="rounded-sm mt-4" width="90%" height="10" />
                    <Rect className="rounded-sm mt-2" width="20%" height="10" />
                </>
            )
        }

        return children;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="lg:w-1/3 space-y-1">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                <TitlePreloader>Profil</TitlePreloader>
                            </h2>
                            <p className="text-sm leading-6 text-gray-600">
                                <DescPreloader>Aceste informații vor fi afișate public, așa că aveți grijă la ceea ce distribuiți.</DescPreloader>
                            </p>
                        </div>
                        <div className="lg:w-2/3">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-4">
                                    <FormField type="text" name="username" label="Nume de utilizator" loading={loading} disabled {...{ control }} />
                                </div>
                                <div className="col-span-full">
                                    <FormField
                                        type="textarea"
                                        name="description"
                                        label="Despre"
                                        rows={3}
                                        description="Scrie câteva propoziții despre tine."
                                        loading={loading}
                                        {...{ control }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="flex flex-col lg:flex-row gap-5">
                        <div className="lg:w-1/3 space-y-1">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                <TitlePreloader>Informații personale</TitlePreloader>
                            </h2>
                            <p className="text-sm leading-6 text-gray-600">
                                <DescPreloader>Utilizați o adresă permanentă unde puteți primi e-mailuri.</DescPreloader>
                            </p>
                        </div>
                        <div className="lg:w-2/3">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <FormField type="text" name="first_name" autoComplete="given-name" label="Prenume" loading={loading} {...{ control }} />
                                </div>
                                <div className="sm:col-span-3">
                                    <FormField type="text" name="last_name" autoComplete="family-name" label="Nume" loading={loading} {...{ control }} />
                                </div>
                                <div className="sm:col-span-4">
                                    <FormField type="email" name="email" autoComplete="email" label="Email" loading={loading} {...{ control }} />
                                </div>
                                <div className="col-span-full">
                                    <FormField type="text" name="address" autoComplete="street-address" label="Adresă" loading={loading} {...{ control }} />
                                </div>
                                <div className="sm:col-span-2 sm:col-start-1">
                                    <FormField type="text" name="city" autoComplete="address-level2" label="Oraş" loading={loading} {...{ control }} />
                                </div>
                                <div className="sm:col-span-2">
                                    <FormField type="text" name="region" autoComplete="address-level1" label="Stat / Provincie" loading={loading} {...{ control }} />
                                </div>
                                <div className="sm:col-span-2">
                                    <FormField type="text" name="zip" autoComplete="postal-code" label="Zip / Cod Poştal" loading={loading} {...{ control }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end">
                <Button type="submit" disabled={pending || (!formState.isDirty && !formState.isValid)}>{
                    pending ? 'Modific detaliile' : 'Salvează'
                }</Button>
            </div>
        </form>
    );
}

export default Settings;
