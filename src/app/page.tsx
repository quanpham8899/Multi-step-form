'use client'

import NavigationBoard from '@/components/navigation_board'
import { NavButtonProps } from "@/components/nav_button";
import React, { ChangeEvent } from "react";
import PersonalInfo from '@/components/personal_info';
import PlanSelection, { paymentProps } from '@/components/select_your_plan';
import ButtonLayout from '@/components/button_layout';
import AddOn, { AddOnProps } from '@/components/pick_add_on';
import Summary from '@/components/summary';
import Confirm from '@/components/confirm';

export enum PaymentMethod {
  Monthly,
  Yearly,
}

export default function Home() {

  const [confirmed, setConfirmed] = React.useState(false);

  const navButtons: (NavButtonProps)[] = [
    { step: 1, content: 'YOUR INFO', selected: true, setSelected: () => { onClicked(1) } },
    { step: 2, content: 'SELECT PLAN', selected: false, setSelected: () => { onClicked(2) } },
    { step: 3, content: 'ADD-ONS', selected: false, setSelected: () => { onClicked(3) } },
    { step: 4, content: 'SUMMARY', selected: false, setSelected: () => { onClicked(4) } },
    { step: 5, content: 'CONFIRM', selected: false, setSelected: () => { onClicked(5) } },
  ];

  const payment: paymentProps[] = [
    { selectedIndex: 0, selected: true, title: "Arcade", iconPath: "/icons/icon-arcade.svg", price: 9, onSelected: () => onPlanSelected(0) },
    { selectedIndex: 1, selected: false, title: "Advance", iconPath: "/icons/icon-advanced.svg", price: 12, onSelected: () => onPlanSelected(1) },
    { selectedIndex: 2, selected: false, title: "Pro", iconPath: "/icons/icon-pro.svg", price: 15, onSelected: () => onPlanSelected(2) },
  ];

  const addon: AddOnProps[] = [
    { title: "Online service", description: "Access to multiplayer games", price: 1, selected: 'off', },
    { title: "Larger storage", description: "Extra 1TB of cloud save", price: 2, selected: 'off', },
    { title: "Customizable profile", description: "Custom theme on your profile", price: 2, selected: 'off', },
  ];

  const [selectedStep, setSelectedStep] = React.useState(1);
  const [paymentMethod, setPaymentMethod] = React.useState(0);

  const [nav, setNav] = React.useState(navButtons);
  const [payments, setPayments] = React.useState(payment);
  const [addons, setAddons] = React.useState(addon);

  const [userInfo, setUserInfo] = React.useState({ name: "", email: "", phone: "" });

  const [selectedPlan, setSelectedPlan] = React.useState(-1);

  // On click for the nav buttons
  function onClicked(step: number) {
    if (confirmed) {
      return;
    }
    const updated = nav.map((b) =>
      b.step === step ? { ...b, selected: true } : { ...b, selected: false }
    );
    setSelectedStep(step);
    setNav(updated);
  }

  function onPlanSelected(index: number) {
    const updated = payments.map((p) =>
      p.selectedIndex === index ? { ...p, selected: true } : { ...p, selected: false }
    );
    console.log(updated);
    setSelectedPlan(index);
    setPayments(updated);
  }

  const handleAddOnChanged = (index: number, select: string) => {
    const updated = addons.map((a, i) =>
      i === index ? { ...a, selected: select === 'on' ? 'off' : 'on' } : a
    );
    setAddons(updated)
  }

  function isNotNullOrEmptyOrWhitespace(str: string | null): boolean {
    return str !== null && str.trim() !== '';
  }

  function nextStep() {
    if (selectedStep === 4) {
      return;
    }

    if (selectedStep === 1) {
      if (!isNotNullOrEmptyOrWhitespace(userInfo.name) || !isNotNullOrEmptyOrWhitespace(userInfo.email) || !isNotNullOrEmptyOrWhitespace(userInfo.phone)) {
        alert("Please fill in all fields");
        return;
      }
    }

    onClicked(selectedStep + 1);
  }

  function prevStep() {
    onClicked(selectedStep - 1);
  }

  function onConfirm() {
    if (userInfo.name === "" || userInfo.email === "" || userInfo.phone === "") {
      alert("Please fill in all fields");
      onClicked(1);
      return;
    }

    onClicked(5);
    setConfirmed(true);
  }

  function onPaymentMethodChange() {
    setPaymentMethod(paymentMethod === 0 ? 1 : 0);
  }

  const formRenderer = () => {
    // Loop through the navigation items to find the selected item
    for (const item of nav) {
      if (item.selected) {
        switch (item.step) {
          case 1:
            return <PersonalInfo userInfo={userInfo} onChangeUserInfo={(item) => setUserInfo(item)} />;
          case 2:
            return <PlanSelection data={payments} paymentMethod={paymentMethod} onPaymentMethodChange={() => onPaymentMethodChange()} />
          case 3:
            return <AddOn props={addons} paymentMethod={paymentMethod} onChange={handleAddOnChanged} />
          case 4:
            return <Summary paymentMethod={paymentMethod} payments={payments} addons={addons} changePage={() => onClicked(2)} />;
          case 5:
            return <Confirm />
          default:
            return <>Invalid form</>;
        }
      }
    }
    // Return a fallback if no item is selected
    return <>Invalid form</>;
  };

  const summary = (): number => {
    let sum = 0;

    payments.forEach((p) => {
      sum += p.selected ? p.price : 0;
    });
    sum *= paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1;
    addons.forEach((a) => {
      sum += (a.selected ? a.price : 0) * (paymentMethod === PaymentMethod.Monthly ? 1 : paymentMethod === PaymentMethod.Yearly ? 10 : 1);
    });

    return sum;
  }

  React.useEffect(() => {
    nav.forEach((item) => {
      if (item.selected) {
        setSelectedStep(item.step);
      }
    });
  }, []);

  return (
    <div className='main-container p-4 flex justify-center w-full h-4/6 min-h-full 2xl:w-6/12 md:w-5/6 flex-col xl:flex-row max-2xl:h-5/6'>
      <NavigationBoard data={nav} />
      <div className='block flex flex-col justify-between gap-8 flex-1 mt-4 py-10 px-20 max-md:px-4 max overflow-y-auto max-sm:rounded-lg m-auto w-11/12 transition-all duration-300 max-sm:bg-zinc-100 max-sm:-mt-12 max-sm:shadow-md max-sm:mb-24'>
        {formRenderer()}
        <ButtonLayout step={selectedStep} next={() => nextStep()} prev={() => prevStep()} confirm={onConfirm} />
      </div>
    </div>
  )
}
