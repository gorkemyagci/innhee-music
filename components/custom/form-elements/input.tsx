import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface Props {
    name: string;
    label?: string;
    type?: "text" | "number" | "file" | "email" | "password" | "textarea" | "price";
    placeholder?: string;
    prefix?: string;
    form: UseFormReturn<any>;
    disabled?: boolean;
    className?: string;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export function InputElement({
    form,
    name,
    label,
    type = "text",
    placeholder,
    prefix,
    disabled,
    className,
    onFocus,
}: Props) {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (type === "number" || type === "price") {
            if (
                ["Backspace", "Delete", "Tab", "Escape", "Enter", ".", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key) ||
                ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase()))
            ) {
                return;
            }
            if (!/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    {label && (
                        <FormLabel>
                            <div className="truncate flex w-full justify-start">
                                <span className="text-[13px]">{label}</span>
                            </div>
                        </FormLabel>
                    )}
                    <FormControl>
                        <div className="relative">
                            {prefix && type === "price" && (
                                <div className="absolute left-0 top-0 bottom-0 flex items-center justify-center w-10 pointer-events-none bg-soft-100 border-r border-soft-200 rounded-l-lg">
                                    <span className="text-sub-600 text-sm">
                                        {prefix}
                                    </span>
                                </div>
                            )}
                            {type === "textarea" ? (
                                <Textarea
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    className={cn(
                                        "placeholder:text-soft-400 hover:placeholder:text-[#696e79] placeholder:font-normal placeholder:text-sm [&::placeholder]:transition-colors [&::placeholder]:duration-500",
                                        className
                                    )}
                                    {...field}
                                />
                            ) : (
                                <Input
                                    type={type === "price" ? "number" : type}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    onKeyDown={handleKeyDown}
                                    className={cn(
                                        "placeholder:text-soft-400 hover:placeholder:text-[#696e79] placeholder:font-normal placeholder:text-sm [&::placeholder]:transition-colors [&::placeholder]:duration-500",
                                        type === "price" && prefix && "pl-12",
                                        className
                                    )}
                                    onFocus={onFocus}
                                    {...field}
                                />
                            )}
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}

export default InputElement;