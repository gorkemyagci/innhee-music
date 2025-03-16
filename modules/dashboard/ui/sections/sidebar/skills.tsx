import EditSkills from "@/components/custom/modals/edit-skills";
import { Icons } from "@/components/icons";

const Skills = ({ edit = true, skills }: { edit?: boolean, skills?: any[] }) => {
    return (
        <div className="p-4 flex flex-col items-start gap-3">
            <div className="flex items-center w-full justify-between">
                <span className="text-main-900 font-medium text-xs">Skills</span>
                <EditSkills>
                    {edit && <Icons.pencil className="size-5 cursor-pointer" />}
                </EditSkills>
            </div>
            <div className="flex flex-col items-start gap-2">
                {skills?.map((item, index) => (
                    <div key={index} className="flex flex-col items-start gap-1">
                        <p className="text-strong-950 font-medium text-xs">{item?.name}</p>
                        <span className="text-sub-600 font-normal text-xs">Average price - $350 per song</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Skills