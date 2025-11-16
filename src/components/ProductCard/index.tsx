import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
import { Meta } from "antd/es/list/Item";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { Link } from 'react-router-dom';
import image from '../../assets/icon-no-image.svg';
import { formatPrice } from "../../common/helpers/formatPrice";
import type { IProduct } from "../../types/product";
const { Paragraph } = Typography;
import './style.css';

const BookCard = ({ book }: { book: IProduct }) => {
    const dispatch = useDispatch();

    const id = (book.id ?? book._id ?? `${book.title}-${book.author ?? ''}`) as string;

    const originalPrice = Number(book.price) || 0;
    const discount = Number(book.discount) || 0;
    const hasDiscount = discount > 0;
    const finalPrice = hasDiscount ? originalPrice * (1 - discount / 100) : originalPrice;
    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        const payload = {
            id: book.id ?? book._id,
            title: book.title,
            price: finalPrice,
            coverImage: book.coverImage || '',
        };

        dispatch(addToCart(payload));
    };

    return (
          <Link to={`/product/${id}`} style={{ width: '100%'}}>
            <Card
            hoverable
            className="book-card"
            cover={
                <div className="book-cover-wrapper">
                    {hasDiscount && (
                        <span className="discount-badge">-{discount}%</span>
                    )}
                    <img
                        alt={book.title}
                        src={book.coverImage || image}
                        className="book-cover-img"
                    />
                </div>
            }
            >
            <Meta title={<Link to={`/product/${id}`}><Paragraph style={{ marginBottom: 0}} ellipsis={{ rows: 1}}>{book.title}</Paragraph></Link>} description={book.author} />
            <div className="book-price">
                {hasDiscount && (
                    <span className="old-price">
                        {formatPrice(originalPrice)}
                    </span>
                )}
                <span className="current-price">{formatPrice(finalPrice)}</span>
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