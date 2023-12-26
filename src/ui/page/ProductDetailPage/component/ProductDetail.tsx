import "./ProductDetail.css"
import {Button, Container} from "react-bootstrap";
import {ProductDetailDto} from "../../../../data/dto/ProductDto.ts";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBox, faSpinner, faTruck} from "@fortawesome/free-solid-svg-icons";

type Props = {
    productDetail: ProductDetailDto,
    quantity: number,
    handleMinus: () => void,
    handlePlus: () => void
    handleAddToCard: () => void
    isAddingCart: boolean
}

export default function ProductDetail({
                                          productDetail,
                                          quantity,
                                          handleMinus,
                                          handlePlus,
                                          handleAddToCard,
                                          isAddingCart
                                      }: Props) {

    const renderAddToCart = () => {
        if (isAddingCart) {
            return (
                <FontAwesomeIcon icon={faSpinner} spin size="2xl"/>
            )
        } else {
            return (
                <Button id={"btn-add-cart"}
                        onClick={handleAddToCard}>
                    ADD TO CART
                </Button>
            )
        }
    }
    const renderSelectorAndButton = (productDetail: ProductDetailDto) => {
        if (productDetail.stock > 0) {
            return (
                <div style={{margin: "15px 0"}} className={"d-flex"}>
                    {renderAddToCart()}
                    <QuantitySelector quantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus}/>
                </div>
            )
        } else {
            return (
                <Button disabled id={"btn-out-of-stock"}>Out of Stock</Button>
            )
        }
    }


    return (
        <Container>
            <div className={"product-detail-container d-flex flex-nowrap"} style={{width: "100%"}}>
                <div style={{
                    backgroundImage: `url('${productDetail.image_url}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    width: "40%",
                    height: "550px",
                }}>
                </div>

                <div style={{width: "60%"}}>
                    <h1 style={{margin: "15px 0"}}>{productDetail.name}</h1>
                    <h3 style={{margin: "15px 0"}}>${productDetail.price}</h3>
                    {renderSelectorAndButton(productDetail)}
                    <div style={{margin: "15px 0"}} className={"d-flex"} id={"shipping-return-container"}>
                        <div style={{margin: "15px 0px"}}><FontAwesomeIcon icon={faTruck} size="xl"/> Free Shipping
                        </div>
                        <div style={{margin: "15px 40px"}}><FontAwesomeIcon icon={faBox} size="xl"/> Free Returns</div>
                    </div>
                    <p style={{
                        fontSize: "18px",
                        lineHeight: "32px"
                    }}>
                        {productDetail.description}
                    </p>
                </div>
            </div>
        </Container>
    )
}