import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { ChangeToastData } from "./_app";
import PublicNoteItem from "../src/components/publicNotes/PublicNoteItem";
import { PublicNote } from "../src/types";
import Button from "../src/components/form/Button";
import Sorting from "../src/components/publicNotes/Sorting";

interface IndexProps {
  changeToastData: ChangeToastData;
}

export interface PublicNoteState {
  isEditing: boolean;
  data: PublicNote;
}

export type SortSettingValue = null | "asc" | "desc";
export interface SortSettings {
  priority: SortSettingValue;
  deadline: SortSettingValue;
}

const genereateQueryParams = (data: SortSettings) => {
  return `sort=${`${data.priority === "desc" ? "-" : ""}${
    data.priority !== null ? "priority" + "%20" : ""
  }`}${`${data.deadline === "desc" ? "-" : ""}${
    data.deadline !== null ? "deadline" : ""
  }`}`;
};

const Index = ({ changeToastData }: IndexProps) => {
  const [publicNotes, setPublicNotes] = useState<PublicNoteState[] | undefined>(
    undefined
  );
  const [finishedFetching, setFinishedFetching] = useState(false);

  const [sortSettings, setSortSettings] = useState<SortSettings>({
    deadline: null,
    priority: null,
  });

  const getData = useCallback(async () => {
    setFinishedFetching(false);
    const query = genereateQueryParams(sortSettings);
    console.log({ a: process.env.NEXT_PUBLIC_API_HOST });
    axios
      .get(`${process.env.NEXT_PUBLIC_API_HOST}/api/publicNotes?${query}`)
      .catch((e) => {
        console.error(e);
        setPublicNotes([]);
        return { data: [] };
      })
      .then(({ data }) => {
        setPublicNotes(
          data.map((item: PublicNote) => {
            return {
              isEditing: false,
              data: {
                ...item,
                deadline: item.deadline ? new Date(item.deadline) : undefined,
              },
            };
          })
        );
      })
      .finally(() => {
        setFinishedFetching(true);
      });
  }, [sortSettings]);

  useEffect(() => {
    getData();
  }, [getData]);

  const updateNote = (id: string, newState: PublicNoteState) => {
    setPublicNotes(
      publicNotes?.map((item) =>
        item.data._id === id ? { ...item, ...newState } : item
      )
    );
  };

  const removeNote = (id: string) => {
    setPublicNotes(publicNotes?.filter(({ data }) => data._id !== id));
  };

  const removeDoneTasks = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_API_HOST}/api/publicNotes/?isDone=true`)
      .then(() => {
        getData();
        changeToastData("Removed done tasks", "green");
      })
      .catch((e) => {
        console.error(e.message);
        changeToastData("Something went wrong");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className="mx-auto text-xl pb-4">Notes List</h2>
      {finishedFetching ? (
        publicNotes === undefined || publicNotes.length === 0 ? (
          <p>{`No items were found :(`}</p>
        ) : (
          <>
            <Sorting
              sortSettings={sortSettings}
              setSortSettings={setSortSettings}
            />
            <Button color="blue-400" className="mt-4" onClick={removeDoneTasks}>
              Remove done tasks
            </Button>
            <ul className="gap-4 flex flex-col w-80 mt-8">
              {publicNotes.map((item, index) => {
                return (
                  <PublicNoteItem
                    removeNote={removeNote}
                    key={index}
                    publicNote={item}
                    changeToastData={changeToastData}
                    updateNote={updateNote}
                  />
                );
              })}
            </ul>
          </>
        )
      ) : (
        <div className="mt-8">
          <p>Loading...</p>
          <div className="loader mx-auto mt-4"></div>
        </div>
      )}
    </div>
  );
};

export default Index;
