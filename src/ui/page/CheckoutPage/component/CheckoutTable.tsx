import {Table} from "react-bootstrap";
import CheckoutTableItem from "./CheckoutTableItem.tsx";
import {TransactionDtoItem} from "../../../../data/dto/TransactionDto.ts";

type Props = {
    itemList: TransactionDtoItem[]
}

export default function CheckoutTable({itemList}: Props){
    return(
        <>
            <Table className={"align-middle"}>
                <thead>
                <tr>
                    <th></th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {
                   itemList.map((item)=>(
                       <CheckoutTableItem item={item} key={item.tpid}/>
                   ))
                }
                </tbody>
            </Table>
        </>
    )
}