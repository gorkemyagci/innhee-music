import { Icons } from "@/components/icons";
import { Input } from "@/components/ui/input";

const SearchInput = () => {
    return <div className="bg-white border border-[#E1E4EA] rounded-xl w-[308px] h-10 flex items-center pl-3 pr-2.5 py-2.5">
        <Icons.search />
        <Input className="bg-transparent shadow-none border-none placeholder:text-[#99A0AE] focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Discover more" />
    </div>
}

export default SearchInput;