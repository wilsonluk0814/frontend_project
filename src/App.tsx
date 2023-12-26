import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProductListingPage from "./ui/page/ProductListingPage";
import ProductDetailPage from "./ui/page/ProductDetailPage";
import LoginPage from "./ui/page/LoginPage";
import {createContext, useEffect, useState} from "react";
import {UserData} from "./data/dto/UserDto.ts";
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"
import ShoppingCartPage from "./ui/page/ShoppingCartPage";
import ErrorPage from "./ui/page/ErrorPage";
import CheckoutPage from "./ui/page/CheckoutPage";
import ThankyouPage from "./ui/page/ThankyouPage";

export const LoginUserContext = createContext<UserData | null | undefined>(undefined)

function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined)

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProductListingPage/>
        },
        {
            path: "/product/:productId",
            element: <ProductDetailPage/>
        },
        {
          path: "/shoppingcart",
          element: <ShoppingCartPage/>
        },
        {
            path: "/login",
            element: <LoginPage/>
        },
        {
          path: "/checkout/:transactionId",
          element: <CheckoutPage/>
        },
        {
          path: "/thankyou",
          element: <ThankyouPage/>
        },
        {
          path: "/error",
          element: <ErrorPage/>
        }
    ])


    return (
        <>
            <LoginUserContext.Provider value={loginUser}>
                <RouterProvider router={router}/>
            </LoginUserContext.Provider>
        </>
    )
}

export default App
