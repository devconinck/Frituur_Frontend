import { NextPage } from "next";
import AdminLayout from "./layout";

const Admin: NextPage = () => {
  return (
    <>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-center text-4xl ">
            <p>Admin page</p>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Admin;
