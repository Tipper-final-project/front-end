"use client";
import { useState } from "react";
import patchUser from "@/APIcalls/patchUser";

const Editfield = ({ func, value, username }) => {
  const [inputFieldData, setInputFieldData] = useState("");
  function handleInput(event) {
    setInputFieldData(event.target.value);
  }

  return (
    <form>
      <input onChange={handleInput} />
      <button
        onClick={() => {
          patchUser(username, { [value]: inputFieldData });
          func((prevstate) => !prevstate);
        }}
      >
        Save
      </button>
    </form>
  );
};

export default Editfield;
