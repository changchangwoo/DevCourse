import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
  title: string;
  children: React.ReactNode;
}

interface TabsProps {
  children: React.ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return <>{children}</>;
};

const Tabs = ({ children }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <TableStyle>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button onClick={()=> setActiveIndex(index)}
          className={activeIndex === index ? "active" : ""}>{tab.props.title}</button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeIndex]}
      </div>
    </TableStyle>
  );
};

const TableStyle = styled.div`
.tab-header {
    display: flex;
    gap : 2px;
    border-bottom : 1px solid #ddd;

    button {
        border: none;
        background: #ddd;
        cursor: pointer;
        font-size: 1.25rem;
        font-weight: bold;
        color: ${({theme}) => theme.color.text};
        border-radius : ${({ theme}) => theme.borderRadius.default},${({ theme}) => theme.borderRadius.default}, 0,0;
        &.active {
            color : #fff;
            background-color: ${({ theme}) => theme.color.primary};
        }
    }
    }
    .tab-content {
        padding: 24px 24px 24px 24px;
    
}
    `;

export { Tabs, Tab };
