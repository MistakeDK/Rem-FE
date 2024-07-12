import { useNavigate } from 'react-router-dom'
import { ProductProps } from '~/config/Types'
import Util from '~/util/Util'
function Product({ product, type }: { product: ProductProps, type: string }) {
    const { id, price, name, img } = product
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(`/product/${id}`)} className='flex flex-col p-1' key={id + type}>
            <img className='hover:scale-90 transition-all w-80' src={img} />
            <span>{Util.subText(name, 18)}</span>
            <span>{price.toLocaleString()}</span>
        </div>
    )
}
export default Product