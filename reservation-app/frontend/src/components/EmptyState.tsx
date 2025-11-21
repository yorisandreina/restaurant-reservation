import React from "react";
import * as Icons from "lucide-react";

interface Props {
  iconName: keyof typeof Icons;
  header?: string;
  description: string;
}

const EmptyState: React.FC<Props> = ({ iconName, header, description }) => {
  const Icon = Icons[iconName] as React.ElementType | undefined;

  return (
    <div className="flex flex-col items-center justify-center text-center">
      {Icon && <Icon className="w-14 h-14 text-gray-400 mb-4" />}

      {header && (
        <h2 className="text-xl font-semibold text-gray-700 mb-2">{header}</h2>
      )}

      <p className="text-gray-500 max-w-md">{description}</p>
    </div>
  );
};

export default EmptyState;
