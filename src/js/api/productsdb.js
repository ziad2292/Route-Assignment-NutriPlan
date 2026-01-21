export async function FetchProductsBySearch(q = "", page = 1, limit = 24) {
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/search?q=${q}&page=${page}&limit=${limit}`
    );

    const data = await response.json();
    return data;
}

export async function FetchProductByBarcode(barcode) {
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/barcode/${barcode}`
    );

    const data = await response.json();
    return data;
}

export async function FetchAllProductCategories() {
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/categories`
    );

    const data = await response.json();
    return data;
}

export async function FetchProductsByCategory(category) {
    const response = await fetch(
        `https://nutriplan-api.vercel.app/api/products/category/${category}`
    );

    const data = await response.json();
    return data;
}
