import React from "react"

type props = {
  userInfo: { name: string, email: string, phone: string },
  onChangeUserInfo: (userInfo: { name: string, email: string, phone: string }) => void,
}

export default function PersonalInfo({ userInfo, onChangeUserInfo }: props) {

  return (
    <div className="flex flex-col gap-12 align-middle">
      <div className="">
        <h1 className="font-semibold text-3xl ubuntu-bold">Personal info</h1>
        <p className="text-zinc-500">Please provide your name, email address, and phone number.</p>
      </div>
      <div className="flex flex-col gap-3">
        <InputField type="text" label={"Name"} inputValue={userInfo.name} onChange={(e: any) => onChangeUserInfo({ ...userInfo, name: e.target.value })} placeholder="e.g. Stephen King" />
        <InputField type="email" label={"Email Address"} inputValue={userInfo.email} onChange={(e: any) => onChangeUserInfo({ ...userInfo, email: e.target.value })} placeholder="e.g. stephenking@lorem.com" />
        <InputField type="tel" label={"Phone number"} inputValue={userInfo.phone} onChange={(e: any) => onChangeUserInfo({ ...userInfo, phone: e.target.value })} placeholder="e.g. +1 234 567 890" />
      </div>
    </div >
  )
}

function InputField({ label, inputValue, placeholder, onChange, type }: any) {

  const [emptyField, setEmptyField] = React.useState(false);
  const [focused, setFocused] = React.useState(false);
  const warning = "This field is required";

  const checkEmpty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyField(e.target.value === "");
    setFocused(false);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full flex justify-between">
        <p className="ubuntu-regular font-semibold">{label}</p>
        <p className="ubuntu-bold text-sm text-red-600">{(emptyField && !focused) && warning}</p>
      </div>
      <input
        className={`ubuntu-medium border-2 rounded-md p-3 px-4 transition-all focus:outline-none ${emptyField ? "border-red-500 " : "border-zinc-300"} focus:border-zinc-500`}
        value={inputValue}
        onChange={onChange}
        type={type}
        onBlur={checkEmpty}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
      />
    </div>
  )
}
