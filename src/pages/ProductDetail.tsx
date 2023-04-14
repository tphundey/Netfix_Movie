
import { useParams, Link } from 'react-router-dom';
import { IProduct } from '../types/product';
import { useEffect, useState } from 'react';
import { Rate, message } from 'antd';
import { Space, Table, Button, Input } from 'antd';
import axios from 'axios';
import moment from 'moment';
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

interface IProps {
    products: IProduct[];
}

const ProductDetailPage = (props: IProps) => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct>({});
    const [category, setCategory] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [comments, setComments] = useState([]);

    const [newComment, setNewComment] = useState('');
    const [user, setUser] = useState({});

    useEffect(() => {
        const currentProduct = props.products.find(item => item.id === Number(id));
        setProduct(currentProduct);

        // Lấy danh sách categories từ server và lưu vào state
        axios.get('http://localhost:3000/category')
            .then(response => setCategory(response.data))
            .catch(error => console.log(error));

        // Lấy danh sách bình luận của sản phẩm từ server và lưu vào state
        axios.get(`http://localhost:3000/comment?productId=${id}`)
            .then(response => setComments(response.data))
            .catch(error => console.log(error));

        // Lấy thông tin user từ server và lưu vào state
        fetch('http://localhost:3000/users/current')
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.log(error));
    }, [props, id]);

    // Tìm tên category tương ứng với categoryId của sản phẩm
    useEffect(() => {
        const currentCategory = category.find(item => item.id === product?.categoryId);
        setCategoryName(currentCategory?.name || '');
    }, [product, category]);

    const handleAddToFavorites = async () => {
        try {
            const userId = user?.id; // assuming the response contains the user ID

            await fetch('http://localhost:3000/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    productId: product.id,
                }),
            });

            message.success("Add to favorites success");
        } catch (error) {
            // handle the error
        }
    };

    const handleNewCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleAddNewComment = () => {
        console.log(user?.username);

        const author = user?.username || (user?.isLoggedin === true ? 'username' : 'Anonymous');
        const content = newComment.trim();

        if (content) {
            axios.post('http://localhost:3000/comment', { productId: id, author, content })
                .then(response => {
                    setComments([...comments, response.data]);
                    setNewComment('');
                })
                .catch(error => console.log(error));
        }
    };
    const formatTime = (timestamp) => {
        const now = new Date();
        const diff = (now - timestamp) / 1000;
        if (diff < 60) {
            return 'just now';
        } else if (diff < 3600) {
            const minutes = Math.floor(diff / 60);
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else if (diff < 86400) {
            const hours = Math.floor(diff / 3600);
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            return new Date(timestamp).toLocaleString();
        }
    }
    // const App: React.FC = () => <Rate allowHalf defaultValue={2.5} />;
    const [value, setValue] = useState(4);
    return (
        <div style={{ backgroundColor: '#333333' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#333333', marginTop: '50px', color: 'white' }}>
                <div style={{ marginRight: '250px', width: '5%' }}>
                    <img width={'300px'} src={product?.image} alt="" />
                </div>
                <div style={{ marginRight: '10%', width: '60%' }}>
                    <h1 style={{ fontSize: '30px' }}>{product?.name}</h1>
                    <p style={{ fontSize: '16px' }}>{product?.description}</p>
                    <p>Fare: {product?.price} $</p>
                    <p>Category: {categoryName}</p>
                    <span>
                        <Rate tooltips={desc} onChange={setValue} value={value} />
                        {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                    </span>
                    <br /><br />
                    <Link to={`http://localhost:5173/watch/${product?.id}`}>
                        <Button type="primary" style={{ backgroundColor: '#34495E' }}>Watch Now</Button>
                    </Link>
                    <Button onClick={handleAddToFavorites} type="primary" style={{ backgroundColor: '#34495E', marginLeft: '20px' }}>Add to Favorites</Button>
                </div>
            </div>
            <div style={{ backgroundColor: '#333333', marginTop: '30px', color: 'white' }}>
                <p style={{ fontSize: '25px', marginLeft: '10px' }}>Cast</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ marginRight: '10px', marginLeft: '10px' }} >
                        <img style={{ borderRadius: '20px' }} width={('200px')} src="https://image.tmdb.org/t/p/w500/wYApP38aXe6ZcEtlBAfNRxJTQQi.jpg" alt="" />
                        <p>Justin Roiland</p>
                    </div>
                    <div style={{ marginRight: '10px', marginLeft: '10px' }} >
                        <img style={{ borderRadius: '20px' }} width={('200px')} src="https://image.tmdb.org/t/p/w500/iiJrFrATSXib0Zi0aVdmbHJQI0s.jpg" alt="" />
                        <p>Chris Parnell</p>
                    </div>
                    <div style={{ marginRight: '10px', marginLeft: '10px' }} >
                        <img style={{ borderRadius: '20px' }} width={('200px')} src="https://image.tmdb.org/t/p/w500/1L8Y45RJo2YxUXl6ldIowQay1V7.jpg" alt="" />
                        <p>Spencer Grammer</p>
                    </div>
                </div>
            </div>
            <div>
                <p style={{ fontSize: '25px', marginLeft: '10px', color: 'white' }}>Comments</p>
                <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
                    {comments.map(comment => (
                        <div key={comment.id} style={{ marginBottom: '10px', display: 'flex', gap: '20px', width: "300px" }}>
                            <div>
                                <img style={{ borderRadius: '60px' }} width={'50px'} src="https://lh3.googleusercontent.com/a/AGNmyxZ0KuVlqhqmlvD1mmSialsvB5ncd6eiark6nqlr=s96-c" alt="" />
                            </div>
                            <div style={{ backgroundColor: '#3A3B3C', borderRadius: '10px', padding: ' 10px', width: "500px" }}>
                                <p>{comment.author}</p>
                                <p>{comment.content}</p>
                                <p style={{ fontSize: '12px', color: '#8e8e8e' }}>{moment(comment.formatTime).fromNow(true)}</p>
                            </div>
                        </div>
                    ))}

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <Input style={{ width: '800px' }} value={newComment} onChange={handleNewCommentChange} placeholder="Enter your comment" />
                        <Button onClick={handleAddNewComment} type="primary" style={{ backgroundColor: '#34495E', marginLeft: '10px' }}>Send</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;