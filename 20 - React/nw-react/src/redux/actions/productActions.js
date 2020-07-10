import * as actionTypes from "./actionTypes";

export const getProducts = (id) =>
  function (dispatch) {
    const url = "http://localhost:3000/products?categoryId=" + id;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => dispatch(getProductsSuccess(res)));
  };

export const saveProductApi = product => {
return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
})
    .then(handleResponse)
    .catch(handleError);
}

export const createProductSuccess = (product) => ({
  type: actionTypes.CREATE_PRODUCT_SUCCESS,
  payload: product,
});

export const updateProductSuccess = (product) => ({
  type: actionTypes.UPDATE_PRODUCT_SUCCESS,
  payload: product,
});

export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export const getProductsSuccess = (products) => ({
  type: actionTypes.GET_PRODUCTS_SUCCESS,
  payload: products,
});

export async function handleResponse(response) {
    if (response.ok)
        return response.json()

    const err = await response.text()
    throw new Error(err)
}

export async function handleError(error) {
    console.log(error)
    throw error
}
