import { Separator } from "~/components/ui/separator";
import { CategoriesListAdmin } from "~/components/CategoriesListAdmin";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "~/api/categories";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "~/components/Loader";
import AdminRoute from "~/components/AdminRoute";

export default function Orders() {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
  });

  const categoriesAddMutation = useMutation({
    mutationKey: ["add"],
    mutationFn: async (name: string) => await createCategory({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      queryClient.refetchQueries(["categories"]);
    },
  });

  const categoriesDeleteMutation = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id: number) => await deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  if (categoriesQuery.isLoading) return <Loader />;
  if (categoriesQuery.error) return <p>Error</p>;

  const categories = categoriesQuery.data;

  const handleAdd = (name: string) => {
    categoriesAddMutation.mutate(name);
  };

  const handleDelete = (id: number) => {
    categoriesDeleteMutation.mutate(id);
  };

  return (
    <AdminRoute>
      <div className="space-y-6">
        <CategoriesListAdmin
          categories={categories || []}
          onAdd={(name: string) => handleAdd(name)}
          onDelete={(id: number) => handleDelete(id)}
        />
      </div>
    </AdminRoute>
  );
}
