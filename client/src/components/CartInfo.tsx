import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { formatPrice } from "../utils/format";

export default function CartInfo() {
  const user = null;
  const { subTotal, shippingFee, tax, total } = useAppSelector(
    (state) => state.cart,
  );

  return (
    <div className="card bg-base-100 p-4 shadow-lg">
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">Cart Summary</h2>
        <div className="flex justify-between">
          <span className="">Subtotal:</span>
          <span className="font-medium">{formatPrice(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Shipping Fee:</span>
          <span className="font-medium">
            {shippingFee === 0 ? "FREE" : formatPrice(shippingFee)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="">Tax:</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between font-bold">
          <span>Total:</span>
          <span>{formatPrice(total)}</span>
        </div>
        {user ? (
          <Link to="/checkout" className="btn btn-success btn-block mt-8">
            Proceed to Checkout
          </Link>
        ) : (
          <Link to="/login" className="btn btn-success btn-block mt-8">
            Login to Checkout
          </Link>
        )}
      </div>
    </div>
  );
}
