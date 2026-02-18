const productContainer = document.querySelector(".product-container");

// store all selected items
const cart = [];

async function fetchProducts() {
    try {
        const response = await fetch('./data.json');
        const products = await response.json();

        // console.log(response);
        // console.log(products);
        // console.log(products.length);

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <figure class="product-image">
                    <img class="products-img" src="${product.image.mobile}" alt="${product.name}">

                    <button class="cart-control add-state" data-qty="0"
                    data-id="${product.name}" data-price="${product.price}">
                        <img src="./assets/images/icon-add-to-cart.svg" alt="add to cart">
                        <span>Add to Cart</span>
                    </button>
                </figure> 

                <div class="product-content">
                    <h2>${product.category}</h2>
                    <p>${product.name}</p>
                    <strong>$${product.price.toFixed(2)}</strong>
                </div> 
                `;

                productContainer.appendChild(card);
        });

    } catch(error) {
        console.log("Error fetching", error);
    }
}

fetchProducts();

productContainer.addEventListener('click', (e) => {
    const button = e.target.closest(".cart-control");
    if (!button) return; 

    button.classList.add("active");

    const card = button.closest(".product-card");
    console.log(card);
    const productsImg = card.querySelector(".products-img");
    productsImg.classList.add("active-img");

    // get current quantity stored on button
    let quantity = Number(button.dataset.qty || 0);

    // CLICK: add to cart
    if (button.classList.contains("add-state")) {
        quantity = 1;
    }

    // CLICK: +
    if (e.target.classList.contains("plus")) {
        quantity++;
    }

    // CLICK: -
    if (e.target.classList.contains("minus") && quantity > 0) {
        quantity--;
    }

    // Save quantity
    button.dataset.qty = quantity;

    // Update UI
    renderButton(button, quantity);

    
    // cart items
    const id = button.dataset.id;
    const price = Number(button.dataset.price);

    // Check if item already exists
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty = quantity;
    } else {
        cart.push({ id, price, qty: quantity });
    }

    // Remove item if qty becomes 0
    for (let i = cart.length - 1; i >= 0; i--) {
        if (cart[i].qty === 0) cart.splice(i, 1);
    }

    renderCart();

    // cartContainer.innerHTML = `
    //     <h2>Your Cart</h2>

    //     <ul class="cart-list">
    //         <li>${card.textContent}</li>
    //     </ul>
    // ` 
    // productContainer.append(cartContainer);

});

function renderButton(button, qty) {

    if (qty <= 0) {
        button.classList.add("add-state");
        button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg" alt="add">
            <span>Add to Cart</span>
        `;
        button.dataset.qty = 0;
        
    } else {
        button.classList.remove("add-state");
        button.innerHTML = `
            <div class="minus">
                <img class="minus-img" src="./assets/images/icon-decrement-quantity.svg" alt="minus">
            </div>
            <span class="quantity">${qty}</span>
            <div class="plus">
                <img class="plus-img" src="./assets/images/icon-increment-quantity.svg" alt="plus">
            </div>
        `;
    }
}

    // creating cart container
    const cartContainer = document.createElement("div");
    cartContainer.classList.add("cart-container");
    document.body.appendChild(cartContainer);
    // const productContent = card.getElementsByTagName("p");

function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    const orderTotal = cart.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
    );

    cartContainer.innerHTML = `
        <h2>Your Cart (${cart.length})</h2>

        <ul class="cart-list">
            ${cart.map(item => `
                <li class="cart-item">
                <div class="cart-left">
                    <p class="item-name">${item.id}</p>
                    <p class="item-meta">
                    <span class="qty">${item.qty}x</span>
                    <span class="price">@ $${item.price.toFixed(2)}</span>
                    <span class="subtotal">$${(item.qty * item.price).toFixed(2)}</span>
                    </p>
                </div>
            <button class="remove-btn" data-id="${item.id}">✕</button>
        </li>
        `).join("")}
        </ul>

        <div class="order-total">
            <span>Order Total</span>
            <strong>$${orderTotal.toFixed(2)}</strong>
        </div>

        <div class="delivery">
            🌱 This is a carbon-neutral delivery
        </div>

    <button class="confirm-btn">Confirm Order</button>
    `;  
}


// remove items from cart array
cartContainer.addEventListener("click", (e) => {
  const removeBtn = e.target.closest(".remove-btn");
  if (!removeBtn) return;

  const id = removeBtn.dataset.id;

  // Remove from cart array
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) cart.splice(index, 1);

  renderCart();
});