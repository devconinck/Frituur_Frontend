import React, { useState } from "react";
import useSWR from "swr";
import { Button } from "~/components/ui/button";
import { fetcher } from "~/pages/api";
import { Category } from "~/types";

type FilterOrAddProps = {
  onFilter: (filters: {
    name: string;
    price: string;
    category: string;
  }) => void;
  filterOptions: {};
  onAddProduct: () => void;
};

export default function FilterOrAdd({
  onFilter,
  filterOptions,
  onAddProduct,
}: FilterOrAddProps) {
  const { data: categories = [] } = useSWR("categories", fetcher);

  const [filterOption, setFilterOption] = useState(true);
  const [filters, setFilters] = useState({
    name: "",
    price: "",
    category: "",
  });

  const handleOptionChange = () => {
    setFilterOption(!filterOption);
  };

  const handleResetFilters = () => {
    setFilters({
      name: "",
      price: "",
      category: "",
    });
    onFilter(filters);
  };

  const handleFilterClick = () => {
    if (filterOption) {
      onFilter(filters);
    } else {
      onAddProduct();
    }
  };

  return (
    <div className="flex flex-col flex-wrap gap-4 p-5">
      <div className="flex justify-start gap-4">
        <Button
          variant={`${filterOption ? "default" : "ghost"}`}
          className="rounded-md p-2 text-xl uppercase "
          onClick={handleOptionChange}
        >
          filter
        </Button>
        <Button
          variant={`${filterOption ? "ghost" : "default"}`}
          className="rounded-md p-2 text-xl uppercase"
          onClick={handleOptionChange}
        >
          add new product
        </Button>
      </div>
      {filterOption && (
        <div className="flex flex-wrap items-center justify-start gap-2">
          <input
            type="text"
            placeholder="Name"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="rounded-md border p-2"
          />
          <input
            type="number"
            placeholder="Price"
            value={filters.price}
            onChange={(e) => setFilters({ ...filters, price: e.target.value })}
            className="rounded-md border p-2"
          />
          <input
            type="text"
            list="categoryOptions"
            placeholder="Category"
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="rounded-md border p-2"
          />
          <datalist id="categoryOptions" className="rounded-md border p-2">
            {categories.map((category: Category) => (
              <option key={category.name} value={category.name} />
            ))}{" "}
          </datalist>
          <Button
            variant={"destructive"}
            onClick={handleFilterClick}
            className="rounded-md p-2 "
          >
            Filter
          </Button>
          <Button
            variant={"ghost"}
            onClick={handleResetFilters}
            className="rounded-md p-2 "
          >
            Reset
          </Button>
        </div>
      )}
      {!filterOption && (
        <div className="flex w-1/2 flex-col gap-2">
          <div>
            <input
              type="text"
              placeholder="GNAMNANANA"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              className="rounded-md border p-2"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Price"
              value={filters.price}
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
              className="rounded-md border p-2"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Category"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="rounded-md border p-2"
            />
          </div>

          <Button
            variant={"destructive"}
            onClick={handleFilterClick}
            className="rounded-md p-2"
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
