import { renderOrderSummary } from "./orderSummary.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { getDeliveryOption } from "./deliveryoptions.js";


renderOrderSummary();
renderPaymentSummary();

document.addEventListener('DOMContentLoaded', () => {
    const placeOrderButton = document.querySelector('.place-order-button');

    placeOrderButton.addEventListener('click', () => {
        const orderDetails = JSON.parse(localStorage.getItem('cart')) || [];
        console.log("Order details before saving:", orderDetails); // Debug log
        localStorage.setItem('orderDetails', JSON.stringify(orderDetails)); // Save to localStorage
        window.location.href = 'orders.html'; // Redirect to orders page
    });
});
