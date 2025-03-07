import Calendar from "../sections/calendar";
import Slider from "../sections/slider";
import Worker from "../sections/worker";

const BuyerDashboard = () => {
    return (
        <>
            <div className="flex-[4] flex flex-col gap-4">
                <Slider />
                <Worker />
            </div>
            <Calendar />
        </>
    )
}

export default BuyerDashboard;