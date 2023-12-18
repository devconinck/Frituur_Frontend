import { useCallback, useState } from "react";
import { Category } from "../types";
import LabelInput from "./LabelInput";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
interface CategoriesListAdminProps {
  categories: Category[];
  onAdd: (name: string) => void;
  onDelete: (id: number) => void;
}

const validationRules = {
  name: {
    required: "Category name is required",
    min: {
      value: 3,
      message: "Category name must be at least 4 characters long",
    },
  },
};

export const CategoriesListAdmin: React.FC<CategoriesListAdminProps> = ({
  categories,
  onAdd,
  onDelete,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleAdd = useCallback(
    async (data) => {
      const { name }: string = data;
      await onAdd(name);
    },
    [onAdd],
  );

  const handleDelete = async (id: number) => {
    await onDelete(id);
  };

  return (
    <div className="mb-4 flex flex-col rounded px-8 pb-8 pt-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Categories</h2>
      <ul className="mb-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className="mb-2 flex items-center justify-between"
          >
            <span className="">{category.name}</span>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 className="cursor-pointer">Delete Product</Trash2>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this product and remove the data from your server.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDelete(category.id)}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </li>
        ))}
      </ul>
      <FormProvider
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      >
        <form onSubmit={handleSubmit(handleAdd)} className="mb-4">
          <LabelInput
            label="Category name"
            name="name"
            type="name"
            validationRules={validationRules.name}
            className="mt-1 w-full rounded-md border border-slate-600 p-2"
          />
          <Button
            type="submit"
            variant={"destructive"}
            className="rounded px-4 py-2 font-bold "
          >
            Add Category
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
