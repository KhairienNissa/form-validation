import React, { useState } from "react";

const  Upload = (props) => {
  const [fileName, setFileName] = useState("");

  const handlePicChange = (e) => {
    console.log(e.target.files[0]);
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => setFileName(file.name);
      reader.readAsDataURL(file);
      props.setFieldValue(props.field.name, file);
    }
  };

  return (
    <form>
      <input
        name={props.field.name}
        className="border w-full"
        type="file"
        accept="image/jpg, image/jpeg"
        onChange={handlePicChange}
      />
    </form>
  );
};

export default Upload;