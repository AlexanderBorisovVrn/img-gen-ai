import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IoImageOutline } from "react-icons/io5";
import { FormField } from "../components/FormField";
import { getRandomPrompt } from "../utils";
import Loader from "../components/Loader";
import { ErrorBoundary } from "../components/ErrorBoundary";


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
    setError,
    clearErrors,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onChange",
  });

  const [form, setForm] = useState<IForm>(initialFormState);
  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showShareButton,setShowShareButton]= useState<boolean>(false)

  const onSubmit = handleSubmit((data: IForm) => {
    
    setLoading(true);
    fetch('http://127.0.0.1:65355', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, photo: form.photo })
    })
      .then(data => data.status)
      .catch(e => console.log('error'))
      .finally(() => navigate('/'));
      
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.name as 'name' | 'prompt';
    errors[val] = undefined;
    setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
  };

  const handleSupriseMe = () => {
    const randomPrompt: string = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
    clearErrors('prompt')
    setValue("prompt",randomPrompt)
  };

  const handleClear = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLButtonElement;
    setForm({ ...form, [target.name]: '' })
  }
  const validateName = {
    ...register("name", { required: true, maxLength: 100 }),
  };
  const validatePrompt = {
    ...register("prompt", { required: true, maxLength: 1000, minLength: 1 }),
  };

  const generateImg = async () => {
    if (form.prompt.length === 0) {
      setError('prompt', { message: 'Prompt required' })
      return
    }
    try {
      setShowShareButton(false)
      setGeneratingImg(true);
      let response = await fetch("http://127.0.0.1:65355/creation", {
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

      if (response.status === 200) {
        const data = await response.text();
        setForm({ ...form, photo: `data:image/png;charset=UTF-8;base64,${data}` });
        setShowShareButton(true)
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
      <ErrorBoundary>
        <form className="mt-16 max-x-3xl" onSubmit={onSubmit}>
          <div className="flex flex-col gap-5">
            <FormField
              labelName="Your name"
              type="text"
              name="name"
              placeholder="<Stranger>"
              value={form.name}
              validate={validateName}
              handleClear={handleClear}
              handleChange={handleChange}
              required
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
         {showShareButton && (
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
         )}
        </form>
      </ErrorBoundary>
    </section>
  );
};

export default CreatePost;
