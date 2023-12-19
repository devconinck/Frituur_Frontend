import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Category, Product } from "../types";
import { Button } from "~/components/ui/button";
import { saveProducts } from "~/api/products";
import useSWR from "swr";
import { getAllCategories } from "~/api/categories";
import LabelInput from "./LabelInput";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import Error from "./Error";
interface AddOrEditProps {
  currentProduct: {} | Product;
  setProductToUpdate: (id: number) => void;
}

const validationRules = {
  name: {
    required: "Product name is required",
    min: {
      value: 3,
      message: "Product name must be at least 3 characters long",
    },
  },
  description: {
    min: {
      value: 3,
      message: "Description must be at least 3 characters long",
    },
  },
  price: {
    valueAsNumber: true,
    required: "Price is required",
    min: {
      value: 0.5,
      message: "Price must be at least 0.5",
    },
  },
  url: {
    min: {
      value: 3,
      message: "URL must be at least 3 characters long",
    },
    max: {
      value: 50,
      message: "URL must be at most 50 characters long",
    },
  },
  categoryId: {
    required: "Category ID is required",
    min: {
      value: 0,
      message: "Category ID must be at least 0",
    },
  },
};

function CategoriesSelect({
  name,
  categories,
}: {
  name: string;
  categories: Category[];
}) {
  interface UseFormReturnWithErrors extends UseFormReturn {
    errors: Record<string, any>;
    isSubmitting: boolean;
  }

  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext() as UseFormReturnWithErrors;

  const hasError = name in errors;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Categories
      </label>
      <select
        {...register(name)}
        id={name}
        className="mt-1 w-full rounded-md border border-slate-600 p-2"
        disabled={isSubmitting}
      >
        <option defaultChecked value="">
          -- Select a categorie --
        </option>
        {categories?.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {hasError ? (
        <div className="mt-1 text-sm text-red-600">{String(errors[name])}</div>
      ) : null}
    </div>
  );
}

const AddOrEdit: React.FC<AddOrEditProps> = ({
  currentProduct,
  setProductToUpdate,
}) => {
  const { data: categories = [] } = useSWR("categories", getAllCategories);

  const methods = useForm();

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const queryClient = new QueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: saveProducts,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["adminProducts"], newProduct);
      queryClient.invalidateQueries(["adminProducts"]);
      queryClient.refetchQueries(["adminProducts"]);
    },
  });

  const onSubmit = useCallback(
    async (data: Record<string, any>) => {
      const { name, description, price, url, categoryId } = data;
      const id = (currentProduct as Product)?.id;

      mutate({
        arg: {
          id,
          name,
          description,
          price,
          url,
          categoryId: Number(categoryId),
        },
      });
    },
    [mutate, currentProduct],
  );

  useEffect(() => {
    if (
      currentProduct &&
      (Object.keys(currentProduct).length !== 0 ||
        currentProduct.constructor !== Object)
    ) {
      setValue("name", (currentProduct as Product)?.name);
      setValue("description", (currentProduct as Product)?.description);
      setValue("price", (currentProduct as Product)?.price);
      setValue("url", (currentProduct as Product)?.url);
      setValue("categoryId", (currentProduct as Product)?.categoryId);
    } else {
      reset();
    }
  }, [currentProduct, setValue, reset]);

  return (
    <>
      <h2 className="mb-2 mt-3 text-2xl font-semibold">Add products</h2>
      {/*@ts-ignore*/}
      <Error error={error} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
          <div className="mb-3">
            <LabelInput
              label="Product name"
              name="name"
              type="name"
              validationRules={validationRules.name}
            />
          </div>

          <div className="mb-3">
            <LabelInput
              label="Description"
              name="description"
              type="text"
              validationRules={validationRules.description}
            />
          </div>

          <div className="mb-3">
            <LabelInput
              label="Price"
              name="price"
              type="number"
              validationRules={validationRules.price}
            />
          </div>

          <div className="mb-3">
            <LabelInput
              label="Image Url"
              name="url"
              type="text"
              validationRules={validationRules.url}
            />
          </div>

          <div className="mb-3">
            <CategoriesSelect name="categoryId" categories={categories} />
          </div>

          <div className="">
            <div className="flex items-start gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={"destructive"}
              >
                {(currentProduct as Product)?.id
                  ? "Save product"
                  : "Add product"}
              </Button>
              <Button type="reset" variant={"secondary"}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddOrEdit;
