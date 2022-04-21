import { useState, useContext } from "react";
import styled from "styled-components";
import { lighten } from "polished";
import { CartContextProvider } from "../context/CartContext";
import { getTheme } from "../theming";

export const Product = function ({ className, product }) {
  const [stock, setStock] = useState(product.stock);
  const { setCartUpdated } = useContext(CartContextProvider);

  /**
   * Handle click on + and - buttons.
   * @param productId
   * @param amount
   * @returns {Promise<void>}
   */
  async function handleClick(productId, amount) {
    const fetchInit = {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    // Add or remove to cart.
    await fetch("/api/cart/add", {
      ...fetchInit,
      body: JSON.stringify({
        product_id: productId,
        quantity: amount,
      }),
    });

    // Getting new product stock
    const response = await fetch("/api/product/stock", {
      ...fetchInit,
      body: JSON.stringify({
        product_id: productId,
      }),
    });
    const data = await response.json();
    setStock(data.stock);
    setCartUpdated(true);
  }

  return (
    <ProductContainer>
      <ProductImage>
        <img src={"/uploads/" + product.image} alt="" />
      </ProductImage>
      <ProductContent>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductFooter>
          <div>
            <ProductStock>
              En stock: <span>{stock}</span>
            </ProductStock>
            <QuantitySelector stockValue={stock}>
              <MinusButton onClick={() => handleClick(product.id, -1)} />
              <PlusButton onClick={() => handleClick(product.id, 1)} />
            </QuantitySelector>
          </div>

          <ProductPrice>${product.price}</ProductPrice>
        </ProductFooter>
      </ProductContent>
    </ProductContainer>
  );
};

export const QuantitySelector = styled.div`
  background-color: ${({ stockValue }) =>
    stockValue === 0 ? "#e3e3e3" : "unset"};
  display: flex;
  justify-content: space-between;
  width: 63px;
  border: 2px solid #e3e3e3;
  border-radius: 8px;
  padding: 5px;
`;

export const ProductContainer = styled.div`
  background-color: ${({ theme }) => theme.components.background};
  color: ${({ theme }) => theme.components.textColor};
  border-radius: 4px;
  min-width: 700px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 20px;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.7);
  margin: 15px 0 0;
`;

export const ProductImage = styled.div`
  margin-right: 20px;
`;

export const ProductContent = styled.div`
  width: 100%;
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ProductName = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const ProductDescription = styled.p`
  font-size: 13px;
  font-weight: normal;
`;

export const ProductPrice = styled.span`
  font-weight: bold;
`;

export const ProductStock = styled.div`
  margin: 2px;
  font-size: 12px;
  font-weight: bold;
`;

export const MinusButton = styled.button`
  &::before {
    content: "-";
  }
  &:hover {
    background-color: ${lighten(0.05, "#E3E3E3")};
  }
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: none;
  color: #545454;
  background-color: #e3e3e3;
`;

export const PlusButton = styled(MinusButton)`
  &::before {
    content: "+";
  }
  &:hover {
    background-color: ${lighten(0.1, "rgba(0, 0, 255, 0.91)")};
  }
  color: #f9f9fa;
  background-color: rgba(0, 0, 255, 0.91);
`;
