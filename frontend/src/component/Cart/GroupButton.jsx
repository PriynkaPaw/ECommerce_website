import React, { useState, useEffect } from "react";
import { ButtonGroup, Button, styled } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../slice/cartSlice";

const Component = styled(ButtonGroup)`
  margin-top: 30px;
`;

const StyledButton = styled(Button)`
  border-radius: 50%;
`;

const GroupedButton = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.addCart?.cart);
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    console.log("Getting data in Cart  =>", cart);
  }, [cart]);

  const handleIncrement = () => {
    setCounter((prevCounter) => prevCounter + 1);
    dispatch(incrementQuantity()); 
  };

  const handleDecrement = () => {
    if (counter > 1) {
      setCounter((prevCounter) => prevCounter - 1);
      dispatch(decrementQuantity());
    }
  };

  return (
    <Component>
      <StyledButton onClick={handleDecrement} disabled={counter === 1}>
        -
      </StyledButton>
      <Button disabled>{counter}</Button>
      <StyledButton onClick={handleIncrement}>+</StyledButton>
    </Component>
  );
};

export default GroupedButton;
