import EditTags from "@/components/custom/modals/edit-tags";
import { Icons } from "@/components/icons"

interface TagsProps {
    tags?: Array<{
        id: string;
        name: string;
        createdAt: string;
        updatedAt: string;
    }>;
}

const Tags = ({ tags }: TagsProps = {}) => {
    const displayTags = tags && tags.length > 0 ? tags : [];

    return (
        <div className="p-4 flex flex-col gap-3 items-start">
            <div className="flex w-full items-center justify-between">
                <span className="text-main-900 font-medium text-xs">Tags</span>
                <EditTags>
                    <Icons.pencil className="size-5 cursor-pointer" />
                </EditTags>
            </div>
            <div className="flex gap-2 flex-wrap items-start">
                {displayTags.length > 0 ? displayTags.map((item, index) => (
                    <div
                        key={typeof item === 'string' ? index : item.id}
                        className="text-sub-600 shrink-0 font-medium flex items-center justify-center text-xs border border-soft-200 py-1 px-2 rounded-md h-6 min-w-16"
                    >
                        {typeof item === 'string' ? item : item.name}
                    </div>
                )) : (
                    <div className="text-sub-600 shrink-0 font-medium flex items-center justify-center text-xs border border-soft-200 py-1 px-2 rounded-md h-6 min-w-16">
                        No tags
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tags;