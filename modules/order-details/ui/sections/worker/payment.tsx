import Milestone from "../../components/milestone";
import PaymentInfo from "../../components/payment-info";

const Payment = () => {
    return (
        <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
            <PaymentInfo />
            <Milestone />
        </div>
    )
}

export default Payment;