import CheckoutTable from "./component/CheckoutTable.tsx";
import {Button, Container} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/dto/TransactionDto.ts";
import Loading from "../../component/Loading.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts"
import {LoginUserContext} from "../../../App.tsx";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Params = {
    transactionId: string
}

export default function CheckoutPage() {
    const [transactionData, setTransactionData] = useState<TransactionDto | undefined>(undefined);
    const [isCheckouting, setIsCheckouting] = useState<boolean>(false)
    const params = useParams<Params>();
    const navigate = useNavigate()
    const loginUser = useContext(LoginUserContext);

    const getTransactionData = async () => {
        try {
            if (params.transactionId) {
                const data = await TransactionApi.getTransactionByID(params.transactionId)
                setTransactionData(data)
            } else {
                navigate("/error")
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const handleCheckout = async () => {
        try {
            if(params.transactionId){
                setIsCheckouting(true)
                await TransactionApi.payTransactionByID(params.transactionId)
                await TransactionApi.finishTransactionByID(params.transactionId)
                navigate("/thankyou")
            }
        } catch (error) {
            navigate("/error")
        }
    }

    const renderPayButton = ()=>{
        if(isCheckouting){
            return(
                <FontAwesomeIcon icon={faSpinner} spin size="2xl"/>
            )
        }else {
            return (
                <Button variant={"danger"}
                        style={{width: "100%"}}
                        onClick={handleCheckout}
                >
                    Pay
                </Button>
            )
        }
    }



    useEffect(() => {
        if (loginUser) {
            getTransactionData()
        } else if (loginUser === null) {
            navigate("/login")
        }
    }, [loginUser]);

    return (
        <>
            <Container>
                <h1>Checkout</h1>
                {
                    transactionData
                        ? (
                            <>
                                <CheckoutTable itemList={transactionData.items}></CheckoutTable>
                                <h1>Total: ${transactionData?.total}</h1>
                                {renderPayButton()}
                            </>
                        )
                        : <Loading/>
                }
            </Container>
        </>
    )
}