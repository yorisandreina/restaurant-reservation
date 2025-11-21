import React from "react";
import {
  Card,
  CardContent,
} from "./ui/card";
import { ChevronRight, LogIn } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SettingsSection: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("businessId");
    navigate("/client-auth");
  };

  return (
    <div className="flex flex-col gap-4 items-center p-5">
      <Card
        className="w-full max-w-sm text-left py-4 cursor-pointer"
        onClick={() => navigate("/tables")}
      >
        <CardContent>
          <div className="flex flex-row justify-between items-center mb-1">
            <p>Mesas</p>
            <ChevronRight size={20} color="#5b5b5b" />
          </div>
        </CardContent>
      </Card>
      <Card
        className="w-full max-w-sm text-left py-4 cursor-pointer"
        onClick={() => navigate("/time-slots")}
      >
        <CardContent>
          <div className="flex flex-row justify-between items-center mb-1">
            <p>Horario</p>
            <ChevronRight size={20} color="#5b5b5b" />
          </div>
        </CardContent>
      </Card>
      <Card
        className="w-full max-w-sm text-left py-4 cursor-pointer"
        onClick={handleLogout}
      >
        <CardContent>
          <div className="flex flex-row justify-between items-center mb-1">
            <p>Salir</p>
            <LogIn size={20} color="#e20404" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsSection;
