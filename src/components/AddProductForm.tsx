/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar } from "primereact/calendar";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useReducer } from "react";
import { productInt } from "../App";

export interface AddProductFormProps {
  visible: boolean;
  setVisible: (visiblility: boolean) => void;
  addProduct: (product: productInt) => void;
}

const initialRegisterState = {
  name: "",
  nameError: "",
  description: "",
  descriptionError: "",
  category: "",
  categoryError: "",
  price: "",
  priceError: "",
  canExpire: false,
  expiryDate: "",
  expiryDateError: "",
  isSpecial: false,
};

const registerReducer = (state: any, action: any) => {
  switch (action.type) {
    case "descriptionError":
      return { ...state, descriptionError: action.error };
    case "categoryError":
      return { ...state, categoryError: action.error };
    case "nameError":
      return { ...state, nameError: action.error };
    case "priceError":
      return { ...state, priceError: action.error };
    case "expiryDateError":
      return { ...state, expiryDateError: action.error };
    case "description":
      return {
        ...state,
        description: action.description,
        descriptionError: "",
      };
    case "category":
      return { ...state, category: action.category, categoryError: "" };
    case "name":
      return { ...state, name: action.name, nameError: "" };
    case "price":
      return { ...state, price: action.price, priceError: "" };
    case "canExpire":
      return { ...state, canExpire: action.canExpire, canExpireError: "" };
    case "expiryDate":
      return { ...state, expiryDate: action.expiryDate, expiryDateError: "" };
    case "isSpecial":
      return { ...state, isSpecial: action.isSpecial };
  }
};

export const AddProductForm: React.FC<AddProductFormProps> = ({
  visible,
  setVisible,
  addProduct,
}) => {
  const [state, dispatch] = useReducer(registerReducer, initialRegisterState);
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
      addProduct({
        name: state.name,
        description: state.description,
        category: state.category,
        price: state.price,
        canExpire: state.canExpire,
        expiryDate: state.expiryDate,
        isSpecial: state.isSpecial,
      });
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
      header="Header"
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
        <div className="flex flex-column gap-2">
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
        <div className="flex flex-column gap-2">
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
        <div className="flex flex-column gap-2">
          <label htmlFor="canExpire">Can Exxpire</label>
          <Checkbox
            id="canExpire"
            onChange={onCanExpireChange}
            checked={state.canExpire}
          ></Checkbox>
        </div>
        {state.canExpire && (
          <div className="flex flex-column gap-2">
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
        <div className="flex flex-column gap-2">
          <label htmlFor="price">Price</label>
          <InputText id="price" value={state.price} onChange={onPriceChange} />
          {state.priceError && (
            <small id="price-help">{state.priceError}</small>
          )}
        </div>
        <div className="flex flex-column gap-2">
          <label htmlFor="special">Special</label>
          <Checkbox
            id="special"
            onChange={onIsSpecialChange}
            checked={state.isSpecial}
          ></Checkbox>
        </div>
      </form>
    </Dialog>
  );
};
