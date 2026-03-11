"use client";
import React from "react";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, []);

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
      });

      // Update UI after delete
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const useredit = [
    {
      edit: <MdEdit />,
    },
    {
      delete: <MdDelete />,
    },
  ];

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/${editUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const updated = await res.json();

      setUsers(users.map((u) => (u._id === updated._id ? updated : u))); // UI update
      setEditUser(null); // edit mode band
      setForm({ name: "", email: "" }); // form clear
    } catch (err) {
      console.error(err);
    }
  };

  const [editUser, setEditUser] = useState(null); // jis user ko edit karna hai
  const [form, setForm] = useState({ name: "", email: "", description: "" });

  const handleEditClick = (user) => {
    setEditUser(user._id); // id save karo
    setForm({
      name: user.name,
      email: user.email,
      description: user.description,
    }); // purana data form me daalo
  };

  return (
    <div className="p-5 ">
      <h1 className="text-center text-2xl p-3">👨‍💻 Users List</h1>
      <ul>
        {users.map((user) => (
          <div
            key={user._id}
            className="flex border-[1px] border-zinc-200 justify-between items-center p-4"
          >
            {editUser === user._id ? (
              // 🔹 Edit Mode
              <div className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border px-2 py-1"
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border px-2 py-1"
                />
                <textarea
                  name="description"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="border px-2 py-1 max-w-[300px]"
                ></textarea>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditUser(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // 🔹 Normal Mode
              <>
                <div className="flex-col">
                  <p>{user.name}</p>
                  <h1>{user.email}</h1>
                  <h1>{user.description}</h1>
                </div>
                <div className="text-2xl flex gap-4">
                  <span
                    onClick={() => handleEditClick(user)}
                    className="cursor-pointer text-white hover:scale-110 transition"
                  >
                    <MdEdit title="Edit" />
                  </span>
                  <span
                    onClick={() => handleDelete(user._id)}
                    className="cursor-pointer text-red-400 hover:scale-110 transition"
                  >
                    <MdDelete title="Delete" />
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
