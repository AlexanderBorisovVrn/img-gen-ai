import React, { FC } from "react";
import { Home, CreatePost } from "./pages";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import {IoMdImages } from 'react-icons/io';

export const App: FC<{}> = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex justify-between items-center bg-white sm:px-8 border-b border-b-[#e6ebf4]">
        <Link to = '/' className="w-14 h-12 my-2 flex justify-center items-center bg-slate-200 rounded">
          <IoMdImages color="#464be9" size='38'/>
        </Link>
        <Link to='/create-post' className="font-medium bg-[#6469ff] text-white tracking-wide rounded-md px-4 py-2">
          Create
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full"></main>
    </BrowserRouter>
  );
};
