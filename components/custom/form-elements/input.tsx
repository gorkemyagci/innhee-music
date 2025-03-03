import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface Props
    extends Omit<InputProps, "form" | "name" | "label" | "placeholder"> {
    form: UseFormReturn<any>;
    name: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function InputElement({
    form,
    name,
    label,
    placeholder,
    disabled,
    onFocus,
    ...props
}: Props) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem
                    className="w-full"
                >
                    <FormLabel>
                        <div className="truncate flex w-full justify-start">
                            <span className={cn("text-[13px]")}>
                                {label}
                            </span>
                        </div>
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            disabled={disabled}
                            onFocus={(e) => {
                                onFocus?.(e);
                            }}
                            {...field}
                            {...props}
                            onChange={field.onChange}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
}

export default InputElement;