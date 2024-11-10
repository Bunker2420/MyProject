import { cart, removeFromcart, updateDeliveryOption } from "./cart.js";
import { products, getProduct } from "./data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getDeliveryOption, deliveryOptions } from './deliveryoptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
export function renderOrderSummary() {
  const today = dayjs(); // Defined once
  let cartSummaryHtml = ``;

  cart.forEach((Item) => {   
    const matchingProduct = products.find((product) => product.id === Item.productId);
    const deliveryOption = deliveryOptions.find((option) => option.id === Item.deliveryOptionId);
    
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
  
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
  
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">&#x20b9;${matchingProduct.price}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${Item.quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-link" 
                    data-product-id="${matchingProduct.id}">Update</span>
              <span class="delete-quantity-link link-primary js-delete-link" 
                    data-product-id="${matchingProduct.id}">Delete</span>
            </div>
          </div>
  
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionHTML(matchingProduct, Item)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionHTML(matchingProduct, Item) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.price === 0 ? 'FREE' : `&#x20b9;${deliveryOption.price} -`;
      const isChecked = deliveryOption.id === Item.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" 
             data-product-id="${matchingProduct.id}" 
             data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} 
                 class="delivery-option-input" 
                 name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} Shipping</div>
          </div>
        </div>
      `;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

  // Event listener for deleting items
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromcart(productId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  // Event listener for updating item quantity
  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const newQuantity = prompt("Enter the new quantity:");

      if (newQuantity && !isNaN(newQuantity) && newQuantity > 0) {
        const item = cart.find((item) => item.productId === productId);
        item.quantity = parseInt(newQuantity, 10); // Update the quantity
        renderOrderSummary();
        renderPaymentSummary();
      } else {
        alert("Please enter a valid quantity.");
      }
    });
  });

  // Event listeners for selecting delivery options
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      
    });
  });
}

// Initial rendering of order summary
renderOrderSummary();
