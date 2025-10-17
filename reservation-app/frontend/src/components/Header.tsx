import React from "react";

interface Props {
  name: string;
}

const Header: React.FC<Props> = ({ name }) => (
  <header className="text-center py-6">
    <h1 className="text-3xl font-bold">{name}</h1>
  </header>
);

export default Header;
