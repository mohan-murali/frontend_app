import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useState } from "react";
import { categoryItem } from "../App";

export interface NavbarProps {
  filterItems: categoryItem[];
  onAdd: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ filterItems, onAdd }) => {
  const [selectedItems, setSelectedItem] = useState(null);
  const filterTemplate = () => {
    const items = filterItems;
    //       [
    //   { name: "New York", code: "NY" },
    //   { name: "Rome", code: "RM" },
    //   { name: "London", code: "LDN" },
    //   { name: "Istanbul", code: "IST" },
    //   { name: "Paris", code: "PRS" },
    // ];
    return (
      <div>
        <MultiSelect
          value={selectedItems}
          onChange={(e: MultiSelectChangeEvent) => setSelectedItem(e.value)}
          options={items}
          optionLabel="name"
          placeholder="Select Filter"
          className="w-full md:w-20rem"
        />
        <Button className="ml-10" onClick={onAdd}>
          Add New Product{" "}
        </Button>
      </div>
    );
  };

  const items = [
    {
      template: filterTemplate,
    },
  ];
  return <Menubar model={items} />;
};