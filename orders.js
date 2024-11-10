import { cart } from "./cart.js"; // Ensure you're importing the cart
import { products } from "./data/products.js"; // Import your products data

// Function to get product details by ID
function getProductDetails(productId) {
    return products.find(product => product.id === productId);
}

// Function to render orders
export function renderOrders() {
    const ordersGrid = document.querySelector('.orders-grid');
    ordersGrid.innerHTML = ''; // Clear the grid before rendering

    cart.forEach(item => {
        const productDetails = getProductDetails(item.productId);
        if (productDetails) {
            const orderHTML = `
                <div class="order-item">
                    <img src="${productDetails.image}" alt="${productDetails.name}" class="order-product-image">
                    <div class="order-product-name">${productDetails.name}</div>
                    <div class="order-product-quantity">Quantity: ${item.quantity}</div>
                </div>
                <div><h1>Your Order is placed Succesfully</h1></div>
            `;
            ordersGrid.innerHTML += orderHTML;
        }
    });
}

// Call the render function when the script loads
renderOrders();
