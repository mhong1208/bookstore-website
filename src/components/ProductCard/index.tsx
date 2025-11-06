import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Meta } from "antd/es/list/Item";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Link } from 'react-router-dom';
import image from '../../assets/icon-no-image.svg';
import { formatPrice } from "../../common/helpers/formatPrice";

const BookCard = ({ book }: any) => {
    const dispatch = useDispatch();

    const id = (book.id ?? book._id ?? `${book.title}-${book.author ?? ''}`) as string;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const payload = {
            id: String(id),
            title: book.title,
            price: Number(book.price) || 0,
            image: book.image || image,
        };

        dispatch(addToCart(payload));
    };

    return (
          <Link to={`/product/${id}`}>
            <Card
            hoverable
            className="book-card"
            cover={
                <img alt={book.title} src={book.coverImage || image} className="book-cover-img" />
            }
            >
            <Meta title={<Link to={`/product/${id}`}>{book.title}</Link>} description={book.author} />
            <div className="book-price">
                <span className="current-price">{formatPrice(book.price)}</span>
                {book.oldPrice && <span className="old-price">{book.oldPrice}</span>}
            </div>
            <Button
                style={{ width: '100%' }}
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="middle"
                onClick={handleAddToCart}
                >
                Thêm vào giỏ
                </Button>
            </Card>
          </Link>

    );
}
export default BookCard;