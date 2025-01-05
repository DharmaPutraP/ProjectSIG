import { Button } from "../components";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div className="text-center font-bold text-xl">
        Silahkan Akses Feature Admin
      </div>
      <div className="flex mt-3 gap-4">
        <Button handleClick={() => navigate("/admin/create")}>
          Create Perumahan
        </Button>
        <Button handleClick={() => navigate("/detail")}>
          Edit/Delete Perumahan
        </Button>
      </div>
    </div>
  );
};

export default Admin;
