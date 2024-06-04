import React, { useMemo, useState } from "react";
import styled from "styled-components";
import Title from "../components/common/Title";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import Empty from "../components/common/Empty";
import { FaShoppingCart } from "react-icons/fa";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";
import { useAlert } from "../hooks/useAlert";
import { OrderSheet } from "../models/order.model";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isEmpty, carts, deleteCartItem } = useCart();
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();

  const handleCheckItem = (id: number) => {
    if (checkedItems.includes(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
    }
  };

  const handleDeleteItem = (id: number) => {
    deleteCartItem(id);
  };

  const handleOrder = () => {
    if (checkedItems.length === 0) {
        showAlert("주문할 상품을 선택해 주세요.");
        return;
    }
    const orderData : Omit<OrderSheet, "delivery"> = {
        items : checkedItems,
        totalQuantity,
        totalPrice,
        firstBookTitle: carts[0].title,
    }
    showConfirm("주문하시겠습니까?", ()=>{
        navigate("/order", {state : orderData});
})
  }

  const totalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);

  const totalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItems.includes(cart.id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItems]);
  return (
    <>
      <Title size="large">장바구니</Title>
      <CartStyle>
        {!isEmpty && (
          <>
            <div className="content">
              {carts.map((item) => (
                <CartItem
                  key={item.id}
                  cart={item}
                  checkedItems={checkedItems}
                  onCheck={handleCheckItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
            <div className="summary">
              <CartSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
              <Button onClick={handleOrder} size="large" scheme="primary">
                주문하기
              </Button>
            </div>
          </>
        )}
        {isEmpty && (
          <Empty
            title="장바구니가 비었습니다"
            icon={<FaShoppingCart />}
            description={<>장바구니를 채워보세요</>}
          />
        )}
      </CartStyle>
    </>
  );
};

const CartStyle = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  padding: 24px 0 0 0;

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;

  }
`;

export default Cart;
