import { useNavigate } from 'react-router-dom'
import { ProductProps } from '~/config/Types'
function Product({ product }: { product: ProductProps }) {
    const { id, price, name, img } = product
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/product/${id}`)}>
            <img src={img} className='w-80' />
            <span className='px-4 text-xl'>{name}</span>
            <br />
            <span className='px-4 text-lg'>{price}</span>
        </div>
    )
}
export default Product