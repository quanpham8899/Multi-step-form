import { PaymentMethod } from "@/app/page";
import { paymentProps } from "./select_your_plan";
import { AddOnProps } from "./pick_add_on";

export default function Summary({ payments, addons, paymentMethod, changePage }: { payments: paymentProps[], addons: AddOnProps[], paymentMethod: PaymentMethod, changePage: () => void }) {

  const method = paymentMethod === PaymentMethod.Yearly ? "yr" : "mo";
  const paymentMethodText = (paymentMethod === PaymentMethod.Yearly ? "Yearly" : "Monthly");

  const totalAmount = () => {
    let sum = 0;
    payments.forEach((p) => {
      sum += p.selected ? p.price : 0;
    });
    sum *= paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1;
    addons.forEach((a) => {
      sum += (a.selected === 'on' ? a.price : 0) * (paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1);
    });
    return sum;
  }

  const paymentPrice = () => {
    return (payments.find((p) => p.selected)?.price ?? 0) * (paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1);
  }

  const plan = () => {
    const _plan = payments.find((p) => p.selected)?.title;
    return _plan;
  }

  return (
    <div className="flex flex-col gap-12 align-middle">
      <div className="">
        <h1 className="font-semibold text-3xl ubuntu-bold">Finishing up</h1>
        <p className="text-zinc-500">Double-check evrything looks OK before confirming.</p>
      </div>
      <div>
        <div className="bg-zinc-200 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="ubuntu-bold text-marine-blue">{plan()} ({paymentMethodText})</h2>
              <p
                onClick={changePage}
                className="text-zinc-500 underline select-none cursor-pointer hover:font-bold">
                Change
              </p>
            </div>
            <p className="text-marine-blue ubuntu-bold">${paymentPrice()}/{method}</p>
          </div>
          <div className="w-11/12 h-px bg-zinc-300 m-auto my-6"></div>
          <div className="flex flex-col gap-3">
            {
              addons.filter((a) => a.selected === 'on').map((a) =>
              (
                <AddOnSummary key={a.title} title={a.title} price={a.price} paymentMethod={paymentMethod} />
              ))
            }
          </div>
        </div>
        <div className="flex justify-between p-6">
          <p className="text-zinc-500 ">Total (per {paymentMethodText.toLowerCase().slice(0, -2)})</p>
          <p className="text-purplish-blue ubuntu-bold text-lg">+${totalAmount()}/{method}</p>
        </div>
      </div>
    </div>
  )
}

function AddOnSummary({ title, price, paymentMethod }: { title: string, price: number, paymentMethod: PaymentMethod }) {

  const method = paymentMethod === PaymentMethod.Yearly ? "yr" : "mo";
  const addonPrice = price * (paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1);

  return (
    <div className="flex justify-between text-zinc-500 ">
      <p>{title}</p>
      <p>+${addonPrice}/{method}</p>
    </div>
  )
}
