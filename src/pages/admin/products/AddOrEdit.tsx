import React, { useEffect, useCallback } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { Category } from "~/types";
import Error from "~/components/Error";
import { Button } from "src/components/ui/button";
import { useGetAllCategories } from "~/hooks/categories";
import { useUpdateProduct } from "~/hooks/products";
import { useMutation } from "@tanstack/react-query";

const validationRules = {
  name: {
    required: "A name is required",
    minLength: { value: 3, message: "Minimum length is 3" },
  },
  price: {
    valueAsNumber: true,
    required: "A price is required",
    min: { value: 0, message: "Price must be positive" },
    max: {
      value: 100,
      message: "Price should be less than 100",
    },
  },
  category: { required: "A category is required" },
  description: {},
};

function LabelInput({ label, name, type, validationRules, ...rest }) {
  const { register, errors, isSubmitting } = useFormContext();
  const hasErrors = name in errors;

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        {...register(name, validationRules)}
        id={name}
        name={name}
        type={type}
        disabled={isSubmitting}
        {...rest}
      />
      {hasErrors ? <div>{errors[name].message}</div> : null}
    </div>
  );
}

// Custom select component for categories
function CategoriesSelect({ name, categories }) {
  const { register, errors } = useFormContext();
  const hasErrors = name in errors;

  return (
    <div>
      <label htmlFor={name}>Categories</label>
      <select {...register(name)} id={name}>
        <option value="" defaultChecked>
          -- Select a category --
        </option>
        {categories.map((category: Category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {hasErrors ? <div>{errors[name].message}</div> : null}
    </div>
  );
}

export default function AddOrEdit({ currentProduct, onSave }) {
  const product = currentProduct || {};
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    isSubmitting,
  } = useForm();

  const saveProduct = useMutation({
    mutationFn: onSave,
  });

  const onSubmit = (data) => {
    handleSave(data);
  };

  const handleSave = useCallback(
    async (data) => {
      const { name, description, price, category } = data;
      await saveProduct({
        name,
        description,
        price,
        category,
      });
      reset();
    },
    [reset, saveProduct],
  );

  useEffect(() => {
    if (product.id) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("category", product.category);
    } else {
      reset();
    }
  }, [product, reset, setValue]);

  const { data: categories = [] } = useGetAllCategories();

  return (
    <>
      <FormProvider
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
          <div className="mb-3">
            <LabelInput
              label="Product name"
              name="name"
              type="text"
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
            <CategoriesSelect name="category" categories={categories} />
          </div>

          <div className="">
            <div className="">
              <Button type="submit" onClick={handleSave} className="">
                {product.id ? "Save Product" : "Add Product"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
