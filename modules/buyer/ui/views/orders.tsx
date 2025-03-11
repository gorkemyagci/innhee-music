import { buyerOrders } from "@/lib/mockData";
import OrderItem from "../components/order-item";

const Orders = () => {
    return <div className="flex flex-col items-start gap-6 w-full">
        {buyerOrders.map((item, index) => (
            <OrderItem item={item} key={index} />
        ))}
    </div>
}

export default Orders;