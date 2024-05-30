import React, { Children } from "react";
import styled from "styled-components";
import { ColorKey } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: "large" | "medium" | "small";
  color?: ColorKey;
}
export const Title = ({ children, size, color}: Props) => {
  return <TitleStyle size={size} color={color}>{children}</TitleStyle>;
};

const TitleStyle = styled.h1<Omit<Props, "children">>`
font-size: ${({theme, size}) => theme.heading[size].fontSize};
color : ${({theme, color}) => color ? theme.color[color] : theme.color.primary};
`;

export default Title;
