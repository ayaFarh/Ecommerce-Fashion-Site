import { memo, useState } from "react";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { Img } from "react-image";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux Toolkit/slices/cartSlice";
import {
  addToWhishList,
  getUserWhishList,
} from "../Redux Toolkit/slices/WishlistSlice";
import CustomSkeleton from "../utilities/CustomSkeleton";
import { showToast } from "../utilities/showToast";
import useVisible from "../Auth/utils/usevisable";
import Login from "../Auth/login/Login";
import { FaCartShopping } from "react-icons/fa6";

const ProductCard = memo(({ product, showDiscount = true }) => {
  const navigate = useNavigate();
  const {
    price,
    slug,
    priceAfterDiscount,
    SubCategory,
    image,
    name,
    colors,
    stock,
  } = product;

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishListSlice);

  const productInCart = cartItems.find((item) => item.product === product._id);
  const productInWishlist = wishListItems.find(
    (item) => item._id === product._id
  );
  const [showModel, setShowModel] = useVisible();
 

  const handleAddToWishlist = async (id) => {
    if (isAuthenticated) {
      const wishlist = localStorage.getItem("wishlist");
      localStorage.setItem("wishlist", wishlist + 1);
      await dispatch(addToWhishList({ id,quantity: 1 }))
      // dispatch(getUserWhishList())
        .unwrap()
        .catch((err) => {
          localStorage.setItem("wishlist", wishlist - 1);
          showToast("error", "Failed to add to wishlist");
        });
       
    } else {
      showToast("error", "Please login first");
      setShowModel("login");
    }
  };
  
  const handleAddToCart = async (id) => {
    if (isAuthenticated) {
      const cart = localStorage.getItem("cart");
      localStorage.setItem("cart", cart + 1);
      await dispatch(addToCart({ id, quantity: 1 }))
        .unwrap()
        .catch((err) => {
          localStorage.setItem("cart", cart - 1);
          showToast("error", "Failed to add to cart");
        });
    } else {
      showToast("error", "Please login first");
      setShowModel("login");
    }
  };

  const handleNavigate = () => {
    navigate(`/product/${SubCategory}/${product._id}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className={`border border-white cursor-pointer hover:border-black  pb-2 product trans xl:w-[275px] 
        `}
      // ${stock === 0 ? "opacity-50 pointer-events-none" : ""}
    >
      {showModel === "login" ? <Login setShowModel={setShowModel} /> : null}
      <div className="image-container relative">
        <div className="relative">
          <Img
            src={image}
            alt={name}
            className="w-full h-[397px] object-fill"
            loader={
              <div className="w-full">
                <CustomSkeleton width="100%" height="397px" />
              </div>
            }
          />
          {showDiscount &&
            price &&
            priceAfterDiscount &&
            priceAfterDiscount < price && (
              <p className="bg-white text-center text-xs absolute left-2 px-1 top-[94%]">
                -{Math.round(((price - priceAfterDiscount) / price) * 100)}%
              </p>
            )}

          {stock === 0 && (
            <div className="absolute left-2 top-2 bg-red-700 text-white font-bold px-3 py-1 shadow-md">
              <h1>Out of stock</h1>
            </div>
          )}

          <div
            title="Add to cart"
            className={`absolute left-2 top-2.5 ${stock === 0 ? "hidden" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product._id);
            }}
          >
            {productInCart && productInCart.quantity > 0 && (
              <div className="bg-[#f8f8f8] rounded-full text-center text-xs absolute left-3 px-1.5  -top-[25%]">
                {productInCart.quantity}
              </div>
            )}
            <FaCartShopping className="text-[25px] font-semibold  trans" />
          </div>
          <div
            title="Add to wishlist"
            onClick={(e) => {
              e.stopPropagation();
              if (productInWishlist) return;
              handleAddToWishlist(product._id);
            }}
            className={`absolute right-2 top-2 ${stock === 0 ? "hidden" : ""}`}
          >
            {productInWishlist ? (
              <FaHeart className="text-[25px] font-semibold  trans" />
            ) : (
              <FaRegHeart className="text-[25px] font-semibold  trans" />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 mt-2 px-2">
        {name && (
          <p title={name} className="text-gray-500 text-sm title">
            {name}
          </p>
        )}
        <div className="flex justify-between w-full items-center">
          {showDiscount &&
          priceAfterDiscount &&
          price &&
          priceAfterDiscount < price ? (
            <div className="flex gap-2 items-center">
              <p className="text-gray-700 text-sm font-semibold price">
                {priceAfterDiscount}$
              </p>
              <p className="text-gray-400 text-sm decoration-black line-through price">
                {price}$
              </p>
            </div>
          ) : (
            <p className="text-gray-700 text-sm font-semibold price">
              {price}$
            </p>
          )}

          {colors && colors.length && (
            <div
              className={`colors text-gray-500 text-sm font-semibold ${
                stock === 0 ? "hidden" : ""
              }`}
            >
              {colors.length} {colors.length > 1 ? "colors" : "color"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
