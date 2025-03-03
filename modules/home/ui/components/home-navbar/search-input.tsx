import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
    return <div className="bg-white border border-[#E1E4EA] rounded-xl w-80 h-10 flex items-center pl-3 pr-2.5 py-2.5">
        <Icons.search />
        <Input className="bg-transparent shadow-none border-none placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Search.." />
        <div className="flex items-center gap-2">
            <div className="bg-transparent border border-[#E1E4EA] w-8 h-5 rounded-sm py-0.5 px-1.5 flex items-center justify-center">
                <Icons.shortcut />
            </div>
            <Icons.filter />
        </div>
    </div>
}

export default SearchInput;