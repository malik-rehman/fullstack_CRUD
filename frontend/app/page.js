"use client";
import Link from "next/link";
import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
    const res = await fetch("http://localhost:5000/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // 👈 important
      },
      body: JSON.stringify(formData),
      
      
    });
    
    const data = await res.text();
    alert(data);
    setFormData({
        name: "",
        email: "",
        description: "",
      });
  };


  return (
    <div className="p-5 flex flex-col gap-5">
      <h2 className="text-center text-2xl text-green-400 uppercase">
        Add User
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-2">
        <label className="items-start w-[50%]">Name</label>
        <input
          className="border-zinc-200 border-2 w-[50%] p-2"
          type="text"
          name="name"
          placeholder="Enter Name"
          required
          value={formData.name}
          onChange={handleChange}
        />{" "}
        <label className="items-start w-[50%]">Email</label>
        <input
          className="border-zinc-200 border-2 w-[50%] p-2"
          type="email"
          name="email"
          placeholder="Enter Email"
          required
          value={formData.email}
          onChange={handleChange}
        />{" "}
        <label className="items-start w-[50%]">Description</label>

        <textarea
          name="description"
          required
          className="border-zinc-200 border-2 w-[50%] p-2"
          value={formData.description}
          placeholder="Enter Description"
          onChange={handleChange}
        ></textarea>
        <button
          className="bg-gray-600 hover:bg-gray-500 transition-all duration-200 text-center hover:text-gray-900 flex justify-between items-center p-2 rounded-full cursor-pointer font-bold w-fit"
          type="submit"
        >
          Add User
        </button>
      </form>

      <Link
        href="/Display"
        className=" uppercase bg-gray-600 hover:bg-gray-500 transition-all duration-200  hover:text-gray-900 flex justify-center items-center p-2 rounded-full cursor-pointer font-bold "
        type="submit"
      >
        View Users
      </Link>
    </div>
  );
}

export default App;

