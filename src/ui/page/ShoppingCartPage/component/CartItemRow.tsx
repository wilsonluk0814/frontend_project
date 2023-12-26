import {faSpinner, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {CartItemDto} from "../../../../data/dto/CartItemDto.ts";
import {useState} from "react";
import * as CartItemApi from "../../../../api/CartItemApi.ts"

type Props = {
    cartItem: CartItemDto
    carItemList: CartItemDto[]
    setCartItemList: (cartItemList: CartItemDto[]) => void
    calTotalPrice: (cartItemList: CartItemDto[]) => void
}

export default function CartItemRow({cartItem, carItemList, setCartItemList, calTotalPrice}:Props){
    const [quantity, setQuantity] = useState<number>(cartItem.cart_quantity);
    const [isPatchingQuantity, setIsPatchingQuantity] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    const handleMinus = async ()=>{
        if(quantity > 1){
            setIsPatchingQuantity(true)
            const data = await CartItemApi.pathCartItem(cartItem.pid, quantity - 1)
            setQuantity(data.cart_quantity)
            setIsPatchingQuantity(false)
            for (const item of carItemList) {
                if (cartItem.pid === item.pid) {
                    cartItem.cart_quantity = data.cart_quantity;
                    calTotalPrice(carItemList);
                }
            }
        }
    }

    const handlePlus = async () => {
        setIsPatchingQuantity(true)
        const data = await CartItemApi.pathCartItem(cartItem.pid, quantity + 1)
        setQuantity(data.cart_quantity)
        setIsPatchingQuantity(false)
        for (const item of carItemList) {
            if (cartItem.pid === item.pid) {
                cartItem.cart_quantity = data.cart_quantity;
                calTotalPrice(carItemList);
            }
        }
    }

    const handleDelete = async ()=>{
        setIsDeleting(true)
        await CartItemApi.deleteCartItem(cartItem.pid)
        const updatedList = carItemList.filter((item)=>(cartItem.pid !== item.pid))
        setCartItemList(updatedList)
        calTotalPrice(updatedList);
        setIsDeleting(false)
    }

    const renderQuantitySelector = () => {
      if(isPatchingQuantity){
          return(
              <FontAwesomeIcon icon={faSpinner} spin size="2xl"/>
          )
      }else {
          return (
              <div style={{width: "100px"}}>
                  <QuantitySelector quantity={quantity}
                                    handleMinus={handleMinus}
                                    handlePlus={handlePlus}
                  />
              </div>
          )
      }
    }

    const renderDeleteButton = ()=>{
        if(isDeleting){
            return(
                <FontAwesomeIcon icon={faSpinner} spin size="2xl"/>
            )
        }else {
            return (
                <button style={{
                    border: "none",
                    backgroundColor: "white"
                }}
                        onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrashCan} size={"2xl"}/>
                </button>
            )
        }
    }

    return(
        <tr>
            <td>
                <div style={{
                    backgroundImage: `url(${cartItem.image_url})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100px",
                    height: "150px"
                }}/>
            </td>
            <td>{cartItem.name}</td>
            <td>{renderQuantitySelector()}</td>
            <td>{(cartItem.price * cartItem.cart_quantity).toLocaleString()}</td>
            <td>{renderDeleteButton()}</td>
        </tr>
    )
}