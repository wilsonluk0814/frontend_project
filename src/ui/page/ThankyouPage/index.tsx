import TopNavbar from "../../component/TopNavbar.tsx";
import {Container} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function ThankyouPage(){
    const [countDown, setCountDown] = useState(5);
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(()=>{
            setCountDown((countDown)=>(
                countDown - 1
            ))
            if(countDown === 0){
                navigate("/")
            }
        }, 1000)
    }, [countDown]);

    return(
        <>
            <TopNavbar/>
            <Container>
                <h1>Thank You!</h1>
                <h2>Back to home page in {countDown} second!</h2>
            </Container>
        </>
    )
}