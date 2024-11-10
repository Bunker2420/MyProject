import { cart } from "./cart.js";
import { products,getProduct } from "./data/products.js";
import { getDeliveryOption } from "./deliveryoptions.js";
export function renderPaymentSummary(){
    let productPrice = 0;
    let ShippinPrice = 0;

    cart.forEach((Item)=>{
        const product = getProduct(Item.productId);
        productPrice += product.price * Item.quantity;

        const deliveryOption = getDeliveryOption(Item.deliveryOptionId);
        ShippinPrice += deliveryOption.price;
    });
     const TotalBeforeTax = productPrice + ShippinPrice;
     const tax = TotalBeforeTax * 0.1;
     const TotalPrice = TotalBeforeTax + tax;
     const paymentHTML =  `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">&#x20b9;${productPrice}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">&#x20b9;${ShippinPrice}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">&#x20b9;${TotalBeforeTax}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">&#x20b9;${tax}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">&#x20b9;${TotalPrice}</div>
        </div>

        <button class="place-order-button button-primary">
            Place your order
        </button>`;

    document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}