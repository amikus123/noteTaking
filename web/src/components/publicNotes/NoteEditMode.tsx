import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { omit } from "lodash";
import getConfig from "next/config";
import React from "react";
import { useForm } from "react-hook-form";
import { PublicNoteState } from "../../../pages/publicNotes";
import { ChangeToastData } from "../../../pages/_app";
import {
  NoteUpdateFormValues,
  noteUpdateSchema,
  PublicNote,
} from "../../types";
import { dateToStringYMD } from "../../utils/dates";
import { removeEmpty } from "../../utils/obj";
import Button from "../form/Button";
import Input from "../form/Input";
import CardToggle from "./CardToggle";

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

interface NoteEditModeProps {
  setEditMode: (value: boolean) => void;
  publicNote: PublicNoteState;
  changeToastData: ChangeToastData;
  updateNote: (id: string, newState: PublicNoteState) => void;
}

const NoteEditMode = ({
  setEditMode,
  publicNote,
  changeToastData,
  updateNote,
}: NoteEditModeProps) => {
  const { data } = publicNote;
  const { _id, deadline } = data;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<NoteUpdateFormValues>({
    resolver: zodResolver(noteUpdateSchema),
    defaultValues: omit(
      {
        ...data,
        deadline:
          deadline !== undefined
            ? // conversion is used to have type safefty with correct default value
              (dateToStringYMD(deadline) as unknown as Date)
            : undefined,
        priority: data.priority,
      },

      "_id"
    ),
  });

  const onSubmit = () => {
    axios
      .put(`${API_HOST}/api/publicNotes/${_id}`, {
        _id,
        ...removeEmpty(getValues()),
      })
      .then(() => {
        changeToastData("Changes were successful", "green");

        const newData = {
          _id,
          ...removeEmpty(getValues()),
          deadline:
            getValues("deadline") !== undefined
              ? new Date(getValues("deadline"))
              : undefined,
        } as PublicNote;

        updateNote(_id, {
          isEditing: false,
          data: newData,
        });
      })
      .catch(() => {
        changeToastData("Something went wrong", "red");
      });
  };

  return (
    <form
      className="flex-col   flex justify-center  mx-auto gap-4"
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

      <CardToggle
        toggleDone={() => {}}
        isDone={watch("isDone")}
        formData={register("isDone")}
      />

      <Button color="green-400" type="submit">
        Save
      </Button>

      <Button
        color="blue"
        onClick={() => {
          setEditMode(false);
        }}
      >
        Go back
      </Button>
    </form>
  );
};

export default NoteEditMode;
