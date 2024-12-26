import { PaymentMethod } from "@/app/page";
import Image from "next/image"

export interface paymentProps {
  selectedIndex: number,
  title: string,
  iconPath: string,
  price: number,
  selected: boolean,
  onSelected: () => void,
  // onSelectedIndexChange: (index: number) => void,
}

export default function PlanSelection({ data, paymentMethod, onPaymentMethodChange }: { data: paymentProps[], paymentMethod: PaymentMethod, onPaymentMethodChange: () => void }) {

  const _priceMul = paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1;

  return (
    <div className="flex flex-col gap-12 align-middle max-sm:gap-8">
      <div className="">
        <h1 className="font-semibold text-3xl ubuntu-bold">Select your plan</h1>
        <p className="text-zinc-500">You have the option of monthly or yearly billing.</p>
      </div>
      <div className="flex justify-between gap-3 flex-nowrap max-2xl:-mx-12 max-xl:flex-wrap max-xl:mx-0 max-xl:justify-center max-xl:gap-3 max-sm:flex-col max-sm:mx-0">
        {
          data !== undefined && data.map((p) => (
            <Plan key={p.selectedIndex} title={p.title} icon={p.iconPath} price={p.price * _priceMul} discount={paymentMethod === PaymentMethod.Yearly ? '2 months free' : '\u00A0'} method={paymentMethod} setSelected={p.onSelected} selected={p.selected} />
          ))
        }
      </div>
      <div className="flex justify-center gap-4 py-3 bg-zinc-200 rounded-md text-center">
        <p className={`${paymentMethod === PaymentMethod.Monthly ? 'font-bold' : 'font-normal'} w-1/6`}>Monthly</p>
        <div
          onClick={() => onPaymentMethodChange()}
          className={` w-10 bg-zinc-800 rounded-full flex items-center hover:cursor-pointer`}>
          <div className={`w-4 h-4 mx-1 bg-white rounded-full transition-all duration-300 ${paymentMethod === PaymentMethod.Monthly ? 'translate-x-0' : 'translate-x-4'}`}></div>
        </div>
        <p className={`${paymentMethod === PaymentMethod.Yearly ? 'font-bold' : 'font-normal'} w-1/6`}>Yearly</p>
      </div>
    </div >
  )
}

const Plan = ({ icon, title, price, discount, method, selected, setSelected }: any) => {

  function handleClick() {
    setSelected();
  }

  return (
    <div
      onClick={handleClick}
      className={
        `border rounded-md p-4 flex flex-col gap-8 pr-10 transition-all duration-300 hover:cursor-pointer hover:shadow-xl min-w-36 max-sm:flex-row max-sm:items-center
        ${selected ? 'shadow-zinc-400 shadow-inner bg-zinc-200' : 'border-zinc-300'}
      `}>
      <div>
        <Image
          src={icon}
          width={30}
          height={30}
          alt="icon"
        />
      </div>
      <div className="flex flex-col gap-1 transition-all duration-300 max-sm:justify-between">
        <h1 className="ubuntu-bold">{title}</h1>
        <p className="text-zinc-400">{`$${price} /${method === PaymentMethod.Monthly ? 'mo' : 'yr'} `}</p>
        <p className={`text-xs ${method === PaymentMethod.Monthly ? "max-sm:hidden" : ""}`}>{discount}</p>
      </div>
    </div >
  )
}
