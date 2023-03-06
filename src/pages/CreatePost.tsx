import React, { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IoImageOutline } from 'react-icons/io5';

import { FormField } from "../components/FormField";
import { getRandomPrompt } from "../utils";

import Loader from "../components/Loader";
interface IForm {
  name: string;
  prompt: string;
  photo: string;
}

const CreatePost: FC<{}> = () => {
  const navigate: NavigateFunction = useNavigate();
  const [form, setForm] = useState<IForm>({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = () => { };
  const handleChange = () => { };
  const handleSupriseMe = () => { }
  const generateImg = () => { }
  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-bold text-2xl">Create</h1>
        <p className="mt-2 text-[#666e76] text-[14px]">
          Create visually stunning images through my little app
        </p>
      </div>

      <form className="mt-16 max-x-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Alex Bor"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado"
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handelSupriseMe={handleSupriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img src={form.photo} alt={form.photo} className="w-full h-full object-contain" />
            ) : (
              <IoImageOutline size={80} color='rgb(209,213,219)' />
            )}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex gap-5">
          <button
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type='button'
            onClick={generateImg}
          >{generatingImg ? 'Generating...' : "Generate"}</button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">Share whith other in the community</p>
          <button type='submit' className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center">
            {loading ? 'Sharing...' : 'Share whith the community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
