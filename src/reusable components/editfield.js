"use client";
import { useState } from "react";
import patchUser from "@/APIcalls/patchUser";
import { findUserName } from "@/APIcalls/getuser";

const Editfield = ({
  func,
  func2,
  setChangingUserName,
  setUsernameTaken,
  value,
  username,
}) => {
  const [inputFieldData, setInputFieldData] = useState("");
  function handleInput(event) {
    setInputFieldData(event.target.value);
  }

  return (
    <form>
      <div className="edit-field">
        <input onChange={handleInput} minLength={4} className="input-field"/>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            if (inputFieldData.length !== 0 && /\w/gi.test(inputFieldData)) {
              if (value === "username") {
                if (inputFieldData.length < 4) return; // how does this even work ??
                setChangingUserName(true);
                findUserName(inputFieldData).then((result) => {
                  if (!result) {
                    func2((prevState) => {
                      prevState[value] = inputFieldData;
                      return prevState;
                    });
                    patchUser(username, { [value]: inputFieldData });
                  } else setUsernameTaken(true);
                  setChangingUserName(false);
                });
              } else {
                func2((prevState) => {
                  prevState[value] = inputFieldData;
                  return prevState;
                });
                patchUser(username, { [value]: inputFieldData });
              }
            }
            func((prevstate) => !prevstate);
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Editfield;
