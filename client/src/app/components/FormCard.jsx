import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import api from "../api/appApi";
import { CircularProgress } from "@mui/material";
import { useFetchContext } from "../context/fetchContext";
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  phone: z.string().refine((value) => /^\d{10}$/g.test(value), {
    message: "Phone number must be 10 digits long and contain only numbers",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  hobbies: z
    .string()
    .max(100, { message: "Hobbies must be 100 characters or less" }),
});

const FormCard = ({
  onClose,
  _id,
  username = "",
  email = "",
  phone = "",
  hobbies = "",
  update = false,
}) => {
  const { fetchAgain, setFetchAgain } = useFetchContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { username, email, phone, hobbies },
    resolver: zodResolver(schema),
  });

  const onSumbit = async (data) => {
    if (update) {
      try {
        console.log(_id);
        console.log("updated: ", data);
        await api.put(`api/updateRow?id=${_id}`, data);
        onClose();
        setFetchAgain(!fetchAgain);
      } catch (error) {
        setError("root", { message: error?.message });
      }
    } else {
      try {
        await api.post("api/createRow", data);
        onClose();
        setFetchAgain(!fetchAgain);
      } catch (error) {
        if (error.response.status === 403) {
          setError("email", { message: "Email address already exist" });
        } else if (error.response.status === 400) {
          setError("root", { message: "All fields are required" });
        } else {
          setError("root", { message: error?.message });
        }
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSumbit)}>
        <div className="mb-6">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Username
          </label>
          <input
            {...register("username")}
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john_doe"
          />
          {errors.username && (
            <div className="text-red-600">{errors.username.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone number
          </label>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="123-45-678"
          />
          {errors.phone && (
            <div className="text-red-600">{errors.phone.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email address
          </label>
          <input
            {...register("email")}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
          />
          {errors.email && (
            <div className="text-red-600">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="hobbies"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your hobbies
          </label>
          <textarea
            {...register("hobbies")}
            id="hobbies"
            rows="4"
            maxLength="100"
            className="block p-2.5 max-h-28 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your hobbies here (max 200 character)"
          ></textarea>
          {errors.hobbies && (
            <div className="text-red-600">{errors.hobbies.message}</div>
          )}
        </div>
        {isSubmitting ? (
          <CircularProgress />
        ) : (
          <button
            type="submit"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add
          </button>
        )}

        {errors.root && (
          <div className="text-red-600">{errors.root.message}</div>
        )}
      </form>
    </>
  );
};

export default FormCard;
