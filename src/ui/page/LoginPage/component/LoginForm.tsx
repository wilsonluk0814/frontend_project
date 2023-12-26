import {Badge, Button, Form} from "react-bootstrap";
import {GoogleLoginButton} from "react-social-login-buttons";
import * as FirebaseAuthService from "../../../../authService/FirebaseAuthService.ts"

type Props = {
    email: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
    password: string
    setPassword:  React.Dispatch<React.SetStateAction<string>>
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    isLoginFailed: boolean
}

export default function LoginForm({email,setEmail,password,setPassword, handleSubmit, isLoginFailed}:Props) {
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email"
                              placeholder="Enter email"
                              onChange={(event) =>{
                                    setEmail(event.currentTarget.value)
                              }}
                              value={email}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"
                              placeholder="Password"
                              onChange={(event) =>{
                                  setPassword(event.currentTarget.value)
                              }}
                              value={password}/>
            </Form.Group>
            {
                isLoginFailed &&
                <Badge className={"my-1"} style={{width: "100%"}} bg={"danger"}>Login failed</Badge>
            }
            <Button variant="primary" type="submit" style={{width: "100%"}}>
                Submit
            </Button>
            <hr/>
            <GoogleLoginButton onClick={() => {
                FirebaseAuthService.handleSignInWithGoogle()
            }} />
        </Form>
    )
}