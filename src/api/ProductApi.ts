import axios from "axios";
import {ProductDto, ProductDetailDto} from "../data/dto/ProductDto.ts";

export async function getAllProduct():Promise<ProductDto[]>{
    const response = await axios.get<ProductDto[]>("http://localhost:8080/public/product")
    return response.data
}

export async function getProductById(pid: string): Promise<ProductDetailDto>{
    const response = await axios.get<ProductDetailDto>(`http://localhost:8080/public/product/${pid}`)
    return response.data
}