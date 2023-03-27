import React, { FC} from "react";

interface IFormField {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  isSupriseMe?: boolean;
  handelSupriseMe?: () => void;
  handleChange:(e:React.FormEvent<HTMLInputElement>) => void;
  validate?: any;
  required?: boolean;
  handleClear?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const FormField: FC<IFormField> = ({
  name,
  labelName,
  type,
  value,
  placeholder,
  handleChange,
  handelSupriseMe,
  handleClear,
  isSupriseMe,
  validate,
  required,
}) => {
  return (
    <div>
      <div className="flex item-center gap-2 mb-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900"
        >
          {labelName} {required ? (<span className="text-red-600">*</span>) : null}
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
      <div className="flex">
        <input
          {...validate}
          type={type}
          autoComplete="off"
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className="bh-gray-50  border-2 border-gray-300  text-gray-900 text-sm rounded-l-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block  md:w-[93%] w-[90%] p-3"
        />
        <button
          name={name}
          type="button"
          title="Clear"
          onClick={handleClear}
          className="bg-white hover:bg-[#eceaea] border-2 border-gray-300 border-l-0 rounded-r-lg flex flex-grow items-center justify-center text-gray-600 sm:text-sm text-xs"
        >
          &#10006;
        </button>
      </div>
    </div>
  );
};
