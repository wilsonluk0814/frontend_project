import ProductCard from "./ProductCard.tsx";
import {ProductDto} from "../../../../data/dto/ProductDto.ts";

type Props = {
    products: ProductDto[]
}
export default function ProductCardContainer({products}: Props) {
    return (
        <div className={"d-flex align-items-around flex-wrap"}>
                {
                    products.map((product) => (
                        <ProductCard key={product.pid} product={product}/>
                    ))
                }
        </div>
    )
}