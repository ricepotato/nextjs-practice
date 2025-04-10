"use client";

import { saveProfile as saveProfileAction } from "@/lib/actions";
import { useActionState, useEffect, useState } from "react";

export default function ProfileForm() {
  const [result, action, isPending] = useActionState(
    saveProfileAction,
    undefined
  );

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string[];
    email?: string[];
  }>({});

  useEffect(() => {
    if (result === undefined) {
      return;
    }

    if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
    }
  }, [result]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <form className="space-y-2" action={action}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="h-5 mt-1">
          <p className="text-xs text-red-600">{fieldErrors.name}</p>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="h-5 mt-1">
          <p className="text-xs text-red-600">{fieldErrors.email}</p>
        </div>
      </div>
      <button
        type="button"
        className="w-full flex justify-center py-2 px-4 border  border-transparent rounded-md shadow-sm cursor-pointer text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          setName("");
          setEmail("");
          setFieldErrors({});
        }}
      >
        Reset
      </button>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border  border-transparent rounded-md shadow-sm cursor-pointer text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
