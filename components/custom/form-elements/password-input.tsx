'use client';

import { useState } from 'react';
import { Icons } from '@/components/icons';
import { InputProps } from '@/components/ui/input';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import InputElement from './input';

interface Props extends Omit<InputProps, 'form' | 'name' | 'label' | 'placeholder'> {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    optional?: boolean;
}

export function PasswordInput({ form, name, placeholder }: Props) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow((prevState) => !prevState);

    return (
        <FormField
            control={form?.control}
            name={name}
            render={() => (
                <FormItem>
                    <FormLabel>Password<span className="text-sm text-error-base">*</span></FormLabel>
                    <div>
                        <FormControl>
                            <div className="flex h-10 items-center relative gap-0 px-1 pr-2 py-0 transition-all duration-500 hover:bg-gray-100/60 hover:border-gray-100/60 bg-white border border-soft-200 rounded-xl">
                                <div className="flex-1 relative"><InputElement form={form} name={name} placeholder={placeholder} className="border-none shadow-none absolute top-1/2 -translate-y-1/2" type={show ? 'text' : 'password'} /></div>
                                <div className={cn("cursor-pointer", !show && "opacity-50")} onClick={handleShow}>
                                    <Icons.eye />
                                </div>
                            </div>
                        </FormControl>
                    </div>
                    <FormMessage className="font-medium text-xs" />
                </FormItem>
            )}
        />
    );
}