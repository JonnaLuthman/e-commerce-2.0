import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import { cartActionType } from "../../reducers/CartReducer";
import { Product } from "../../types/Product";
import { Link } from "react-router";
import { CartItem } from "../../types/CartItem";
import {
  CheckoutContext,
  checkoutPhases,
} from "../../contexts/CheckoutContext";

export const Cart = () => {
  const { cart, cartDispatch } = useContext(CartContext);
  const { phase, setPhase } = useContext(CheckoutContext);
  console.log(phase);

  const handleChangeQuantity = (product: Product, quantity: number) => {
    cartDispatch({
      type: cartActionType.CHANGE_QUANTITY,
      payload: { product, quantity },
    });
  };

  const handleRemoveFromCart = (product: Product) => {
    cartDispatch({
      type: cartActionType.REMOVE_ITEM,
      payload: product,
    });
  };

  const handleResetCart = () => {
    cartDispatch({
      type: cartActionType.RESET_CART,
      payload: null,
    });
  };

  const totalSum = cart.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );
  return (
    <section className="h-screen py-12 sm:py-16 lg:py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <h2 className="text-2xl font-semibold">Cart</h2>
        </div>
        {totalSum === 0 ? (
          <div>
            <p>Your bag is empty</p>
            <Link to={"/"}>
              <button className="items-center justify-center rounded-lg text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 my-6">Find our products here</button>
            </Link>
          </div>
        ) : (

          <div className="mx-auto mt-8 max-w-2xl md:mt-12">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  {cart.map((cartItem: CartItem) => (
                    <ul className="-my-8">
                      <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                        <div className="shrink-0">
                          <img
                            className="h-24 w-24 max-w-full rounded-lg object-cover"
                            src={cartItem.product.image}
                            alt=""
                          />
                        </div>

                        <div className="relative flex flex-1 flex-col justify-between">
                          <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                            <div className="pr-8 sm:pr-5">
                              <p className="text-base font-semibold text-gray-900">
                                {cartItem.product.name}
                              </p>
                            </div>

                            <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                              <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                                {cartItem.product.price} sek
                              </p>

                              <div className="sm:order-1">
                                <div className="mx-auto flex h-8 items-stretch text-gray-600">
                                  <button
                                    onClick={() =>
                                      cartItem.product.id !== null &&
                                      handleChangeQuantity(cartItem.product, -1)
                                    }
                                    className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    -
                                  </button>
                                  <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                    {cartItem.quantity}
                                  </div>
                                  <button
                                    onClick={() =>
                                      cartItem.product.id !== null &&
                                      handleChangeQuantity(cartItem.product, 1)
                                    }
                                    className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                            <button
                              onClick={() =>
                                handleRemoveFromCart(cartItem.product)
                              }
                              type="button"
                              className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M6 18L18 6M6 6l12 12"
                                  className=""
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>

                    // <div key={cartItem.product.id} className="cart-wrapper">
                    //   <h3>{cartItem.product.name}</h3>
                    //   <div className="cart-item">
                    //     <button
                    //       onClick={() =>
                    //         cartItem.product.id !== null &&
                    //         handleChangeQuantity(cartItem.product, 1)
                    //       }
                    //     >
                    //       +
                    //     </button>
                    //     <p>x {cartItem.quantity}</p>
                    //     <button
                    //       onClick={() =>
                    //         cartItem.product.id !== null &&
                    //         handleChangeQuantity(cartItem.product, -1)
                    //       }
                    //     >
                    //       -
                    //     </button>
                    //     <p>{cartItem.product.price} sek</p>
                    //     <button
                    //       onClick={() => handleRemoveFromCart(cartItem.product)}
                    //       className="bg-red-700 text-white"
                    //     >
                    //       Remove
                    //     </button>
                    //   </div>
                    // </div>
                  ))}

                  <button onClick={handleResetCart}>Reset Cart</button>

                  <div>
                    {/* <h3>Bag total</h3> */}
                    <div className="mt-6 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Total</p>
                      <p className="text-2xl font-semibold text-gray-900">
                        <span className="text-xs font-normal text-gray-400">
                          sek
                        </span>{" "}
                        {totalSum}
                      </p>
                    </div>
                    {/* <p>Total: {totalSum} kr</p> */}
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setPhase(checkoutPhases.second)}
                      type="button"
                      className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                    >
                      Checkout
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* <button onClick={() => setPhase(checkoutPhases.second)}>
                Checkout
              </button> */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
