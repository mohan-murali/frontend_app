import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";
import { MultiSelect, MultiSelectChangeEvent } from "primereact/multiselect";
import { useState } from "react";
import { categoryItem } from "../App";

export interface NavbarProps {
  filterItems: categoryItem[];
  onAdd: () => void;
  onFilter: (filterCategories: categoryItem[]) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  filterItems,
  onAdd,
  onFilter,
}) => {
  const [selectedItems, setSelectedItem] = useState(null);
  const onFilterItem = (e: MultiSelectChangeEvent) => {
    console.log(e.value);
    setSelectedItem(e.value);
    onFilter(e.value);
  };

  const filterTemplate = () => {
    const items = filterItems;
    return (
      <div className="flex justify-content-center">
        <MultiSelect
          value={selectedItems}
          onChange={onFilterItem}
          options={items}
          optionLabel="name"
          placeholder="Select Filter"
          className="w-full md:w-20rem"
        />
        <Button className="ml-4" onClick={onAdd}>
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
  return <Menubar className="bg-cyan-500" model={items} />;
};
