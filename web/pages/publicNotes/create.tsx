import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import getConfig from "next/config";
import Link from "next/link";
import { ChangeToastData } from "../_app";
import { NoteCreationFormValues, noteCreationSchema } from "../../src/types";
import Input from "../../src/components/form/Input";
import { omit } from "lodash";

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

interface IndexProps {
  changeToastData: ChangeToastData;
}
const Index = ({ changeToastData }: IndexProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NoteCreationFormValues>({
    resolver: zodResolver(noteCreationSchema),
    defaultValues: { priority: 5 },
  });

  const onSubmit = (values: NoteCreationFormValues) => {
    axios
      .post(`${API_HOST}/api/publicNotes`, values)
      .then(() => {
        changeToastData("Note was created", "green");
      })
      .catch((e) => {
        console.log("Error!", e);
        changeToastData("Something went wrong", "red");
      });
  };
  console.log(watch("deadline"));
  return (
    <div className="flex flex-col mx-auto pt-4">
      <h2 className="mx-auto text-xl pb-4">Create public note</h2>
      <form
        className="flex-col flex justify-center  mx-auto gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          register={register("title")}
          label="Title"
          placeholder="Enter title"
          id="title"
          required
          error={errors.title}
        />

        <Input
          register={register("description")}
          label="Description"
          placeholder="Enter description"
          id="description"
          error={errors.description}
        />

        <Input
          register={register("priority")}
          label="Priority (1-5)"
          placeholder="1"
          id="priority"
          type="number"
          required
          min={1}
          max={5}
          error={errors.priority}
        />

        <Input
          register={register("deadline")}
          label="Deadline"
          id="deadline"
          type="date"
          // min date is equal to today
          min={new Date().toISOString().split("T")[0]}
          error={errors.deadline}
          placeholder="dd/mm/yyyy"
        />

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
      </form>
    </div>
  );
};

export default Index;
