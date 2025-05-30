import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormField, FormItem } from "@/components/ui/form";
import SubmitButton from "@/modules/auth/ui/components/submit-button";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";
import { useTranslations } from "next-intl";

interface SubmitProps {
    form: UseFormReturn<any>;
}

const Submit = ({ form }: SubmitProps) => {
    const t = useTranslations("sendOrder.submit");
    return <div className="w-full flex flex-col items-start gap-5">
        <FormField
            control={form.control}
            name="termsAgreed"
            render={() => (
                <FormItem className="flex py-0.5 md:py-2 items-center gap-1 md:gap-2">
                    <Checkbox id="terms" className="border w-[18px] h-[18px] border-soft-200 hover:shadow-sm data-[state=checked]:bg-main-900 data-[state=checked]:border-main-900" />
                    <label
                        htmlFor="terms"
                        className="text-[10px] md:text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        <span>{t("terms")}</span>
                        <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("termsLink")}</Link>
                        <span> {t("and")} </span>
                        <Link href="#" className="border-b border-strong-950 text-main-900 font-medium">{t("privacyLink")}</Link>
                    </label>
                </FormItem>
            )}
        />
        <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="outline" className="h-10 w-full sm:flex-1 border-soft-200 rounded-lg bg-white flex items-center gap-1.5 text-sub-600 font-medium text-sm">
                {t("buttons.cancel")}
            </Button>
            <SubmitButton 
                text={t("buttons.continue")} 
                buttonType="submit" 
                className="w-full sm:flex-1"
                loading={form.formState.isSubmitting}
            />
        </div>
    </div>
}

export default Submit;