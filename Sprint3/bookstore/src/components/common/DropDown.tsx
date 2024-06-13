import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ThemeSwitcher from "../header/ThemeSwitcher";

interface Props {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

interface DropDownStyleProps {
  $open: boolean;
}

const DropDown = ({ children, toggleButton, isOpen = false }: Props) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) { // 외부 클릭되었음
        setOpen(false)
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [dropdownRef]);

  return (
    <DropDownStyle $open={open} ref={dropdownRef}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>
      {open && <div className="panel">{children}</div>}
    </DropDownStyle>
  );
};

const DropDownStyle = styled.div<DropDownStyleProps>`
  position: relative;
  button {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) =>
        $open ? theme.color.primary : theme.color.text};
    }
  }
  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background: #ffffff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 10;
  }
`;

export default DropDown;
