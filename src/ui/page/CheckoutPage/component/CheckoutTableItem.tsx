import {TransactionDtoItem} from "../../../../data/dto/TransactionDto.ts";

type Props = {
    item: TransactionDtoItem
}

export default function CheckoutTableItem({item}: Props){
    return(
        <>
            <tr>
                <td>
                    <div style={{
                        backgroundImage: `url(${item.product.imageUrl})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100px",
                        height: "150px"
                    }}/>
                </td>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>${item.subtotal.toLocaleString()}</td>
            </tr>
        </>
    )
}