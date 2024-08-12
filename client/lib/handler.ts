// handler.js

// Function to handle user registration
async function signUp(userData, onSuccess, onError) {
    try {
        const response = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log('Registration successful:', data);
        if (onSuccess) onSuccess(data);
    } catch (error) {
        console.error('Error during registration:', error);
        if (onError) onError(error);
    }
}

// Function to handle user login
async function login(credentials, onSuccess, onError) {
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log('Login successful:', data);
        if (onSuccess) onSuccess(data);
    } catch (error) {
        console.error('Error during login:', error);
        if (onError) onError(error);
    }
}

async function createProduct(productData,
                             token,
                             onSuccess,
                             onError) {
    try {
        const formData = new FormData();
        formData.append('name', productData.name);
        formData.append('description', productData.description);
        formData.append('price', productData.price);
        formData.append('stock', productData.stock);
        formData.append('image', productData.image);

        const response = await fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data = await response.json();
        console.log('Product creation successful:', data);
        if (onSuccess) onSuccess(data);
    } catch (error) {
        console.error('Error during product creation:', error);
        if (onError) onError(error);
    }
}
async function fetchCategories() {
    try {
        const response = await fetch('http://localhost:8080/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function createCategory(categoryName) {
    try {
        const response = await fetch('http://localhost:8080/categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category_name: categoryName }),
        });
        if (!response.ok) {
            throw new Error('Failed to create category');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating category:', error);
        return null;
    }
}

export { signUp, login,createProduct,fetchCategories, createCategory };