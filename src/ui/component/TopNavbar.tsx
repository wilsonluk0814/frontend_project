import {Container, Form, Navbar, NavbarBrand, Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {faArrowRightFromBracket, faMagnifyingGlass, faUser, faX} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {LoginUserContext} from "../../App.tsx";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"
import ShoppingCartOffcanvas from "./ShoppingCartOffcanvas.tsx";
import "./TopNavbar.css"

export default function TopNavbar() {
    const loginUser = useContext(LoginUserContext)
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [searchVisible, setSerachVisible] = useState<boolean>(false);
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
                    {renderSearchbar()}
                    <button className={"btn"} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={"xl"}/>
                    </button>
                    <ShoppingCartOffcanvas show={show} handleClose={handleClose}/>
                    <button className={"btn"} onClick={handleShow}>
                        <FontAwesomeIcon icon={faCartShopping} size="xl"/>
                    </button>
                    <button className={"btn"} onClick={handleLogout}>
                        <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl"/>
                    </button>
                </Navbar.Brand>
            )
        } else if (loginUser === null) {
            return (
                <Navbar.Brand>
                    {renderSearchbar()}
                    <button className={"btn"} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size={"xl"}/>
                    </button>
                    <button className={"btn"}
                            onClick={() => {
                                navigate("/login")
                            }}>
                        <FontAwesomeIcon icon={faUser} size={"xl"}/>
                    </button>
                </Navbar.Brand>
            )
        } else {
            return (
                <Spinner animation="border"/>
            )
        }
    }

    const handleSearch = () => {
        setSerachVisible(!searchVisible);
    }

    const renderSearchbar = () => {
        if (searchVisible) {
            return (
                <Navbar expand="lg" style={{backgroundColor: "white", width: "100%"}} className={"justify-content-center"}>
                    <NavbarBrand>
                        {/* Search form */}
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search for products..."
                                className="me-2"
                                style={{width: "500px"}}
                                aria-label="Search"
                            />
                            <button className={"btn"}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} size={"xl"}/>
                            </button>
                            <button className={"btn"} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faX} size="xl"/>
                            </button>
                        </Form>
                    </NavbarBrand>
                </Navbar>
            );
        }
        return null;
    }


    return (
        <>
            {renderSearchbar()} {/* Render search bar based on state */}
            {!searchVisible && (
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
                            {renderLoginContainer()}
                        </Container>
                    </Navbar>
            )}
        </>
    )
}
