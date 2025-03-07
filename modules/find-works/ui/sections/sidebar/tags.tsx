import EditTags from "@/components/custom/modals/edit-tags";
import { Icons } from "@/components/icons"

const Tags = () => {
    const tagItems = ["Grammy", "Billboard Music", "American Music", "BRIT", "MTV Music", "Eurovision Awards"];
    return (
        <div className="p-4 flex flex-col gap-3 items-start">
            <div className="flex w-full items-center justify-between">
                <span className="text-main-900 font-medium text-xs">Tags</span>
                <EditTags>
                    <Icons.pencil className="size-5 cursor-pointer" />
                </EditTags>
            </div>
            <div className="flex gap-2 flex-wrap items-start">
                {tagItems.map((item, index) => (
                    <div key={index} className="text-sub-600 shrink-0 font-medium flex items-center justify-center text-xs border border-soft-200 py-1 px-2 rounded-md h-6 min-w-16">
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tags;