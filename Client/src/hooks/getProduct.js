import { BACKEND_BASE_URL } from "../rootExports";

export const getProduct = async (productId) => {
    const response = await fetch(`${BACKEND_BASE_URL}/api/product/view_products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application-json"
        }
    })
    const data = await response.json();
    return data;
}

export const searchProduct_s = async (productType, category) => {
    if (category) {

        const response = await fetch(`${BACKEND_BASE_URL}/api/product/getProducts?productType=${productType}&category=${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
    } else {
        const response = await fetch(`${BACKEND_BASE_URL}/api/product/getProducts?productType=${productType}`, {
            method: "GET",
            headers: {
                "Content-Type": "application-json"
            }
        })
        const data = await response.json();
        return data;
    }

}

