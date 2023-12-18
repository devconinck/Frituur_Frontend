import { Separator } from "~/components/ui/separator";
import { CategoriesListAdmin } from "~/components/CategoriesListAdmin";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "~/api/categories";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Loader from "~/components/Loader";
import { ca } from "date-fns/locale";

const queryClient = new QueryClient();

export default function Orders() {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategories(),
  });

  const categoriesAddMutation = useMutation({
    mutationKey: ["add"],
    mutationFn: async (name: string) => await createCategory({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
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
    <div className="space-y-6">
      <CategoriesListAdmin
        categories={categories || []}
        onAdd={(name: string) => handleAdd(name)}
        onDelete={(id: number) => handleDelete(id)}
      />
    </div>
  );
}
