import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";
import { ProductInt } from "../App";

export interface ProductProps {
  name: string;
  description: string;
  canExpire: boolean;
  expiryDate?: string;
  category: string;
  price: string;
  isSpecial: boolean;
  onEditClick: (product: ProductInt) => void;
  onDeleteClick: (name: string) => void;
}

export const Product: React.FC<ProductProps> = ({
  name,
  description,
  canExpire,
  expiryDate,
  category,
  price,
  isSpecial,
  onEditClick,
  onDeleteClick,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(isSpecial);
  }, [isSpecial]);

  const header = (
    <img
      alt="Card"
      src="https://primefaces.org/cdn/primereact/images/usercard.png"
    />
  );

  const editHandler = () => {
    onEditClick({
      name,
      description,
      canExpire,
      expiryDate,
      category,
      price,
      isSpecial,
    });
  };

  const footer = (
    <>
      <Button label="Edit" icon="pi pi-check" onClick={editHandler} />
      <Button
        label="Delete"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
        onClick={() => onDeleteClick(name)}
      />
    </>
  );

  return (
    <div
      className={`${
        checked ? "border-2 border-primary-500" : ""
      } card flex justify-content-center w-20rem mr-4 mt-4`}
    >
      <Card title={name} footer={footer} header={header} className="w-25rem">
        <div>{description}</div>
        <div>{canExpire ? "Can Expire" : "Doesn't Expire"}</div>
        {canExpire && expiryDate && <div>Expirey Date: {expiryDate}</div>}
        <div> category: {category}</div>
        <div>price: £{price}</div>
        <div className="flex align-items-center justify-content-center">
          <Checkbox
            id="special"
            onChange={(e) => setChecked(e.checked ?? false)}
            checked={checked}
          ></Checkbox>
          <label className="ml-2" htmlFor="special">
            Special
          </label>
        </div>
      </Card>
    </div>
  );
};
