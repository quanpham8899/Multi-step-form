'use client'

import React from "react";
import NavButton, { NavButtonProps } from "./nav_button";
import Image from "next/image";

export interface ButtonListProps {
  data: NavButtonProps[];
}

const NavigationBoard: React.FC<ButtonListProps> = ({ data }) => {
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Add event listener when component mounts
    window.addEventListener("resize", handleResize);

    // Cleanup event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`bg-purplish-blue background-desktop ${width >= 1280 ? "background-desktop" : "background-mobile"} pt-10 rounded-lg m-1 flex 
        flex-col gap-6 px-4 pr-10 
        lg:px-8 lg:pr-20 lg:min-w-72 max-xl:flex-row max-sm:p-12 max-xl:justify-center max-xl:py-20 max-xl:gap-12`}>
      {data.filter((d) => d.step < 5).map((d) => (
        <NavButton
          key={d.step}
          step={d.step}
          content={d.content}
          selected={d.selected}
          setSelected={d.setSelected} />
      ))}
    </div>
  )

}


export default NavigationBoard;
