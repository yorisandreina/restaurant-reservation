import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-gray-400 mb-2">404</p>
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-500 mb-6">
          La página que estás buscando no existe, fue movida o el enlace no es
          válido.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
