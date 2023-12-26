import {Card} from "react-bootstrap";
import {ProductDto} from "../../../../data/dto/ProductDto.ts";
import "./ProductCard.css"
import {Link} from "react-router-dom";

type Props = {
    product: ProductDto;
}
export default function ProductCard({product}: Props) {
    return (
        <>
            <div className={"product-card"}>
                <Card style={{
                    width: "18rem",
                    margin: "8px 8px"
                }}
                      border="0">
                    <Link to={`/product/${product.pid}`}>
                        <Card.Img variant="top" src={`${product.image_url}`} className={"product-image"}/>
                    </Link>
                    <Card.Body>
                        <div>
                            <Link to={`/product/${product.pid}`} style={{textDecoration: "none", color: "black"}}>
                                <Card.Text className="product-title">{product.name}</Card.Text>
                            </Link>
                        </div>
                        <div>
                            <Card.Text className="product-price">${product.price.toLocaleString()}</Card.Text>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}