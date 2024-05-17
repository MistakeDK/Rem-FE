import { ProductProps } from '~/config/Types'
function Product({ product }: { product: ProductProps }) {
    const { price, name, img } = product
    return (
        <div className='text-center'>
            <img src={img} />
            <span className='px-4 text-xl'>{name}</span>
            <br />
            <span className='px-4 text-lg'>{price}</span>
        </div>
    )
}
export default Product