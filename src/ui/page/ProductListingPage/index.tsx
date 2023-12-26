import TopNavbar from "../../component/TopNavbar.tsx";
import ProductCardContainer from "./component/ProductCardContainer.tsx";
import {useEffect, useState} from "react";
import {ProductDto} from "../../../data/dto/ProductDto.ts";
import * as ProductApi from "../../../api/ProductApi.ts"
import Loading from "../../component/Loading.tsx";
import {useNavigate} from "react-router-dom";
import {Container} from "react-bootstrap";


export default function ProductListingPage() {
    const [products, setProducts] = useState<ProductDto[] | undefined>(undefined);
    const navigate = useNavigate()
    const getAllProduct = async () => {
        try {
            const response = await ProductApi.getAllProduct()
            setProducts(response)
            document.title = "Home Page"
        }catch (e){
            navigate("/error")
        }
    }

    useEffect(() => {
        getAllProduct()
    }, [])

    return (
        <>
            <TopNavbar/>
            <Container>
                {
                    products
                        ? <ProductCardContainer products={products}/>
                        : <Loading/>
                }
            </Container>
        </>
    )
}