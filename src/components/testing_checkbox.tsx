import React, { ChangeEvent } from "react";

type cbox = {
  title: string;
  checked: boolean;
};

export default function TestingCheckBox() {
  const init: cbox[] = [
    { title: "Check box 1", checked: false },
    { title: "Check box 2", checked: false },
    { title: "Check box 3", checked: false },
    { title: "Check box 4", checked: false },
    { title: "Check box 5", checked: false },
  ];

  const [checks, setChecks] = React.useState(init);

  const handleCheckChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const updatedChecks = checks.map((c, i) =>
      i === index ? { ...c, checked: event.target.checked } : c
    );
    setChecks(updatedChecks);
  };

  return (
    <div className="flex flex-col gap-3">
      {checks.map((c, i) => (
        <MyCheckBox
          key={i}
          title={c.title}
          checked={c.checked}
          onChange={handleCheckChange(i)}
        />
      ))}
    </div>
  );
}

type MyCheckBoxProps = cbox & {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function MyCheckBox({ title, checked, onChange }: MyCheckBoxProps) {
  return (
    <div className="flex gap-3 border border-zinc-400 p-3">
      <label>{title}</label>
      <input type="checkbox" checked={checked} onChange={onChange} />
    </div>
  );
}
