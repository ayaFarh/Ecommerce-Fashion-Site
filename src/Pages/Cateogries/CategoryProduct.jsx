import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { memo } from "react";
import CustomSkeleton from "../../utilities/CustomSkeleton";
import { Img } from "react-image";
import { BsBagPlus } from "react-icons/bs";


const CategoryProduct = memo(({product}) => {
    const {price,slug, priceAfterDiscount, image, name, colors} = product;
    return (
        <Link to={`/${slug}`}
            state={{productId : product._id}}
            className="product pb-2 trans xl:w-[275px] border-white border hover:border-black hover:z-40  cursor-pointer">
            
            <div className="image-container relative">
                {/* h-[397px] */}
                <div className="relative">
                    <Img src={image} alt="name" className="w-full " loader={<CustomSkeleton width="100%" height="397px" />} />
                    {price && priceAfterDiscount && priceAfterDiscount < price && <p className="bg-white text-xs absolute top-[94%] left-2  px-1 text-center">-{(Math.round((price - priceAfterDiscount) / price * 100))}%</p>}
                    <Link title="Add to cart" to="/cart" className="top-2 left-2 absolute">
                        <BsBagPlus className="text-xl font-semibold" />
                    </Link>
                    <Link title="Add to wishlist" to="/wishlist" className="top-2 right-2 absolute">
                        <CiHeart className="text-xl font-semibold" />
                    </Link>
                </div>
            </div>

            <div className="flex flex-col gap-0.5 px-2 mt-2">
                {name && <p title={name} className="title text-gray-500 text-sm">
                    {name}
                </p>}
                <div className="w-full flex justify-between items-center">
                    {
                        (priceAfterDiscount && price) && 
                        
                        (priceAfterDiscount < price) ? 
                            <div className="flex items-center gap-2">
                                {<p className="price text-gray-700 text-sm font-semibold">
                                    {priceAfterDiscount}$
                                </p>}
                                {<p className="price text-gray-400 line-through decoration-black  text-sm ">
                                    {price}$
                                </p>}
                            </div>
                        :
                            <p className="price text-gray-700 text-sm font-semibold">
                                {price}$
                            </p>
                    }
                    
                    {colors && colors.length && <div className="colors text-sm text-gray-500 font-semibold">
                        {colors?.length} {colors.length > 1 ? "colors" : "color"}
                    </div>}
                </div>
                
            </div>
        </Link>
    )
})

export default CategoryProduct