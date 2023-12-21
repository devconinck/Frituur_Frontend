import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Category, Product } from "../types";
import { Button } from "~/components/ui/button";
import { saveProducts } from "~/api/products";
import { getAllCategories } from "~/api/categories";
import LabelInput from "./LabelInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import Error from "./Error";
import Loader from "./Loader";
interface AddOrEditProps {
  currentProduct: {} | Product;
  setProductToUpdate: (id: any) => void;
}

const validationRules = {
  name: {
    validate: (value: string) => {
      if (!value) return "Product name is required";
      if (value.length < 3)
        return "Product name must be at least 3 characters long";
    },
  },
  description: {
    validate: (value: string) => {
      if (value && value.length < 3)
        return "Description must be at least 3 characters long";
    },
  },
  price: {
    validate: (value: string) => {
      const numberValue = Number(value);
      if (!value) return "Price is required";
      if (numberValue < 0.5) return "Price must be at least 0.5";
    },
  },
  url: {
    validate: (value: string) => {
      if (value && (value.length < 3 || value.length > 50))
        return "URL must be between 3 and 50 characters long";
    },
  },
  categoryId: {
    required: "Category is required",
    validate: (value: string) => {
      const numberValue = Number(value);
      if (!value || numberValue == 0) return "Category ID is required";
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
        data-cy="categorySelect"
      >
        <option value="">-- Select a categorie --</option>
        {categories?.map((category: Category) => (
          <option
            key={category.id}
            value={category.id}
            data-cy={`category-${category.id}`}
          >
            {category.name}
          </option>
        ))}
      </select>
      {hasError ? (
        <div data-cy="error">
          <p className="mt-1 text-xs text-red-500">
            {errors[name]?.message?.toString()}
          </p>
        </div>
      ) : null}
    </div>
  );
}

const AddOrEdit: React.FC<AddOrEditProps> = ({
  currentProduct,
  setProductToUpdate,
}) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminCategories"],
    queryFn: getAllCategories,
  });

  const methods = useForm();

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const saveProductMutation = useMutation({
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

      saveProductMutation.mutate({
        arg: {
          id,
          name,
          description,
          price: Number(price),
          url,
          categoryId: Number(categoryId),
        },
      });
    },
    [saveProductMutation, currentProduct],
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

  if (isLoading) return <Loader />;
  //@ts-ignore
  if (error) return <Error error={data.error} />;
  const categories = data!!;
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
              data-cy="name"
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
              type="text"
              validationRules={validationRules.price}
              data-cy="price"
            />
          </div>

          <div className="mb-3">
            <LabelInput
              label="Image Url"
              name="url"
              type="text"
              validationRules={validationRules.url}
              data-cy="url"
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
                data-cy="addProduct"
              >
                {(currentProduct as Product)?.id
                  ? "Save product"
                  : "Add product"}
              </Button>
              <Button
                type="reset"
                onClick={() => setProductToUpdate(null)}
                variant={"secondary"}
              >
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
