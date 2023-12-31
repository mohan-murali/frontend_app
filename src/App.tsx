import { useEffect, useState } from "react";
import "./App.css";
import { AddProductForm } from "./components/AddProductForm";
import { Navbar } from "./components/Navbar";
import { Product } from "./components/Product";

export interface ProductInt {
  name: string;
  description: string;
  canExpire: boolean;
  expiryDate?: string;
  category: string;
  price: string;
  isSpecial: boolean;
}

let products = [
  {
    name: "Apples",
    description: "Tessco Apples",
    canExpire: true,
    expiryDate: "12/14/2023",
    category: "Fruits",
    price: "2",
    isSpecial: false,
  },
  {
    name: "Bannana",
    description: "Tessco Bannana",
    canExpire: true,
    expiryDate: "12/7/2023",
    category: "Fruits",
    price: "1.5",
    isSpecial: false,
  },
  {
    name: "Table",
    description: "Wilko Dinning Table",
    canExpire: false,
    category: "Furniture",
    price: "20",
    isSpecial: true,
  },
  {
    name: "Chicken Legs",
    description: "Aldi Chicken Legs 20 pieces pack",
    canExpire: true,
    expiryDate: "12/1/2023",
    category: "Meat",
    price: "4",
    isSpecial: false,
  },
  {
    name: "Skimmed Milk",
    description: "Tessco Skimmed Milk",
    canExpire: true,
    expiryDate: "12/5/2023",
    category: "Dairy",
    price: "2.2",
    isSpecial: false,
  },
  {
    name: "Choclates",
    description: "Festive Pack of Choclates",
    canExpire: true,
    expiryDate: "2/15/2024",
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
  const [productList, setProductList] = useState<ProductInt[]>(products);
  const [categories, setCategories] = useState<categoryItem[]>([]);
  const [showAddProduct, setShowAddProduct] = useState<boolean>(false);
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductInt>();

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

  const showProductForm = (visibility: boolean) => {
    setShowAddProduct(visibility);
    if (!visibility) {
      setIsUpdate(false);
    }
  };

  const addProduct = (product: ProductInt) => {
    setProductList([...productList, product]);
    products.push(product);
    setShowAddProduct(false);
  };

  const onProductAddClick = () => {
    setShowAddProduct(true);
  };

  const onEditClick = (product: ProductInt) => {
    setProduct(product);
    setIsUpdate(true);
    setShowAddProduct(true);
  };

  const onDeleteClick = (name: string) => {
    const deletedList = productList.filter((p) => p.name !== name);
    products = deletedList;
    setProductList(deletedList);
  };

  const updateProduct = (product: ProductInt) => {
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
    products = updatedProductList;
    setProductList(updatedProductList);
    setIsUpdate(false);
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
        updateProduct={updateProduct}
        product={product}
        isUpdate={isUpdate}
      />
    </>
  );
}

export default App;
