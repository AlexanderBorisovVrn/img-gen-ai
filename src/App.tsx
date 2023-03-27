import React, { FC } from "react";
import { Home, CreatePost } from "./pages";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Logo } from "./components/Logo";
/// <reference types="vite-svg-loader" />

export const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 border-b border-b-[#e6ebf4]">
        <Link to = '/' className="w-14 h-12 my-2 flex justify-center items-center bg-[#6469ff] rounded">
          <Logo />
        </Link>
        <Link to='/create-post' className="font-medium bg-[#6469ff] text-white tracking-wide rounded-md px-4 py-2">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full min-h-[calc(100vh)] bg-[#d1cece44]">
        <Routes>
          <Route path= '/' element={<Home/>}/>
          <Route path= '/create-post' element={<CreatePost/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
};
