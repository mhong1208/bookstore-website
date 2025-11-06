import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Meta } from "antd/es/list/Item";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

const BookCard = ({ book }: any) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        // Normalize payload so reducer always receives an `id` field.
        const id = (book.id ?? book._id ?? `${book.title}-${book.author ?? ''}`) as string;
        const payload = {
            id: String(id),
            title: book.title,
            price: Number(book.price) || 0,
            image: book.image || '',
        };

        dispatch(addToCart(payload));
    };

    return (
        <Card
        hoverable
        className="book-card"
        cover={<img alt={book.title} src={book.image} className="book-cover-img" />}
        actions={[
            <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            size="middle"
            onClick={handleAddToCart}
            >
            Thêm vào giỏ
            </Button>
        ]}
        >
        <Meta title={book.title} description={book.author} />
        <div className="book-price">
            <span className="current-price">{book.price}</span>
            {book.oldPrice && <span className="old-price">{book.oldPrice}</span>}
        </div>
        </Card>
    );
}
export default BookCard;