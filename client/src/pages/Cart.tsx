import { useAppSelector } from "../app/hooks";
import { CartInfo, CartItemsContainer, SectionTitle } from "../components";

export default function CartPage() {
  const numberOfItems = useAppSelector((state) => state.cart.numberOfItems);

  if (numberOfItems === 0) {
    return <SectionTitle text="Your cart is empty" />;
  }

  return (
    <section className="mx-auto max-w-7xl p-12 lg:p-16">
      <SectionTitle text="Your Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CartItemsContainer />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartInfo />
        </div>
      </div>
    </section>
  );
}
