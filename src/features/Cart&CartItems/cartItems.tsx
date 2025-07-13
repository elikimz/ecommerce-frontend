// CartPage.tsx – polished card design, no qty controls
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Spinner from "../../components/spinner";
import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  type CartResponse,
  type CartItem,
} from "../Cart&CartItems/cartitemsAPI";

/** Persist cart badge in localStorage */
const syncCartCount = (cart: CartResponse | undefined) => {
  const count = cart?.cart_items?.reduce(
    (sum: number, it: CartItem) => sum + it.quantity,
    0,
  );
  if (count) {
    localStorage.setItem("cartCount", count.toString());
    localStorage.setItem("cartItems", JSON.stringify(cart?.cart_items || []));
  } else {
    localStorage.removeItem("cartCount");
    localStorage.removeItem("cartItems");
  }
  window.dispatchEvent(new Event("cartCountUpdated"));
};

const CartPage = () => {
  const navigate = useNavigate();
  const { data: cart, isLoading, refetch } = useGetCartQuery();
  const [deleteItem] = useDeleteCartItemMutation();

  useEffect(() => {
    if (cart?.cart_items) syncCartCount(cart);
  }, [cart]);

  const removeItem = async (pid: number) => {
    const id = toast.loading("Removing item…");
    try {
      await deleteItem(pid).unwrap();
      const updatedCart = await refetch();
      syncCartCount(updatedCart.data);
      toast.success("Item removed", { id });
    } catch {
      toast.error("Failed to remove item", { id });
    }
  };

  const handleOrderNow = (item: CartItem) => {
    localStorage.setItem(
      "selectedProduct",
      JSON.stringify({ id: item.product_id, price: item.product.price }),
    );
    navigate("/order");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center h-40 items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Cart</h1>

      {cart?.cart_items?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cart.cart_items.map((item: CartItem) => (
            <div
              key={item.product_id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col"
            >
              <div className="w-full h-40 mb-4 overflow-hidden rounded-md">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="font-semibold text-lg mb-1">
                {item.product.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                KES {item.product.price.toFixed(2)} each
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Quantity: {item.quantity}
              </p>

              <p className="text-right text-orange-600 font-bold mb-4">
                Subtotal: KES {(item.quantity * item.product.price).toFixed(2)}
              </p>

              <div className="mt-auto flex gap-2">
                <button
                  onClick={() => handleOrderNow(item)}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-sm font-semibold"
                >
                  Order Now
                </button>
                <button
                  onClick={() => removeItem(item.product_id)}
                  className="w-10 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
