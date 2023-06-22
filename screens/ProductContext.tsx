import React, { createContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
}

interface ProductContextProps {
  selectedProducts: Product[];
  addToSelectedProducts: (product: Product) => void;
  removeSelectedProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextProps | null>(null);

export const ProductProvider: React.FC = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const addToSelectedProducts = (product: Product) => {
    setSelectedProducts((prevProducts) => [...prevProducts, product]);
  };

  const removeSelectedProduct = (id: number) => {
    setSelectedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const productContextValue: ProductContextProps = {
    selectedProducts,
    addToSelectedProducts,
    removeSelectedProduct,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
