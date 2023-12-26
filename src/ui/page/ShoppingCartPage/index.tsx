import TopNavbar from "../../component/TopNavbar.tsx";
import CartItemTable from "./component/CartItemTable.tsx";
import {useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/dto/CartItemDto.ts";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import * as TransactionApi from "../../../api/TransactionApi.ts"
import Loading from "../../component/Loading.tsx";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";
import EmptyCart from "../ProductDetailPage/component/EmptyCart.tsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function ShoppingCartPage() {
    const navigate = useNavigate()
    const [cartItemList, setCartItemList] = useState<CartItemDto[] | undefined>(undefined)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [isCheckouting, setIsCheckouting] = useState<boolean>(false)
    const loginUser = useContext(LoginUserContext)

    const getCartItemList = async () => {
        try {
            const data = await CartItemApi.getCartItemList()
            setCartItemList(data);
            calTotalPrice(data);
        } catch (error) {
            navigate("/error")
        }
    }

    useEffect(() => {
        if (loginUser) {
            getCartItemList()
        } else if (loginUser === null) {
            navigate("/login")
        }
    }, [loginUser]);

    const calTotalPrice = (cartDataList: CartItemDto[]): void => {
        let total = 0
        for (const cartItem of cartDataList) {
            total += (cartItem.price * cartItem.cart_quantity);
        }
        setTotalPrice(total)
    }

    const handleCheckout = async () => {
        try {
            setIsCheckouting(true)
            const transactionData = await TransactionApi.prepareTransaction();
            navigate(`/checkout/${transactionData.tid}`)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const renderCheckoutButton = () => {
        if (isCheckouting) {
            return (
                <FontAwesomeIcon icon={faSpinner} spin size="2xl"/>
            )
        } else{
          return (
              <Button variant={"danger"}
                      onClick={handleCheckout}>
                  CHECKOUT
              </Button>
          )
        }
    }


    const renderCartItemContainer = (cartItemList: CartItemDto[]) => {
        if (cartItemList.length > 0) {
            return (
                <>
                    <CartItemTable cartItemList={cartItemList} setCartItemList={setCartItemList}
                                   calTotalPrice={calTotalPrice}/>
                    <h3>Total: ${totalPrice.toLocaleString()}</h3>
                    {renderCheckoutButton()}
                </>
            )
        } else {
            return (
                <EmptyCart/>
            )
        }
    }

    return (
        <>
            <TopNavbar/>
            {
                cartItemList
                    ? renderCartItemContainer(cartItemList)
                    : <Loading/>
            }
        </>
    )
}