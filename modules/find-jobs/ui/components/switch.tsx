"use client"
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useFilterContext } from "../sections/filter";

const FilterSwitch = () => {
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
                    <span className="text-strong-950 font-normal text-sm">Available</span>
                    <span className="text-sub-600 font-normal text-xs">Recent Online</span>
                </Label>
            </div>
            <div className="flex items-start gap-2">
                <Switch 
                    id="professional-services" 
                    checked={professionalChecked}
                    onCheckedChange={setProfessionalChecked}
                />
                <Label htmlFor="professional-services" className="flex flex-col items-start">
                    <span className="text-strong-950 font-normal text-sm">Professional Services</span>
                    <span className="text-sub-600 font-normal text-xs">Vetted skills and expertise</span>
                </Label>
            </div>
        </div>
    );
};

export default FilterSwitch;