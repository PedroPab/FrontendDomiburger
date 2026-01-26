import { ORDER_STATUSES } from "../../../Utils/const/status";

export const calculateStatistics = (orders) => {
  let totalSales = 0;
  let salesByPaymentMethod = {};
  let totalProductsSold = 0;
  let productsCount = {};
  let deliveryCount = 0;
  let totalDeliverySales = 0;
  let totalDeliveryCost = 0;
  let totalSalesNotCounted = 0;
  let salesByDelivery = {};

  orders.forEach((order) => {
    if (order.status !== ORDER_STATUSES.INVOICED) {
      totalSalesNotCounted++;
      return;
    }

    totalSales += order.totalPrice || 0;

    const isPaymentConfirmed = order.payment ? order.payment.status === "approved" : true;
    if (isPaymentConfirmed) {
      const paymentMethod = order.paymentMethod || "desconocido";
      if (!salesByPaymentMethod[paymentMethod]) {
        salesByPaymentMethod[paymentMethod] = [];
      }
      salesByPaymentMethod[paymentMethod].push(order);
    }

    order.orderItems.forEach((item) => {
      const quantity = item.quantity || 1;
      totalProductsSold += quantity;

      if (!productsCount[item.id]) {
        productsCount[item.id] = { quantity: 0, totalSales: 0 };
      }
      productsCount[item.id].quantity += quantity;
      productsCount[item.id].totalSales += item.price * quantity;

      if (item?.complements) {
        item.complements.forEach((complement) => {
          const compQuantity = complement.quantity || 1;
          totalProductsSold += compQuantity;
          if (!productsCount[complement.id]) {
            productsCount[complement.id] = { quantity: 0, totalSales: 0 };
          }
          productsCount[complement.id].quantity += compQuantity;
          productsCount[complement.id].totalSales += complement.price * compQuantity;
        });
      }
    });

    if (order.delivery) {
      deliveryCount++;
      totalDeliverySales += order.totalPrice || 0;
      totalDeliveryCost += order.delivery.price || 0;
    }

    if (order.assignedCourierUserId) {
      const deliveryId = order.assignedCourierUserId;
      if (!salesByDelivery[deliveryId]) {
        salesByDelivery[deliveryId] = { quantity: 0, totalSales: 0 };
      }
      salesByDelivery[deliveryId].quantity++;
      salesByDelivery[deliveryId].totalSales += order.delivery.price || 0;
    }
  });

  return {
    totalSales,
    salesByPaymentMethod,
    totalProductsSold,
    productsCount,
    deliveryCount,
    totalDeliverySales,
    salesByDelivery,
    totalDeliveryCost,
    totalSalesNotCounted
  };
};
