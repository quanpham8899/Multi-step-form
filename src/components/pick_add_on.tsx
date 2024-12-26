import { PaymentMethod } from "@/app/page";
import React from "react";

export interface AddOnProps {
  title: string,
  description: string,
  price: number,
  selected: string,
}

export default function AddOn({ props, paymentMethod, onChange }: { props: AddOnProps[], paymentMethod: PaymentMethod, onChange: (index: number, select: string) => void }) {

  const getPrice = (value: number) => {
    return value * (paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1);
  }

  return (
    <div className="flex flex-col gap-12 align-middle max-sm:gap-8">
      <div className="">
        <h1 className="font-semibold text-3xl ubuntu-bold">Pick add-ons</h1>
        <p className="text-zinc-500">Add-ons help enhance your experience.</p>
      </div>
      <div className="flex flex-col gap-3">
        {
          props !== undefined && props.map((p, i) => {

            return (
              <AddOnCard key={i} index={i} title={p.title} description={p.description} price={getPrice(p.price)} selected={p.selected} onChange={onChange} />
            )
          })
        }
      </div>
    </div >
  )
}

function AddOnCard({ index, title, description, price, selected, onChange }: { index: number, title: string, description: string, price: number, selected: string, onChange: (index: number, select: string) => void }) {

  const checkboxRef = React.useRef<HTMLInputElement>(null);

  return (
    <div
      onClick={() => {
        onChange(index, selected)
      }}
      className="border border-zinc-300 rounded-md flex justify-between items-center p-5 py-4 gap-5 outline-none hover:border-blue-800 cursor-pointer">
      <input
        // disabled={true}
        ref={checkboxRef}
        // value={selected}
        checked={selected === 'on' ? true : false}
        onChange={() => {
          // console.log(index, selected);
        }}
        type="checkbox"
        className="w-5 h-5 cursor-pointer" />
      <div className="flex flex-col flex-1">
        <h1 className="ubuntu-bold select-none">{title}</h1>
        <p className="text-zinc-400 select-none">{description}</p>
      </div>
      <div className="text-marine-blue select-none">
        {`+$${price}/${price % 10 > 0 ? 'mo' : 'yr'}`}
      </div>
    </div>
  )
}
