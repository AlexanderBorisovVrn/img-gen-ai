import React, { ChangeEvent, FC, useState, SyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { FormField } from "../components/FormField";
import { getRandomPrompt } from "../utils";
import Loader from "../components/Loader";

interface IForm {
  name: string;
  prompt: string;
  photo: string;
}

const initialFormState: IForm = {
  name: "",
  prompt: "",
  photo: "",
};

const CreatePost: FC<{}> = () => {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const [form, setForm] = useState<IForm>(initialFormState);
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = handleSubmit((data: IForm) => { });
  const handleChange = (e: { target: HTMLInputElement }) => {
    const val = e.target.name as 'name' | 'prompt';
    errors[val] = undefined;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSupriseMe = () => {
    const randomPrompt: string = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;
    setForm({ ...form, [target.name]: '' })

  }
  const validateName = {
    ...register("name", { maxLength: 100}),
  };
  const validatePrompt = {
    ...register("prompt", { required: true, maxLength: 1000, minLength: 1 }),
  };

  const generateImg = async () => {
    if (errors.prompt) {
      return
    }
    try {
      setGeneratingImg(true);
      let response = await fetch("http://127.0.0.1:5000/creation", {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({
          prompt: form.prompt,
          imgCount: 1,
          size: "512x512",
        }),
      });
      const data = await response.text();

      setForm({ ...form, photo: `data:image/png;base64, ${data}` });
      if (response.status === 200) {
        const data = await response.text();
        setForm({ ...form, photo: `data:image/png;base64, ${data}` });
      } else {
        setForm(initialFormState);
      }
    } catch (error) {
      console.log("create post failed " + error);
    } finally {
      setGeneratingImg(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="">
        <h1 className="font-bold text-2xl">Create</h1>
        <p className="mt-2 text-[#666e76] text-[14px]">
          Create visually stunning images through my little app
        </p>
      </div>

      <form className="mt-16 max-x-3xl" onSubmit={onSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="Alex Bor"
            value={form.name}
            validate={validateName}
            handleClear={handleClear}
            handleChange={handleChange}
          />
          {errors.name && (
            <div className="text-red-600 text-sm">Name required</div>
          )}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder={'Type your prompt or click on the "Suprise me" button'}
            value={form.prompt}
            handleChange={handleChange}
            isSupriseMe
            handleClear={handleClear}
            handelSupriseMe={handleSupriseMe}
            validate={validatePrompt}
            required
          />
          {errors.prompt && (
            <div className="text-red-500 text-sm">Prompt required</div>
          )}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <IoImageOutline size={80} color="rgb(209,213,219)" />
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
            type="button"
            onClick={generateImg}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>
        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Share whith other in the community
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share whith the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
