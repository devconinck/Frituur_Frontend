import { NextPage } from "next";
import AdminRoute from "~/components/AdminRoute";

const Admin: NextPage = () => {
  return (
    <AdminRoute>
      <div className="font space-y-6">
        <div className="flex items-center justify-center text-4xl ">
          <p>Admin page</p>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
