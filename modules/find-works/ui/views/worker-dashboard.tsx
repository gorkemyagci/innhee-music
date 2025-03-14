import Calendar from "../sections/calendar";
import Projects from "../sections/projects";
import Slider from "../sections/slider";

const WorkerDashboard = () => {
    return (
        <>
            <div className="flex flex-col w-full items-center gap-4">
                <Slider />
                <Projects />
            </div>
            <Calendar />
        </>
    )
}

export default WorkerDashboard;