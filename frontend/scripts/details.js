// Fetch product details from the server
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        const product = await response.json();
        renderProductDetails(product);
    } catch (error) {
        console.error(error);
        document.getElementById('product-details').innerHTML = '<p>Error loading product details.</p>';
    }
}

// Render product details on the page
function renderProductDetails(product) {
    const detailsContainer = document.getElementById('product-details');
    detailsContainer.innerHTML = `
        <h1>${product.name}</h1>
        <img src="${product.image}" alt="${product.name}">
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.info}</p>
        <button onclick="window.history.back()">Go Back</button>
    `;
}

// Get product ID from URL and fetch details
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
if (productId) {
    fetchProductDetails(productId);
} else {
    document.getElementById('product-details').innerHTML = '<p>Product not found.</p>';
}
