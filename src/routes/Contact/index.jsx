"use client";

import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContactForm } from '../../utils/hooks';
import { Button } from "./../../components/ui/button";
import { FormField } from './../../components/General';
import Intro from '../Page/Components/Intro';
import { contactSchema } from '../../utils/types';

// ⬇️ define your Component
export function Component() {
    useEffect(() => window.scrollTo(0, 0));

    const { formRef, control, isLoading } = useContactForm({
        mode: 'onChange',
        resolver: zodResolver(contactSchema),
        defaultValues: {
            fname: '',
            email: '',
            mesaj: '',
        }
    });

    return (
        <>
            <Intro className="text-center" title={'Contact'} />
            <main className="main main--single container my-10 md:py-10">
                <form className="space-y-6 sm:mx-auto sm:w-full sm:max-w-xl" id="wpcf-6" ref={formRef}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField type="text" name="fname" autoComplete="family-name" label="Numele tău" disabled={isLoading}  {...{ control }} />
                        <FormField type="email" name="email" autoComplete="email" label="Adresa de email" disabled={isLoading} {...{ control }} />
                    </div>
                    <FormField type="textarea" name="mesaj" label="Mesaj" rows={3} description="Ce doresti să-mi transmiți?" disabled={isLoading} {...{ control }} />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Se trimite...' : 'Trimite'}
                    </Button>
                </form>
            </main>
        </>
    );
}

export default Component;