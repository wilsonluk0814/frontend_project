import {Container} from "react-bootstrap"
import LoginForm from "./component/LoginForm.tsx";
import TopNavbar from "../../component/TopNavbar.tsx";
import {useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";


export default function LoginPage() {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false)
    const loginUser = useContext(LoginUserContext);
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        const loginResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email,password);
        if(loginResult){
            navigate(-1);
        }else {
            setIsLoginFailed(true)
        }
    }

    useEffect(() =>{
        if(loginUser){
            navigate("/");
        }
    },[loginUser])


    return (
        <>
            <TopNavbar/>
            <Container>
                <LoginForm email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} isLoginFailed={isLoginFailed}/>
            </Container>
        </>
    )
}