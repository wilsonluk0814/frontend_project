import {Button, Container, Form, Navbar, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faArrowRightFromBracket, faMagnifyingGlass, faUser} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {LoginUserContext} from "../../App.tsx";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"
import ShoppingCartOffcanvas from "./ShoppingCartOffcanvas.tsx";


export default function TopNavbar() {
    const loginUser = useContext(LoginUserContext)
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLogout = async () => {
        await FirebaseAuthService.handleSignOut()
        navigate("/login")
    }

    const renderLoginContainer = () => {
        if (loginUser) {
            return (
                <Navbar.Brand className={"d-flex"}>
                    <div>{loginUser.email}</div>
                    <ShoppingCartOffcanvas show={show} handleClose={handleClose}/>
                    <button onClick={handleShow}
                            style={{border: "none",
                                    backgroundColor: "white"}}
                    >
                        <FontAwesomeIcon icon={faCartShopping} size="xl"/>
                    </button>
                    <button onClick={handleLogout}
                            style={{border: "none",
                                    backgroundColor: "white"}}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl"/>
                    </button>
                </Navbar.Brand>
            )
        } else if (loginUser === null) {
            return (
                <Navbar.Brand>
                    <Button variant="light"
                            onClick={() => {
                                navigate("/login")
                            }}>
                        <FontAwesomeIcon icon={faUser}/>
                    </Button>
                </Navbar.Brand>
            )
        } else {
            return (
                <Spinner animation="border"/>
            )
        }
    }


    return (
        <>
            <Navbar expand="lg" style={{
                backgroundColor: "white",
                width: "100%"
            }}>
                <Container fluid>
                    {/*Logo*/}
                    <Navbar.Brand onClick={() => {
                        navigate("/")
                    }}>
                        <div style={{
                            backgroundImage: `url('https://cms.cdn.91app.com/images/original/40287/5072a16c-8d06-4968-bf9b-608caeb0f3d5-1581396712-shi51lapbl_d.png')`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            width: "200px",
                            height: "200px"
                        }}>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Collapse id="navbarScroll" className={"justify-content-center w-100"}>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search for Products..."
                                className="me-2"
                                style={{width: "500px"}}
                                aria-label="Search"
                            />
                            <Button variant="light">
                                <FontAwesomeIcon icon={faMagnifyingGlass}/>
                            </Button>
                        </Form>
                    </Navbar.Collapse>
                    {renderLoginContainer()}
                </Container>
            </Navbar>
        </>
    )
}