import React from "react";
import Select from "react-select";

const CustomSelect = ({ field, form }) => {
  const options = [
    { value: 1, label: "Active" },
    { value: 2, label: "non Active" },
    { value: 3, label: "blabla" },
  ];

  return (
    <div>
      <Select
        placeholder="Aktif"
        options={options}
        onChange={({ value }) => form.setFieldValue(field.name, value)}
      />
      
    </div>
  );
};

export default CustomSelect;
