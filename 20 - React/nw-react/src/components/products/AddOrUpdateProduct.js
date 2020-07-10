import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { getCategories } from "../../redux/actions/categoryActions"
import { saveProduct } from "../../redux/actions/productActions"
import ProductDetail from "./ProductDetail"

function AddOrUpdateProduct({
    products,
    categories,
    getProducts,
    getCategories,
    saveProduct,
    history,
    ...props
}) {
    const [product, setProduct] = useState({...props.product})
    const [error, setError] = useState({})
    useEffect(() => {
        if (categories.length === 0) {
            getCategories()
        }
        setProduct({...props.product})
    }, [props.product])

    function handleChange(event) {
        const {name, value} = event.target
        setProduct(previousProduct => ({
            ...previousProduct,
            [name]: name === "categoryId" ? parseInt(value, 10) : value
        }))

        validate(name, value)
    }

    function handleSave(event) {
        event.preventDefault()
        saveProduct(product).then(() => {
            history.push("/")
        })
    }

    function validate(name, value) {
        if (name === "productName" && value === "") {
            setError(previousErrors => ({
                ...previousErrors,
                productName: "Please, enter a valid data"
            }))
        } else {
            setError(previousErrors => ({
                ...previousErrors,
                productName: ""
            }))
        }
    }

    return (
        <ProductDetail product={product} categories={categories} onChange={handleChange} onSave={handleSave} error={error} />
    )
}

export function getProductById(products, productId) {
    let product = products.find(product => product.id == productId) || null
    return product
}

function mapStateToProps(state, ownProps) {
    const productId = ownProps.match.params.productId
    const product = (productId && state.productListReducer.length > 0) ? getProductById(state.productListReducer, productId) : {}
    return {
        product,
        products: state.productListReducer,
        categories: state.categoryListReducer
    }
}

const mapsToDispatchProps = {
    getCategories,
    saveProduct
}

export default connect(mapStateToProps, mapsToDispatchProps)(AddOrUpdateProduct)
