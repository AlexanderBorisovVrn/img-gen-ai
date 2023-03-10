import React, { FC } from "react";
import {GrClose} from 'react-icons/gr'

interface IFormField {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isSupriseMe?: boolean;
  handelSupriseMe?: () => void;
  handleChange: (e: { target: HTMLInputElement }) => void;
  validate?: any;
}

export const FormField: FC<IFormField> = ({
  name,
  labelName,
  type,
  value,
  placeholder,
  handleChange,
  handelSupriseMe,
  isSupriseMe,
  validate,
}) => {
  return (
    <div>
      <div className="flex item-center gap-2 mb-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSupriseMe && (
          <button
            type="button"
            onClick={handelSupriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Suprise me
          </button>
        )}
      </div>
      <div className="flex relative">
        <input
          {...validate}
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="bh-gray-50  border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
        />
     
      </div>
    </div>
  );
};
