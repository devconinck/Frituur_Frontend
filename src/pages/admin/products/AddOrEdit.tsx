import React from "react";
import { UseFormMethods, UseFormState } from "react-hook-form";
import { Product } from "../../../types";
import { Button } from "~/components/ui/button";

interface AddOrEditProps {
  product: UseFormState<Product>;
  methods: UseFormMethods<Product>;
  onSubmit: () => void;
}

const AddOrEdit: React.FC<AddOrEditProps> = ({
  product,
  methods,
  onSubmit,
}) => {
  const { register, handleSubmit } = methods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-lg bg-white p-4 shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="name"
          className="mb-2 block font-semibold text-gray-700"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name")}
          placeholder="Product Name"
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="mb-2 block font-semibold text-gray-700"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          {...register("description")}
          placeholder="Description"
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="price"
          className="mb-2 block font-semibold text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          {...register("price")}
          placeholder="Price"
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="url" className="mb-2 block font-semibold text-gray-700">
          URL
        </label>
        <input
          type="text"
          id="url"
          {...register("url")}
          placeholder="URL"
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="categoryId"
          className="mb-2 block font-semibold text-gray-700"
        >
          Category ID
        </label>
        <input
          type="number"
          id="categoryId"
          {...register("categoryId")}
          placeholder="Category ID"
          className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>
      <Button type="submit" className="" variant={"default"}>
        Save / Add Product
      </Button>
    </form>
  );
};

export default AddOrEdit;
