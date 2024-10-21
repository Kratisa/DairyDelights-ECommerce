let cart = [];
let totalCost = 0;
let totalItems = 0;

// Add event listeners for all "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        addToCart(productName, productPrice);
        updateQuantityDisplay(productName);
    });
});

// Add event listeners for all "Increase" buttons
document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        addToCart(productName, productPrice);
        updateQuantityDisplay(productName);
    });
});

// Add event listeners for all "Decrease" buttons
document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.getAttribute('data-name');
        const productPrice = parseFloat(productCard.getAttribute('data-price'));

        removeFromCart(productName, productPrice);
        updateQuantityDisplay(productName);
    });
});

function addToCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        // If the item is already in the cart, increase the quantity
        cart[itemIndex].quantity++;
        cart[itemIndex].totalPrice += price;
    } else {
        // Add new item to the cart
        cart.push({
            name: name,
            price: price,
            quantity: 1,
            totalPrice: price
        });
    }

    totalItems++;
    totalCost += price;
    updateCartUI();
}

function removeFromCart(name, price) {
    const itemIndex = cart.findIndex(item => item.name === name);

    if (itemIndex > -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity--;
            cart[itemIndex].totalPrice -= price;
        } else {
            cart.splice(itemIndex, 1);
        }

        totalItems--;
        totalCost -= price;
        updateCartUI();
    }
}

function updateQuantityDisplay(name) {
    const item = cart.find(item => item.name === name);
    const quantityElement = document.querySelector(`.quantity-display[data-name="${name}"]`);

    if (item) {
        quantityElement.textContent = item.quantity;
    } else {
        quantityElement.textContent = 0;
    }
}

// Update the cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const totalItemsElement = document.getElementById('total-items');
    const totalCostElement = document.getElementById('total-cost');

    cartCount.textContent = totalItems;
    totalItemsElement.textContent = totalItems;
    totalCostElement.textContent = `₹${totalCost.toFixed(2)}`;

    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = `<span>${item.name} (x${item.quantity})</span> <span>₹${item.totalPrice.toFixed(2)}</span>`;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Show/Hide the cart modal
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = (cartModal.style.display === 'none' || cartModal.style.display === '') ? 'block' : 'none';
}
