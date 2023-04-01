import { useState, useEffect } from "react"
import Pagination from "./Pagination"
import ProductCard from "./ProductCard"
import ProductsFilter from "./ProductsFilter"
const ProductsGrid = () => {

    let [products, setProudcts] = useState([])
    let [loading, setLoading] = useState(true)
    const getProudcts = async () => {

        let response = await fetch("https://fakestoreapi.com/products")
        let tempProducts = await response.json()
        console.log(tempProducts);
        setLoading(false)
        setProudcts(tempProducts)

    }

    useEffect(() => getProudcts, [])


    let [categories, setCategories] = useState([])
    let [categoriesLoading, setCategoriesLoading] = useState(true)

    let getCategories = async () => {

        let response = await fetch('https://fakestoreapi.com/products/categories')
        let tempCategories = await response.json()
        setCategoriesLoading(false)
        setCategories(tempCategories)

    }

    useEffect(() => getCategories, [])







    if (loading)
        return <h1 className="text-center my-3">loading...</h1>

    return (
        <section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-9">
                        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                            <strong className="d-block py-2">{products.length} Items found </strong>
                            <div className="ms-auto">
                                <select className="form-select d-inline-block w-auto border pt-1">
                                    <option value="0">Best match</option>
                                    <option value="1">Recommended</option>
                                    <option value="2">High rated</option>
                                    <option value="3">Randomly</option>
                                </select>
                                <div className="btn-group shadow-0 border">
                                    <a href="#" className="btn btn-light" title="List view">
                                        <i className="fa fa-bars fa-lg"></i>
                                    </a>
                                    <a href="#" className="btn btn-light active" title="Grid view">
                                        <i className="fa fa-th fa-lg"></i>
                                    </a>
                                </div>
                            </div>
                        </header>

                        <div className="row">
                            {
                                products.map(product => <ProductCard product={product} />)
                            }


                        </div>

                        <hr />
                        <Pagination />

                    </div>
                    
                    
                   
                    
                    <div className="col-lg-3">
                        <button
                            className="btn btn-outline-secondary mb-3 w-100 d-lg-none"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span>Show filter</span>
                        </button>

                        <div className="collapse card d-lg-block mb-5" id="navbarSupportedContent">
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button
                                            className="accordion-button text-dark bg-light"
                                            type="button"
                                            data-mdb-toggle="collapse"
                                            data-mdb-target="#panelsStayOpen-collapseOne"
                                            aria-expanded="true"
                                            aria-controls="panelsStayOpen-collapseOne"
                                        >
                                            Related items
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne">
                                        <div className="accordion-body">
                                            <ul className="list-unstyled">
                                                {
                                                    categories.map(category => <><li><a href="#" className="text-dark">{category.toUpperCase()} </a></li></>)
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )


}

export default ProductsGrid