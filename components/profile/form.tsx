"use client";

import { saveProfile as saveProfileAction } from "@/lib/actions";
import { useActionState } from "react";

export default function ProfileForm() {
  const [result, action, isPending] = useActionState(
    saveProfileAction,
    undefined
  );

  return (
    <form className="space-y-6" action={action}>
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
        />
        <div className="h-5 mt-1">
          <p className="text-sm text-red-600">{result?.error?.name}</p>
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
        />
        <div className="h-5 mt-1">
          <p className="text-sm text-red-600">{result?.error?.email}</p>
        </div>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border  border-transparent rounded-md shadow-sm cursor-pointer text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
