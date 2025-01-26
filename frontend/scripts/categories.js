async function fetchProducts(category) {
    try {
        const response = await fetch(`/api/products?category=${category}`);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function renderProducts(products) {
    const container = document.getElementById("products-container");
    container.innerHTML = "";

    products.forEach((product) => {
        const productCard = `
            <div class="product-card" onclick="viewProduct(${product.id})">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
            </div>
        `;
        container.innerHTML += productCard;
    });
}


function viewProduct(productId) {
    window.location.href = `product.html?id=${productId}`;
}


const category = document.body.dataset.category; 
fetchProducts(category);

// Render products dynamically
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    productsContainer.innerHTML = ''; // Clear previous content

    products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button class="details-btn" data-id="${product.id}">View Details</button>
        `;

        productsContainer.appendChild(productCard);
    });

    // Add click event for details buttons
    document.querySelectorAll('.details-btn').forEach((button) => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            window.location.href = `details.html?id=${productId}`;
        });
    });
}

