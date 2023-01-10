import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { string, object, number, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import getConfig from "next/config";
import router from "next/router";
import PublicNotesList from "../../src/components/publicNotes/PublicNotesList";
const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

export interface PublicNote {
  description: string;
  _id: string;
  title: string;
  isDone: boolean;
}
const Index = () => {
  const [publicNotes, setPublicNotes] = useState<PublicNote[] | null>(null);
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
  return (
    <div className="flex flex-col justify-center items-center ">
      <h2 className="mx-auto text-xl pb-4">Public Notes List</h2>
      {finishedFetching ? (
        <PublicNotesList publicNotes={publicNotes} />
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
