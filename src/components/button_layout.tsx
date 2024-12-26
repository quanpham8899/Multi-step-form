import React from "react";

export default function ButtonLayout({ step, next, prev, confirm }: { step: number, next: () => void, prev: () => void, confirm: () => void }) {

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

  if (step <= 4)
    return (
      <div className={`flex ${step > 1 ? 'justify-between' : 'justify-end'} py-4 max-sm:fixed max-sm:bottom-0 max-sm:bg-zinc-200 max-sm:p-4 max-sm:w-full max-sm:left-0`}>
        {
          step > 1 &&
          <button
            onClick={prev}
            className="text-blue-900 hover:underline hover:font-bold select-none">
            Go Back
          </button>
        }
        {
          step < 4 ?
            <button
              onClick={next}
              className="border-none outline-none bg-blue-950 text-white py-3 px-7 rounded-lg transition-all duration-300 hover:bg-blue-900 active:bg-blue-950 select-none">
              Next Step
            </button> :
            <button
              onClick={confirm}
              className="border-none outline-none bg-blue-800 text-white py-3 px-7 rounded-lg transition-all duration-300 hover:bg-blue-900 active:bg-blue-950 select-none">
              Confirm
            </button>
        }
      </div >
    );
  else return (<></>)
}
