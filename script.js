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

    // const cartSection = document.createElement("div");
    // cartSection.classList.add("right-cart-section");

    // cartSection.innerHTML = `
    //     <figure class="cart-image">
    //         <img src="./assets/images/illustration-empty-cart.svg" alt="">
    //     </figure>
    // `


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
    if (e.target.closest(".plus")) {
        quantity++;
    }

    // CLICK: -
    if (e.target.closest(".minus") && quantity > 0) {
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
        button.classList.remove("active");
        button.classList.add("add-state");

        button.innerHTML = `
            <img src="./assets/images/icon-add-to-cart.svg" alt="add">
            <span class="add-to-cart-btn">Add to Cart</span>
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

    // const productListing = document.querySelector(".product-listing");

    // creating cart container

    // const cartContainer = document.createElement("div");
    // cartContainer.classList.add("right-cart-section");

    const cartContainer = document.querySelector(".right-cart-section");

    const cartContent = document.createElement("div");
    cartContent.classList.add("cart-container");
    
    cartContainer.appendChild(cartContent);

    // cartContainer.innerHTML = `
    //     <div class="cart-section">
    //         <h2>Your Cart (0)</h2>
    //         <figure class="cart-image">
    //             <img src="./assets/images/illustration-empty-cart.svg" alt="">
    //             <span>Your added items will appear here</span>
    //         </figure> 
    //     </div>
    // `
    // productListing.appendChild(cartContainer);

    renderCart();

    // const cartWrapper = document.createElement("div");
    // cartWrapper.classList.add("cart-wrapper");

    // cartContainer.appendChild(cartWrapper);


    // function renderCart() {
    //     const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    //     const orderTotal = cart.reduce(
    //         (sum, item) => sum + item.qty * item.price,
    //         0
    //     );

    //     if (cart.length === 0) {
    //     cartContent.innerHTML = `
    //         <figure class="cart-image">
    //             <img src="./assets/images/illustration-empty-cart.svg">
    //             <span>Your added items will appear here</span>
    //         </figure>
    //     `;
    //     return;
    // }

    // cartContent.innerHTML = `
    //     <h2>Your Cart (${totalItems})</h2>

    //     <ul class="cart-list">
    //         ${cart.map(item => `
    //             <li class="cart-item">
    //             <div class="cart-left">
    //                 <p class="item-name">${item.id}</p>
    //                 <div class="item-meta">
    //                     <span class="qty">${item.qty}x</span>
    //                     <span class="price">@ $${item.price.toFixed(2)}</span>
    //                     <span class="subtotal">$${(item.qty * item.price).toFixed(2)}</span>
    //                 </div>
    //             </div>
    //             <div class="cart-right">
    //                 <img class="remove-btn" src="./assets/images/icon-remove-item.svg" 
    //                 data-id="${item.id}">
    //             </div>
    //     </li>
    //     `).join("")}
    //     </ul>

    //     <div class="order-total">
    //         <span>Order Total</span>
    //         <strong>$${orderTotal.toFixed(2)}</strong>
    //     </div>

    //     <div class="delivery">
    //         <img src="./assets/images/icon-carbon-neutral.svg">
    //         <span>This is a <strong>carbon-neutral</strong> delivery</span>
    //     </div>

    // <button class="confirm-btn">Confirm Order</button>
    // `;  
    // }


    function renderCart() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const orderTotal = cart.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  // EMPTY CART
  if (cart.length === 0) {
    cartContent.innerHTML = `
      <h2>Your Cart (0)</h2>
      <figure class="cart-image">
        <img src="./assets/images/illustration-empty-cart.svg">
        <span>Your added items will appear here</span>
      </figure>
    `;
    return;
  }

  // FILLED CART
  cartContent.innerHTML = `
    <h2>Your Cart (${totalItems})</h2>

    <ul class="cart-list">
      ${cart.map(item => `
        <li class="cart-item">
          <div class="cart-left">
            <p class="item-name">${item.id}</p>
            <div class="item-meta">
              <span class="qty">${item.qty}x</span>
              <span class="price">@ $${item.price.toFixed(2)}</span>
              <span class="subtotal">$${(item.qty * item.price).toFixed(2)}</span>
            </div>
          </div>

          <div class="cart-right">
            <img class="remove-btn"
              src="./assets/images/icon-remove-item.svg"
              data-id="${item.id}">
          </div>
        </li>

        <hr class="hr-rule">
      `).join("")}
    </ul>

    <div class="order-total">
      <span>Order Total</span>
      <strong>$${orderTotal.toFixed(2)}</strong>
    </div>

    <div class="delivery">
      <img src="./assets/images/icon-carbon-neutral.svg">
      <span>This is a <strong>carbon-neutral</strong> delivery</span>
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