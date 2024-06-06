import React from "react";
import styled from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface Props {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({type, children, size, scheme, disabled, isLoading, onClick }: Props) => {
  return (
    <ButtonStyle
      type={type}
      size={size}
      scheme={scheme}
      disabled={disabled}
      isLoading={isLoading}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<Props, "children">>`
font-size: ${({ theme, size}) => theme.button[size].fontSize};
color: ${({ theme, scheme}) => theme.buttonScheme[scheme].color};
background-color: ${({ theme, scheme}) => theme.buttonScheme[scheme].backgroundColor};
border: 0;
border-radius: ${({theme}) => theme.borderRadius.default};
opacity: ${({ disabled}) => (disabled?0.5 :  1)};
pointer-events: ${({disabled}) => (disabled? "none" : "auto")};
cursor: ${({disabled}) => (disabled? "none" : "pointer")};
`;

export default Button;
