import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { string, object, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import getConfig from "next/config";
import router from "next/router";
import Link from "next/link";
const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

const noteSchema = object({
  title: string().min(1, "Title is required"),
  description: string().min(1, "Description is required"),
});
type FormValues = TypeOf<typeof noteSchema>;

const Index = () => {
  const [error, setError] = useState<string>("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(noteSchema),
  });
  const onSubmit = (values: FormValues) => {
    try {
      axios.post(`${API_HOST}/api/publicNotes`, values).then(() => {
        setError("");
      });
    } catch (e) {
      console.log("Error!", e);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    if (error !== "") {
      setError("");
    }
  }, [watch(), error]);
  return (
    <div className="flex flex-col mx-auto pt-4">
      <h2 className="mx-auto text-xl pb-4">Create public note</h2>
      <form
        className="flex-col flex justify-center  mx-auto gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="title">Title</label>
        <input
          className="border border-1 p-2 rounded-md"
          id="title"
          type="text"
          required
          placeholder="Enter title"
          {...register("title")}
        ></input>
        <label htmlFor="description">Description</label>
        {errors?.title && <p>{errors?.title?.message}</p>}

        <input
          className="border border-1 p-2 rounded-md"
          id="description"
          type="text"
          required
          placeholder="Enter description"
          {...register("description")}
        ></input>

        <button
          type="submit"
          className=" border-2 py-2 bg-red-400 border-red-400 text-white  rounded-md"
        >
          Submit
        </button>

        <Link className="w-full" href="/publicNotes">
          <button className=" w-full border-2 py-2 bg-green-600 border-green-600 text-white  rounded-md">
            View notes
          </button>
        </Link>
        {error !== "" && <p className="text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default Index;
