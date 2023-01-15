import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import getConfig from "next/config";
import Link from "next/link";
import { ChangeToastData } from "../_app";
import { NoteCreationFormValues, noteCreationSchema } from "../../src/types";
import Input from "../../src/components/form/Input";
import Button from "../../src/components/form/Button";

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
    formState: { errors },
  } = useForm<NoteCreationFormValues>({
    resolver: zodResolver(noteCreationSchema),
    defaultValues: { priority: 5 },
  });

  const onSubmit = (values: NoteCreationFormValues) => {
    const newValues: NoteCreationFormValues = {
      ...values,
      priority: Number(values.priority),
    };
    axios
      .post(`${API_HOST}/api/publicNotes`, newValues)
      .then(() => {
        changeToastData("Note was created", "green");
      })
      .catch((e) => {
        console.log("Error!", e);
        changeToastData("Something went wrong", "red");
      });
  };
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
          register={register("priority", { valueAsNumber: true })}
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
          register={register("deadline", { valueAsDate: true })}
          label="Deadline"
          id="deadline"
          type="date"
          // min date is equal to today
          min={new Date().toISOString().split("T")[0]}
          error={errors.deadline}
          placeholder="dd/mm/yyyy"
        />

        <Button color="red" type="submit">
          Submit
        </Button>

        <Link className="w-full" href="/publicNotes">
          <Button color="red" className="w-full bg-green-600 border-green-600">
            View notes
          </Button>
        </Link>
      </form>
    </div>
  );
};

export default Index;
