import { Banner as IBanner } from "@/models/banner.model";
import React, { useMemo, useState } from "react";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  banners: IBanner[];
}
const Banner = ({ banners }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const transformValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);
  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };
  const handleIndicatorClick = (index : number) => {
    setCurrentIndex(index);
  }
  return (
    <BannerStyle>
      <BannerContainerStyle $transformValue={transformValue}>
        {banners.map((item, index) => (
          <BannerItem banner={item} />
        ))}
      </BannerContainerStyle>
      <BannerButtonStyle>
        <button className="prev" onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <FaAngleRight />
        </button>
      </BannerButtonStyle>
      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span 
          className={index === currentIndex ? 'active' : ''}
          onClick={()=>handleIndicatorClick(index)}></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
};
interface BannerContainerStyleProps {
  $transformValue: number;
}

const BannerIndicatorStyle = styled.div`
position: absolute;
bottom: 10px;
left: 50%;
transform: translateX(-50%);
  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 500px;
    background-color: #ffffff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background-color: ${({theme}) => theme.color.primary};
    }
  }
`;
const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;
const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transformValue}%);
  transition: transform 0.5s ease-in-out;
`;
const BannerButtonStyle = styled.div`
button {
  border : 0;
  width: 40px;
  height: 40px;
  background : rgba(0,0,0,0.5);
  border-radius: 500px;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  svg {
    fill : #ffffff;
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
}
`;
export default Banner;
