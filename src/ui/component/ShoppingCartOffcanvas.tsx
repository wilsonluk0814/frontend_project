import {Button, Offcanvas} from "react-bootstrap";
import {useState} from "react";
import {CartItemDto} from "../../data/dto/CartItemDto.ts";
import ShoppingCartOffcanvasBody from "./ShoppingCartOffcanvasBody.tsx";
import * as CartItemApi from "../../api/CartItemApi.ts"
import {useNavigate} from "react-router-dom";
import Loading from "./Loading.tsx";


type Props = {
    show: boolean
    handleClose: () => void
}

export default function ShoppingCartOffcanvas({show, handleClose}: Props) {
    const [cartDataList, setCartDataList] = useState<CartItemDto[] | undefined>(undefined)
    const navagate = useNavigate()
    const getShoppingCartDataList = async () => {
        try {
            const data = await CartItemApi.getCartItemList();
            setCartDataList(data);
        } catch (error) {
            navagate("/error")
        }
    }

    const calTotalPrice = (cartDataList: CartItemDto[]): number => {
        let total = 0
        for (const cartItem of cartDataList) {
            total += (cartItem.price * cartItem.cart_quantity);
        }
        return total
    }

    return (
        <>
            <Offcanvas show={show}
                       onHide={handleClose}
                       onEnter={getShoppingCartDataList}
                       onExited={() => {
                           setCartDataList(undefined)
                       }}
                       placement={"end"}>
                <Offcanvas.Header>
                    <Offcanvas.Title style={{width: "100%"}}>
                        <h2>Your Cart</h2>
                        <hr/>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        cartDataList
                            ? cartDataList.map((item) => (
                                <ShoppingCartOffcanvasBody cartItemDto={item} key={item.pid}/>
                            ))
                            : <Loading/>
                    }
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <div>
                            Total: ${
                                        cartDataList &&
                                            calTotalPrice(cartDataList).toLocaleString()
                                    }
                        </div>
                        <div>
                            <Button variant={"danger"}
                                    onClick={()=>{
                                        navagate("/shoppingcart")
                                    }}
                            >
                                Check Out!
                            </Button>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}