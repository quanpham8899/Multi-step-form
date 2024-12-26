'use client'

import React from "react";

export interface NavButtonProps {
  step: number;
  content: string;
  selected: boolean;
  setSelected: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ step, content, selected, setSelected }) => {
  const [hover, setHover] = React.useState(false);
  const [width, setWidth] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      // Add event listener when component mounts
      window.addEventListener("resize", handleResize);

      // Cleanup event listener when component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  function handleClick() {
    setSelected();
  }

  return (
    <div className="flex gap-5 text-white pb-3 cursor-pointer max-xl:gap-2 transition-all duration-300 max-sm:-translate-y-6"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div
        className={
          `translate-y-1.5 ubuntu-bold blue w-8 h-8 rounded-full flex items-center justify-center border-2 trasition-all duration-300 backdrop-blur-sm
          ${!hover ? 'scale-100' : 'scale-125'}
          ${selected ? 'bg-light-blue text-black font-bold' : 'bg-purplist-blue text-white font-normal'}`
        }>
        {step}
      </div>
      {((width !== null && width > 800) || (width === null)) &&
        <div className={`flex flex-col transition-all duration-300 ${hover ? 'translate-x-2' : 'translate-x-0'}`}>
          <div>STEP {step}</div>
          <div className="font-bold">
            {content}
          </div >
        </div >
      }
    </div >
  )
}


export default NavButton;
