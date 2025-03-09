import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Icons } from "@/components/icons";

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const SortSelect: React.FC<SortSelectProps> = ({ value, onChange, className }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={`w-[122px] hover:bg-accent hover:data-[placeholder]:text-main-900 group h-9 cursor-pointer rounded-lg border flex items-center justify-between appearance-none ${className}`}>
        <Icons.sort_desc className="group-hover:fill-main-900 transition-all duration-200" />
        <SelectValue placeholder="Sort by" className="group-hover:data-[placeholder]:text-main-900 data-[placeholder]:text-sub-600 data-[placeholder]:font-medium data-[placeholder]:text-sm transition-all duration-200" />
      </SelectTrigger>
      <SelectContent className="border-soft-200">
        <SelectGroup>
          <SelectItem value="rating">Rating</SelectItem>
          <SelectItem value="order-volume">Order Volume</SelectItem>
          <SelectItem value="activity">Activity</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
