export default function ButtonLayout({ step, next, prev, confirm }: any) {
  return (
    <div className={`flex ${step > 1 ? 'justify-between' : 'justify-end'}`}>
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
  )
}
