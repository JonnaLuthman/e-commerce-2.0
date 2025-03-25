import { useOrders } from "../hooks/useOrders";
import { useEffect, useState } from "react";
import { Order } from "../types/Order";
import { useSearchParams } from "react-router";

export const OrderConfirmation = () => {
  const { fetchOrderByPaymentIdHandler } = useOrders();
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [order, setOrder] = useState<Order>();

  console.log("session id", session_id);

  const getOrder_orderConfirmation = async () => {
    if (!session_id) return;

    const data = await fetchOrderByPaymentIdHandler(session_id);
    console.log("Data in order confirmation", data);
    setOrder(data);
  };

  useEffect(() => {
    getOrder_orderConfirmation();
  }, []);

  return (
    <div>
      <h1>Order Confirmation</h1>
      {order && (
        <div>
          <p>Thank you for your order!</p>
          <p>Your order number is: {order.id}</p>
          <p>Total amount: {order.total_price} €</p>
        </div>
      )}
    </div>
  );
};
