import React from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';

export default class Main extends React.Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    };
    //Metodo executado assim que o componente for renderixazdo em tela
    componentDidMount() {
        this.loadProducts();
    }

    // modelo arrow function
    loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);
        const { docs, ...productInfo } = response.data;
        this.setState({ products: docs, productInfo, page })
    }

    prevPage = async () => {
        const { page } = this.state;
        if (page == 1) {
            return;
        } else {
            const pageNumber = page - 1;
            this.loadProducts(pageNumber);
        };
    }

    nextPage = async () => {
        const { page, productInfo } = this.state;
        if (page == productInfo.pages) {
            return;
        } else {
            const pageNumber = page + 1;
            this.loadProducts(pageNumber);
        };
    }

    render() {
        const { products, page, productInfo } = this.state;
        return (
            <div className="product-list">
                {products.map(
                    product => (
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>
                            <Link to={`/products/${product._id}`}>Acessar</Link>
                        </article>
                    )
                )}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button disabled={page === productInfo.pages} onClick={this.nextPage}>Proximo</button>
                </div>
            </div>
        );
    }
}