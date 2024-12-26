import Image from "next/image";

export default function Confirm() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div>
        <div className="flex justify-center">
          <Image
            src="/icons/icon-thank-you.svg"
            width={80}
            height={80}
            alt="confirm"
          />
        </div>
        <div className="text-center p-3 px-8">
          <h1 className="ubuntu-bold text-3xl text-marine-blue py-3">Thank you!</h1>
          <p className="text-zinc-400">
            Thanks for confirming your subcription! We hope you have fun using our platform. If you ever need support, please feel free to email us at quanproghe@gmail.com.
          </p>
        </div>
      </div>
    </div>
  )
}
