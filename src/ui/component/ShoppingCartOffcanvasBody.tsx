import {CartItemDto} from "../../data/dto/CartItemDto.ts";

type Props = {
    cartItemDto: CartItemDto
}

export default function ShoppingCartOffcanvasBody({cartItemDto}: Props){
    return(
        <div>
            <div style={{
                width: "100%",
                height: "180px",
                backgroundImage: `url(${cartItemDto.image_url})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain"
            }}>
            </div>
            <h5>{cartItemDto.name}</h5>
                Price: ${cartItemDto.price.toLocaleString()}<br/>
                Quantity: {cartItemDto.cart_quantity}
            <hr/>
        </div>
    )
}