import {Table} from "react-bootstrap";
import CartItemRow from "./CartItemRow.tsx";
import {CartItemDto} from "../../../../data/dto/CartItemDto.ts";

type Props = {
    cartItemList: CartItemDto[]
    setCartItemList: (cartItemList: CartItemDto[]) => void
    calTotalPrice: (cartItemList: CartItemDto[]) => void
}

export default function CartItemTable({cartItemList, setCartItemList, calTotalPrice}: Props) {
    return (
        <Table className={"align-middle"}>
            <thead>
            <tr>
                <th></th>
                <th>Description</th>
                <th>Amount</th>
                <th>Price</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {
                    cartItemList.map((item)=>(
                        <CartItemRow cartItem={item}
                                     carItemList={cartItemList}
                                     setCartItemList={setCartItemList}
                                     calTotalPrice={calTotalPrice}
                                     key={item.pid}/>
                    ))
                }
            </tbody>
        </Table>
    )
}