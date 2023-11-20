import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Checkbox } from "primereact/checkbox";
import React, { useEffect, useState } from "react";

export interface ProductProps {
  name: string;
  description: string;
  canExpire: boolean;
  expiryDate?: string;
  category: string;
  price: string;
  isSpecial: boolean;
}

export const Product: React.FC<ProductProps> = ({
  name,
  description,
  canExpire,
  expiryDate,
  category,
  price,
  isSpecial,
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

  const footer = (
    <>
      <Button label="Edit" icon="pi pi-check" />
      <Button
        label="Delete"
        severity="secondary"
        icon="pi pi-times"
        style={{ marginLeft: "0.5em" }}
      />
    </>
  );

  return (
    <div className="card flex justify-content-center w-20rem mr-4 mt-4">
      <Card title={name} footer={footer} header={header} className="w-25rem">
        <div>{description}</div>
        <div>{canExpire ? "Can Expire" : "Doesn't Expire"}</div>
        {canExpire && expiryDate && <div>{expiryDate}</div>}
        <div>{category}</div>
        <div>{price}</div>
        <Checkbox
          onChange={(e) => setChecked(e.checked ?? false)}
          checked={checked}
        ></Checkbox>
      </Card>
    </div>
  );
};
