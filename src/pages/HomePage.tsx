import React, { useEffect, useState } from 'react';
import { Carousel, Image } from 'antd';
import { Link } from 'react-router-dom';

const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

interface Category {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
    categoryId: number;
}

const HomePage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/category')
            .then(response => response.json())
            .then(data => setCategories(data));

        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data));
    }, []);

    const getProductsWithCategory = (categoryId: number) => {
        return products.filter(product => product.categoryId === categoryId);
    };

    return (

        <div style={{ backgroundColor: "#222222", color: 'white' }}>
            <Carousel style={{marginBottom:'50px'}} autoplay>
                <div>
                    <img width={('100%')} src="https://image.tmdb.org/t/p/original//uGy4DCmM33I7l86W7iCskNkvmLD.jpg" alt="" />
                </div>
                <div>
                    <img width={('100%')} src="https://image.tmdb.org/t/p/original//uDgy6hyPd82kOHh6I95FLtLnj6p.jpg" alt="" />
                </div>
                <div>
                    <img width={('100%')} src="https://image.tmdb.org/t/p/original//ovM06PdF3M8wvKb06i4sjW3xoww.jpg" alt="" />
                </div>
            </Carousel>

            {categories.map(category => (
                <div key={category.id}>
                    <h2>{category.name}</h2>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px 100px',
                            gap: '20px'
                        }}
                    >
                        {getProductsWithCategory(category.id).map(product => (
                            <Link to={`/products/${product.id}`}>
                                <div key={product.id}>
                                    <Image style={{ borderRadius: '10px' }} width={'250px'} src={product.image} />
                                    <br /><br />
                                    <p style={{ color: 'white' }}>{product.name}</p></div>
                            </Link>
                        ))}

                    </div>
                </div>
            ))}

        </div>
    );
};

export default HomePage;