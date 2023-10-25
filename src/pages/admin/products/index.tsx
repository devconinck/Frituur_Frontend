import { Separator } from "~/components/ui/separator";
import AdminLayout from "../layout";
import FilterOrAdd from "./filterOrAdd";
import ProductsListAdmin from "~/pages/admin/products/ProductsListAdmin";
import { useEffect, useState } from "react";
import { fetcher } from "~/pages/api";
import useSWR from "swr";
import { set } from "date-fns";
import { Product } from "~/types";

export default function Products() {
  const { data: products = [] } = useSWR<Product[]>("products", fetcher);

  const [filterOptions, setFilterOptions] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);

  function handleFilter(filterOptions: {
    name?: string;
    price?: string;
    category?: string;
  }) {
    const filtered = products.filter((product) => {
      const { name, price, category } = filterOptions;
      const nameMatch =
        !name || product.name.toLowerCase().includes(name.toLowerCase());
      const priceMatch =
        !price || (product.price && product.price === Number(price));
      const categoryMatch =
        !category || product.categoryId === Number(category);
      return nameMatch && priceMatch && categoryMatch;
    });

    setFilterOptions(filterOptions);
    setFilteredProducts(filtered);
  }

  function handleAddProduct() {
    console.log("add product");
  }

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <AdminLayout>
      <div className=" space-y-6">
        <div>
          <h3 className="text-lg font-medium">Admin Products</h3>
        </div>
        <Separator />
        <FilterOrAdd
          onFilter={handleFilter}
          filterOptions={filterOptions}
          onAddProduct={handleAddProduct}
        />
        <Separator />
        <ProductsListAdmin products={filteredProducts} />
      </div>
    </AdminLayout>
  );
}
