import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { preview } from "../assets";
import { FormField, Loader } from "../components";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch(
          "https://dalle-netlify-server.netlify.app/.netlify/functions/index/api/v1/post",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );
        await response.json();
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
        navigate("/");
      }
    } else {
      alert("please enter a prompt and generate an image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    setForm({ ...form, prompt: randomPrompt });
  };
  const generateImage = async () => {
    if (form.prompt) {
      setGeneratingImg(true);
      try {
        const response = await fetch(
          "https://dalle-netlify-server.netlify.app/.netlify/functions/index/api/v1/dalle",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        console.log(error);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  return (
    <section className="max-w-7xl mx-auto pb-20">
      <div className="">
        <h1 className="font-extrabold max-w-3xl pt-20 text-[32px] text-7xl text-[#222328]">
          Create a new masterpiece
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          create imaginative and visually stunning images through DALL-E AI and
          share them with the community
        </p>
      </div>
      <form className="mt-16 flex flex-row gap-5">
        <div className="flex-1 flex flex-col gap-8">
          <FormField
            labelName="Your name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A plush toy robot sitting against a yellow wall"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <button
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            type="button"
            onClick={generateImage}
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          <div
            className="mt-10 duration-150"
            style={{
              display: form.photo ? "block" : "none",
            }}
          >
            <p className="mt-2 text-[#666e75] text-[14px]">
              ** Once you have created the image you want, you can share it with
              others in the community **
            </p>
            <button
              type="submit"
              className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={handleSubmit}
            >
              {loading ? "Sharing..." : "Share with the Community"}
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-80 p-3 h-80 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain rounded-md"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {generatingImg && (
              <div className="absolute inset-0 backdrop-blur-sm z-0 flex justify-center items-center bg-[rgba(149,149,150,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
