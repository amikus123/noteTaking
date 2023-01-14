import React from "react";
import { ToastData } from "../../../pages/_app";

interface PropsToast {
  toastData: ToastData;
}
const Toast = ({ toastData }: PropsToast) => {
  const { color, text, visible } = toastData;
  return (
    <>
      {visible && (
        <div
          className={`fixed bottom-8 border  border-black p-4 bg-${color}-400  rounded-md left-1/2  -translate-x-1/2`}
        >
          {text}
        </div>
      )}
    </>
  );
};

export default Toast;
