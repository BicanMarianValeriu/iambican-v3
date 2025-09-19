'use client';

import React, { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { Label } from './../ui/label';
import { Input } from './../ui/input';
import { Textarea } from './../ui/textarea';
import classnames from 'clsx';
import Rect from './Rect';

const FormField = forwardRef(({ type = 'hidden', name, control, className, label, description, loading, ...props }, ref) => {
    const { field, formState } = useController({ name, control });

    if (loading) {
        return (
            <>
                <Rect className="rounded mt-1" width="110" height="10" />
                <Rect className="rounded mt-3" width="100%" height={type === 'textarea' ? 90 : 36} />
            </>
        );
    }

    const TagName = type === 'textarea' ? Textarea : Input;

    const inputProps = { ...props, ...field };

    return (
        <div className="form-field relative w-full">
            {label && <Label htmlFor={`input-${name}`} className={classnames({ 'mb-2': !description })}>{label}</Label>}
            {description && <p className="block text-sm/6 text-zinc-400 mb-2">{description}</p>}
            <TagName id={`input-${name}`} type={type !== 'textarea' ? type : undefined} ref={ref} className={className} {...inputProps} />
            {formState?.errors[name] && <p className="absolute top-full left-0 right-0 mt-1 block text-xs text-rose-500">{formState.errors[name].message}</p>}
        </div>
    );
})

export default FormField;