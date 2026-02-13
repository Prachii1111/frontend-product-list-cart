const productContainer = document.querySelector(".product-container");


async function fetchProducts() {
    try {
        const response = await fetch('./data.json');
        const products = await response.json();

        console.log(response);
        console.log(products);
        console.log(products.length);

        products.forEach(product => {
            const card = document.createElement("div");
            card.classList.add("product-card");

            card.innerHTML = `
                <figure class="product-image">
                    <img src="${product.image.mobile}" alt="${product.name}">

                    <button>
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