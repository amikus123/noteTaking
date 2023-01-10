import getConfig from "next/config";
import axios from "axios";

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

export interface PublicNote {
  title: string;
  description: string;
}

export interface Response {
  text: string;
  error: boolean;
}

// export const createNote = async (data: PublicNote): Promise<Response> => {
//   try {
//     const request = await axios.post(`${API_HOST}/api/publicNotes`, data);
//     return { error: false, text: "Added public note" };
//   } catch (e: any) {
//     console.error(e);
//     return {
//       error: true,
//       text: `Error code: ${e.code}`,
//     };
//   }
// };
