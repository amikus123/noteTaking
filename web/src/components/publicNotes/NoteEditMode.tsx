import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { omit } from "lodash";
import getConfig from "next/config";
import React from "react";
import { useForm } from "react-hook-form";
import { ChangeToastData } from "../../../pages/_app";
import {
  NoteUpdateFormValues,
  noteUpdateSchema,
  PublicNote,
} from "../../types";
import CardToggle from "./CardToggle";

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

interface NoteEditModeProps {
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  data: PublicNote;
  changeToastData: ChangeToastData;
  updateNote: (id: string, newState: PublicNote) => void;
}

const NoteEditMode = ({
  setEditMode,
  data,
  changeToastData,
  updateNote,
}: NoteEditModeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<NoteUpdateFormValues>({
    resolver: zodResolver(noteUpdateSchema),
    defaultValues: omit(data, "_id"),
  });

  const onSubmit = () => {
    axios
      .put(`${API_HOST}/api/publicNotes/${data._id}`, {
        ...data,
        ...getValues(),
      })
      .then(() => {
        changeToastData("Changes were successful", "green");
        updateNote(data._id, { ...data, ...getValues() });
        setEditMode(false);
      })
      .catch(() => {
        changeToastData("Something went wrong", "red");
      });
  };
  return (
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

      <CardToggle toggleDone={() => {}} formData={register("isDone")} />
      <button
        type="submit"
        className=" border-2 py-2 bg-green-400 border-green-400 text-white  rounded-md"
      >
        Save
      </button>
      <button
        className=" border-2 py-2 bg-blue-400 border-blue-400 text-white  rounded-md"
        onClick={() => {
          setEditMode(false);
        }}
      >
        Go back
      </button>
    </form>
  );
};

export default NoteEditMode;
