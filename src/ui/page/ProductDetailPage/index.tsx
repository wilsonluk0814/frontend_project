import TopNavbar from "../../component/TopNavbar.tsx";
import {useContext, useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/dto/ProductDto.ts";
import ProductDetail from "./component/ProductDetail.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as ProductApi from "../../../api/ProductApi.ts"
import Loading from "../../component/Loading.tsx";
import {LoginUserContext} from "../../../App.tsx";
import * as CartItemApi from "../../../api/CartItemApi.ts"

type Params = {
    productId: string
}

export default function ProductDetailPage(){
    const[productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined)
    const {productId} = useParams<Params>()
    const [quantity, setQuantity] = useState<number>(1)
    const loginUser = useContext(LoginUserContext)
    const navigate = useNavigate()
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false)


    const handleMinus = () => {
        if(quantity > 1){
            setQuantity((quantity)=>(
                quantity - 1
            ))
        }
    }

    const handlePlus = () => {
        if(productDetail && quantity < productDetail?.stock){
            setQuantity((quantity)=>(
                quantity + 1
            ))
        }
    }

    const handleAddToCart = async ()=>{
        if(loginUser){
            setIsAddingCart(true)
            await CartItemApi.putCartItem(productDetail!.pid, quantity);
            setIsAddingCart(false)
        }else if(loginUser === null) {
            navigate("/login")
        }
    }

    const getProductDetail = async (productId: string) =>{
        try {
            const response = await ProductApi.getProductById(productId)
            setProductDetail(response)
            document.title = response.name
        }catch (e){
            navigate("/error")
        }
    }


    useEffect(() =>{
        if(productId){
            getProductDetail(productId)
        } else {
            navigate("/error")
        }
    }, [])

    return(
        <>
            <TopNavbar/>
            {
                productDetail
                    ? <ProductDetail productDetail={productDetail}
                                     quantity={quantity}
                                     handleMinus={handleMinus}
                                     handlePlus={handlePlus}
                                     handleAddToCard={handleAddToCart}
                                     isAddingCart={isAddingCart}/>
                    : <Loading/>
            }
        </>
    )
}