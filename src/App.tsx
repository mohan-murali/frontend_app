import { useEffect, useState } from "react";
import "./App.css";
import { AddProductForm } from "./components/AddProductForm";
import { EditProductForm } from "./components/EditProductForm";
import { Navbar } from "./components/Navbar";
import { Product } from "./components/Product";

export interface productInt {
  name: string;
  description: string;
  canExpire: boolean;
  expiryDate?: string;
  category: string;
  price: string;
  isSpecial: boolean;
}

const products = [
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
  const [productList, setProductList] = useState<productInt[]>(products);
  const [categories, setCategories] = useState<categoryItem[]>([]);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [showEditProduct, setShowEditProduct] = useState<boolean>(false);
  const [product, setProduct] = useState<productInt>();

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
  }, [productList, setCategories]);

  const showProductForm = (visibility: boolean) =>
    setShowAddProduct(visibility);

  const showEditProductForm = (visibility: boolean) =>
    setShowEditProduct(visibility);

  const addProduct = (product: productInt) => {
    setProductList([...productList, product]);
    setShowAddProduct(false);
  };

  const onProductAddClick = () => {
    setShowAddProduct(true);
  };

  const onEditClick = (product: productInt) => {
    setProduct(product);
    setShowEditProduct(true);
  };

  const onDeleteClick = (name: string) => {
    const deletedList = productList.filter((p) => p.name !== name);
    setProductList(deletedList);
  };

  const updateProduct = (product: productInt) => {
    const updatedProductList = productList.map((p) => {
      if (p.name === product.name) {
        p.canExpire = product.canExpire;
        p.category = product.category;
        p.description = product.description;
        p.expiryDate = product.expiryDate;
        p.isSpecial = product.isSpecial;
        p.price = product.price;
      }

      return p;
    });

    setProductList(updatedProductList);
  };

  const onFilter = (filterCategories: categoryItem[]) => {
    const filteredProducts = products.filter((p) =>
      filterCategories.length > 0
        ? filterCategories.map((x: categoryItem) => x.code).includes(p.category)
        : true
    );

    setProductList(filteredProducts);
  };

  return (
    <>
      <Navbar
        filterItems={categories}
        onAdd={onProductAddClick}
        onFilter={onFilter}
      />
      <div className="flex flex-wrap justify-content-center">
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
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
          />
        ))}
      </div>
      <AddProductForm
        visible={showAddProduct}
        setVisible={showProductForm}
        addProduct={addProduct}
      />
      <EditProductForm
        product={product}
        visible={showEditProduct}
        setVisible={showEditProductForm}
        updateProduct={updateProduct}
      />
    </>
  );
}

export default App;
