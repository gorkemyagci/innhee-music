import Calendar from "../sections/calendar";
import Projects from "../sections/projects";
import Slider from "../sections/slider";

const WorkerDashboard = () => {
    return (
        <>
            <div className="flex-[4] flex flex-col gap-4">
                <Slider />
                <Projects />
            </div>
            <Calendar />
        </>
    )
}

export default WorkerDashboard;