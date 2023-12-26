import {Button} from "react-bootstrap";
import "./QuantitySelector.css"


type Props = {
    quantity: number,
    handleMinus: ()=>void,
    handlePlus: ()=>void
}

export default function QuantitySelector({quantity, handleMinus, handlePlus}: Props){
    return(
        <div className={"d-flex"} id={"quantity-selector-container"}>
            <Button id={"btn-minus"} onClick={handleMinus}>
                -
            </Button>
            <div className={"d-flex justify-content-center align-items-center"} style={{
                height: "100%",
                width: "30px"
            }}>
                {quantity}
            </div>
            <Button id={"btn-plus"} onClick={handlePlus}>
                +
            </Button>
        </div>
    )
}