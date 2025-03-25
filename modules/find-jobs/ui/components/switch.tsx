"use client"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useFilterContext } from "../sections/filter";
import { useTranslations } from "next-intl";

const FilterSwitch = () => {
    const t = useTranslations("filter.switch");
    const [availableChecked, setAvailableChecked] = useState(false);
    const [professionalChecked, setProfessionalChecked] = useState(false);
    const { isFilterCleared } = useFilterContext();

    // Listen for filter clear events
    useEffect(() => {
        if (isFilterCleared) {
            setAvailableChecked(false);
            setProfessionalChecked(false);
        }
    }, [isFilterCleared]);

    return (
        <div className="flex flex-col gap-4 items-start">
            <div className="flex items-start gap-2">
                <Switch 
                    id="available" 
                    checked={availableChecked}
                    onCheckedChange={setAvailableChecked}
                />
                <Label htmlFor="available" className="flex flex-col items-start">
                    <span className="text-strong-950 font-normal text-sm">{t("available.title")}</span>
                    <span className="text-sub-600 font-normal text-xs">{t("available.description")}</span>
                </Label>
            </div>
            <div className="flex items-start gap-2">
                <Switch 
                    id="professional-services" 
                    checked={professionalChecked}
                    onCheckedChange={setProfessionalChecked}
                />
                <Label htmlFor="professional-services" className="flex flex-col items-start">
                    <span className="text-strong-950 font-normal text-sm">{t("professionalServices.title")}</span>
                    <span className="text-sub-600 font-normal text-xs">{t("professionalServices.description")}</span>
                </Label>
            </div>
        </div>
    );
};

export default FilterSwitch;