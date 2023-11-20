/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useReducer } from "react";
import { productInt } from "../App";
import { initialRegisterState, registerReducer } from "./AddProductForm";

export interface EditProductFormProps {
  product?: productInt;
  visible: boolean;
  setVisible: (visiblility: boolean) => void;
  updateProduct: (product: productInt) => void;
}

export const EditProductForm: React.FC<EditProductFormProps> = ({
  product,
  visible,
  setVisible,
  updateProduct,
}) => {
  const [state, dispatch] = useReducer(registerReducer, initialRegisterState);
  useEffect(() => {
    dispatch({ type: "updateProduct", product });
  }, [product]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let isError = false;

    if (!state.name) {
      dispatch({ type: "nameError", error: "name is mandatory" });
      isError = true;
    }

    if (!state.description) {
      dispatch({ type: "descriptionError", error: "description is mandatory" });
      isError = true;
    }

    if (!state.category) {
      dispatch({ type: "categoryError", error: "category is mandatory" });
      isError = true;
    }

    if (!state.price) {
      dispatch({ type: "priceError", error: "price is mandatory" });
      isError = true;
    }

    if (state.canExpire && !state.expiryDate) {
      dispatch({
        type: "expiryDateError",
        error: "expiryDate is mandatory for products that expire",
      });
      isError = true;
    }

    if (!isError) {
      let formattedDate = "";
      if (state.canExpire) {
        const formatter = new Intl.DateTimeFormat("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        formattedDate = formatter.format(state.expiryDate);
        console.log(formattedDate);
      }
      updateProduct({
        name: state.name,
        description: state.description,
        category: state.category,
        price: state.price,
        canExpire: state.canExpire,
        expiryDate: formattedDate,
        isSpecial: state.isSpecial,
      });
      setVisible(false);
    }
  };
  const onNameChange = (e: any) => {
    dispatch({ type: "name", name: e.target.value });
  };
  const onDescriptionChange = (e: any) => {
    dispatch({ type: "description", description: e.target.value });
  };
  const onCategoryChange = (e: any) => {
    dispatch({ type: "category", category: e.target.value });
  };
  const onPriceChange = (e: any) => {
    dispatch({ type: "price", price: e.target.value });
  };
  const onCanExpireChange = (e: any) => {
    dispatch({ type: "canExpire", canExpire: e.checked ?? false });
  };
  const onExpiryDateChange = (e: any) => {
    dispatch({ type: "expiryDate", expiryDate: e.value });
  };
  const onIsSpecialChange = (e: any) => {
    dispatch({ type: "isSpecial", isSpecial: e.checked ?? false });
  };

  return (
    <Dialog
      header="Add new Product"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={() => setVisible(false)}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-column gap-2">
          <label htmlFor="name">Product Name</label>
          <InputText id="name" value={state.name} onChange={onNameChange} />
          {state.nameError && <small id="name-help">{state.nameError}</small>}
        </div>
        <div className="flex mt-2 flex-column gap-2">
          <label htmlFor="description">Description</label>
          <InputText
            id="description"
            value={state.description}
            onChange={onDescriptionChange}
          />
          {state.descriptionError && (
            <small id="description-help">{state.descriptionError}</small>
          )}
        </div>
        <div className="flex mt-2 flex-column gap-2">
          <label htmlFor="category">Category</label>
          <InputText
            id="category"
            value={state.category}
            onChange={onCategoryChange}
          />
          {state.categoryError && (
            <small id="category-help">{state.categoryError}</small>
          )}
        </div>
        <div className="flex align-items-center my-4 gap-2">
          <Checkbox
            id="canExpire"
            onChange={onCanExpireChange}
            checked={state.canExpire}
          ></Checkbox>
          <label htmlFor="canExpire">Can Expire</label>
        </div>
        {state.canExpire && (
          <div className="flex mt-2 flex-column gap-2">
            <label htmlFor="expiryDate">Expiry Date</label>
            <Calendar
              id="expiryDate"
              value={state.expiryDate}
              onChange={onExpiryDateChange}
              showIcon
            />
            {state.expiryDateError && (
              <small id="expiryDate-help">{state.expiryDateError}</small>
            )}
          </div>
        )}
        <div className="flex mt-2 flex-column gap-2">
          <label htmlFor="price">Price</label>
          <InputText id="price" value={state.price} onChange={onPriceChange} />
          {state.priceError && (
            <small id="price-help">{state.priceError}</small>
          )}
        </div>
        <div className="flex align-items-center mt-4 gap-2">
          <Checkbox
            id="special"
            onChange={onIsSpecialChange}
            checked={state.isSpecial}
          ></Checkbox>
          <label htmlFor="special">Special</label>
        </div>
        <Button className="mt-4" type="submit">
          Update
        </Button>
      </form>
    </Dialog>
  );
};
