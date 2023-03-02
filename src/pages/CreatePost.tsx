import React, { FC, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

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
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleSupriseMe = ()=>{}
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
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
