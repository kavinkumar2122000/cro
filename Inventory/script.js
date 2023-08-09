const mainContent = document.getElementById('main-content');

async function getAllProducts() {
    try {
        const response = await fetch('/api/products'); // Replace with your API endpoint
        const data = await response.json();

        const productList = document.createElement('div');
        productList.classList.add('product-list');

        data.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item');

            const productName = document.createElement('h2');
            productName.textContent = product.name;

            const productPrice = document.createElement('p');
            productPrice.textContent = `Price: $${product.price.toFixed(2)}`;

            const productCategory = document.createElement('p');
            productCategory.textContent = `Category: ${product.category}`;

            productItem.appendChild(productName);
            productItem.appendChild(productPrice);
            productItem.appendChild(productCategory);

            productList.appendChild(productItem);
        });

        mainContent.innerHTML = ''; // Clear previous content
        mainContent.appendChild(productList);

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function addProduct(productData) {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
        const newProduct = await response.json();
        console.log('New product added:', newProduct);
        getAllProducts();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const addProductForm = document.getElementById('add-product-form');
    
    if (addProductForm) {
        addProductForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(addProductForm);
            const productData = {};
            formData.forEach((value, key) => {
                productData[key] = value;
            });
            await addProduct(productData);
            addProductForm.reset();
        });
    }
    
    const addProductButton = document.querySelector('nav li:nth-child(2) a');
    if (addProductButton) {
        addProductButton.addEventListener('click', () => {
            mainContent.innerHTML = ''; // Clear previous content
            mainContent.appendChild(addProductForm);
        });
    }

    getAllProducts(); // Move this line inside the DOMContentLoaded event
});
