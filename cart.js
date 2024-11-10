export let cart = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cart from localStorage or to an empty array

function savetoStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productId) {
    let matchingItem;
    cart.forEach((Item) => {
        if (productId === Item.productId) {
            matchingItem = Item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    savetoStorage();
}


export function removeFromcart(productId) {
    cart = cart.filter(item => item.productId !== productId); // Use filter to remove the item
    savetoStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem = cart.find(item => item.productId === productId);
    if (matchingItem) {
        matchingItem.deliveryOptionId = deliveryOptionId;
        savetoStorage();
    }
}

export function getCart() {
    return cart; // Function to retrieve the current cart
}
