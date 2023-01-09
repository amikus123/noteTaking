import Head from "next/head";
import Image from "next/image";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { API_HOST }, // Available both client and server side
} = getConfig();

export default function Home() {
  console.log({ API_HOST });
  return (
    <>
      <Head>
      
      </Head>
      <main></main>
    </>
  );
}
