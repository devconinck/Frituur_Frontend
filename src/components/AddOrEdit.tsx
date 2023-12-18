import React, { useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Category, Product } from "../types";
import { Button } from "~/components/ui/button";
import { saveProducts } from "~/api/products";
import useSWR from "swr";
import { getAllCategories } from "~/api/categories";
import { mutate } from "swr";
import LabelInput from "./LabelInput";
import { QueryClient, useMutation } from "@tanstack/react-query";
interface AddOrEditProps {
  currentProduct: Product;
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
    /* min: {
      value: 3,
      message: "URL must be at least 3 characters long",
    }, */
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
  const { register, errors, isSubmitting } = useFormContext();

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
        <div className="mt-1 text-sm text-red-600">{errors[name]}</div>
      ) : null}
    </div>
  );
}

const AddOrEdit: React.FC<AddOrEditProps> = ({
  currentProduct,
  setProductToUpdate,
}) => {
  const { data: categories = [] } = useSWR("categories", getAllCategories);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    isSubmitting,
  } = useForm();

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
    async (data) => {
      const { name, description, price, url, categoryId } = data;
      const id = currentProduct.id || null;

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
    [reset, saveProducts, currentProduct],
  );

  /* await saveProducts({
        arg: {
          id,
          name,
          description,
          price,
          url,
          categoryId: Number(categoryId),
        },
      });
      if (id) {
        mutate(`localhost:8080/products/${id}`);
      } else {
        mutate("localhost:8080/products");
      } 
      setProductToUpdate(null);
    },
    [reset, saveProducts, currentProduct],
  );*/

  useEffect(() => {
    if (
      currentProduct &&
      (Object.keys(currentProduct).length !== 0 ||
        currentProduct.constructor !== Object)
    ) {
      setValue("name", currentProduct.name);
      setValue("description", currentProduct.description);
      setValue("price", currentProduct.price);
      setValue("url", currentProduct.url);
      setValue("categoryId", currentProduct.categoryId);
    } else {
      reset();
    }
  }, [currentProduct, setValue, reset]);

  return (
    <>
      <h2 className="mb-2 mt-3 text-2xl font-semibold">Add products</h2>

      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        isSubmitting={isSubmitting}
      >
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

          <div className="clearfix">
            <div className="btn-group float-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant={"destructive"}
              >
                {currentProduct?.id ? "Save product" : "Add product"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddOrEdit;
