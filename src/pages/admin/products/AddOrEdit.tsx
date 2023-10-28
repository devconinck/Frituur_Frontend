import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { getAll, save } from "~/pages/api";
import { Category, Product } from "~/types";
import Error from "src/components/Error";
import { Button } from "~/components/ui/button";

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
      message: "I think you made a type error, price should be less than 100",
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

const useGetAll = (url: string) => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await getAll(url);
      return data;
    },
  });
};

export default function AddOrEdit({ currentProduct, setProductToUpdate }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    isSubmitting,
  } = useForm();

  const { trigger: saveProduct, error: saveError } = useSWRMutation(
    "products",
    save,
  );

  const onSubmit = useCallback(
    async (data) => {
      const { name, description, price, category } = data;
      await saveProduct({
        name: name,
        description: description,
        price: price,
        category: category,
      });
      reset();
    },
    [reset, saveProduct],
  );

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("description", product.description);
      setValue("price", product.price);
      setValue("category", product.category);
    } else {
      reset();
    }
  }, [product, reset, setValue]);

  const { data: categories = [] } = useGetAll("categories");

  return (
    <>
      <Error error={saveError} />
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
              type="name"
              validationRules={validationRules.name}
            />
          </div>

          <div className="mb-3">
            <LabelInput
              label="Description"
              name="description"
              type="description"
              validationRules={validationRules.description}
            />
          </div>

          <div className="mb-3">
            <LabelInput
              label="Price"
              name="price"
              type="price"
              validationRules={validationRules.price}
            />
          </div>

          <div className="mb-3">
            <CategoriesSelect name="category" categories={categories} />
          </div>

          <div className="">
            <div className="">
              <Button type="submit" className="">
                {product.id ? "Save Product" : "Add Product"}
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
