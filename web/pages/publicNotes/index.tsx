import React, { useEffect, useState } from "react";
import axios from "axios";
import getConfig from "next/config";
import { ChangeToastData } from "../_app";
import PublicNoteItem from "../../src/components/publicNotes/PublicNoteItem";
import { PublicNote } from "../../src/types";
const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

interface IndexProps {
  changeToastData: ChangeToastData;
}
const Index = ({ changeToastData }: IndexProps) => {
  const [publicNotes, setPublicNotes] = useState<PublicNote[] | undefined>(
    undefined
  );
  const [finishedFetching, setFinishedFetching] = useState(false);
  useEffect(() => {
    const getData = async () => {
      axios
        .get(`${API_HOST}/api/publicNotes`)
        .catch((e) => {
          console.error(e);
          return { data: [] };
        })
        .then(({ data }) => {
          setPublicNotes(data);
        })
        .finally(() => {
          setFinishedFetching(true);
        });
    };
    getData();
  }, []);

  const updateNote = (id: string, newState: PublicNote) => {
    setPublicNotes(
      publicNotes?.map((item) => (item._id === id ? newState : item))
    );
  };

  const removeNote = (id: string) => {
    setPublicNotes(publicNotes?.filter(({ _id }) => _id !== id));
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className="mx-auto text-xl pb-4">Public Notes List</h2>
      {finishedFetching ? (
        publicNotes === undefined || publicNotes.length === 0 ? (
          <p>{`No items were found :(`}</p>
        ) : (
          <ul className="gap-4 flex flex-col w-80">
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
