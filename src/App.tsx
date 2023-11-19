import { useEffect, useState } from "react";
import "./App.css";
import { AddProductForm } from "./components/AddProductForm";
import { Navbar } from "./components/Navbar";
import { Product } from "./components/Product";

export interface productInt {
  name: string;
  description: string;
  canExpire: boolean;
  expiryDate: string;
  category: string;
  price: string;
  isSpecial: boolean;
}

const productList = [
  {
    name: "Apples",
    description: "Tessco Apples",
    canExpire: true,
    expiryDate: "14/12/2023",
    category: "Fruits",
    price: "£2",
    isSpecial: false,
  },
  {
    name: "Bannana",
    description: "Tessco Bannana",
    canExpire: true,
    expiryDate: "14/12/2023",
    category: "Fruits",
    price: "£1.5",
    isSpecial: false,
  },
  {
    name: "Table",
    description: "Wilko Dinning Table",
    canExpire: false,
    category: "Furniture",
    price: "£20",
    isSpecial: true,
  },
  {
    name: "Chicken Legs",
    description: "Aldi Chicken Legs 20 pieces pack",
    canExpire: true,
    expiryDate: "1/12/2023",
    category: "Meat",
    price: "£4",
    isSpecial: false,
  },
  {
    name: "Skimmed Milk",
    description: "Tessco Skimmed Milk",
    canExpire: true,
    expiryDate: "5/12/2023",
    category: "Dairy",
    price: "£2.2",
    isSpecial: false,
  },
  {
    name: "Choclates",
    description: "Festive Pack of Choclates",
    canExpire: true,
    expiryDate: "15/2/2024",
    category: "Choclates",
    price: "7",
    isSpecial: true,
  },
];

export interface categoryItem {
  name: string;
  code: string;
}

function App() {
  const [categories, setCategories] = useState<categoryItem[]>([]);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);

  useEffect(() => {
    const categorySet = new Set();

    for (const product of productList) {
      categorySet.add(product.category);
    }

    const uniqueCategory = [...categorySet].map((category) => ({
      name: category,
      code: category,
    })) as categoryItem[];

    setCategories(uniqueCategory);
  }, [setCategories]);

  const showProductForm = (visibility: boolean) =>
    setShowAddProduct(visibility);

  const addProduct = (product: productInt) => productList.push(product);

  const onProductAddClick = () => {
    setShowAddProduct(true);
  };

  return (
    <>
      <Navbar filterItems={categories} onAdd={onProductAddClick} />
      {productList.map((product, index) => (
        <Product
          key={`${index}_${product.name}`}
          name={product.name}
          description={product.description}
          canExpire={product.canExpire}
          expiryDate={product.expiryDate}
          category={product.category}
          price={product.price}
          isSpecial={product.isSpecial}
        />
      ))}
      <AddProductForm
        visible={showAddProduct}
        setVisible={showProductForm}
        addProduct={addProduct}
      />
    </>
  );
}

export default App;
