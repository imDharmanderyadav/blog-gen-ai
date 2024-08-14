'use client'
import Image from "next/image";
import Header from "@/components/Header";
import React from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function Home() {
  const [prompt, setPrompt] = useState("");
const router = useRouter();
  // useEffect(()=>{},[title])

  const submitHandle = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // console.log(e.target[0].value);
    // setTitle(e.target[0].value);
    console.log(prompt)
    router.push("./blog?prompt="+prompt);
  }

  const handleChange = (e)=>{
    setPrompt(e.target.value)
    // console.log("input value "+e.target.value)
  }


  return (
    <>
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Effortlessly Generate Engaging Blog Posts with Blog-Gen-AI
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Transform your ideas into captivating blog content in seconds with our cutting-edge AI-powered blog post generator. Simply provide a prompt, and watch as our AI crafts a well-structured, SEO-friendly article tailored to your needs. Say goodbye to writer's block and hello to seamless content creation.
            </p>
          </div>
          <form className="flex lg:w-2/3 w-full flex-col mx-auto px-8 justify-center items-center gap-5 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end" onSubmit={submitHandle}>
            <div className="relative text-center flex-grow w-full">
              <label htmlFor="prompt" className="leading-7 text-sm text-gray-600">
                Write any topic here on which you want to read a blog post
              </label>
              <input
                type="text"
                id="full-name"
                name="full-name"
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button onClick ={()=>{submitHandle}} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Generate Now
            </button>
          </form>

        <h1>{prompt}</h1>

        </div>
      </section>
    </>
  );
}
