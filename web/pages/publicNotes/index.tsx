import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { string, object, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import getConfig from "next/config";
import router from "next/router";
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = (values: FormValues) => {
    try {
      axios.post(`${API_HOST}/api/publicNotes`, values);
    } catch (e) {
      setError("Something went wrong");
      console.log("Error!", e);
    }
  };
  console.log({ errors, a: process.env.API_HOST });
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title"></label>
        <input
          id="title"
          type="text"
          placeholder="Example title"
          {...register("title")}
        ></input>
        <label htmlFor="description"></label>
        {errors?.title && <p>{errors?.title?.message}</p>}

        <input
          id="description"
          type="text"
          placeholder="Example description"
          {...register("description")}
        ></input>

        <button type="submit">Submit</button>
        {error !== "" && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Index;
