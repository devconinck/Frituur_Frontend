import ProductsList from "~/components/ProductsList";

export default function Order() {
  return (
    <>
      <div className="flex items-center justify-center pt-8 text-4xl font-bold">
        Here comes all the order information and utility
      </div>
      <ProductsList />
    </>
  );
}
