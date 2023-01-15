import React from "react";
import { SortSettings, SortSettingValue } from "../../../pages";

interface SortingProps {
  sortSettings: SortSettings;
  setSortSettings: React.Dispatch<React.SetStateAction<SortSettings>>;
}
const Sorting = ({ setSortSettings, sortSettings }: SortingProps) => {
  const updateSortSettingsGenerator = (name: keyof SortSettings) => {
    return (newSetting: SortSettingValue) => {
      setSortSettings({ ...sortSettings, [name]: newSetting });
    };
  };
  return (
    <div className="w-80 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Sort by</h3>
      <SortingRow
        updateSortSettings={updateSortSettingsGenerator("priority")}
        text="priority"
        currentValue={sortSettings.priority}
      />
      <SortingRow
        updateSortSettings={updateSortSettingsGenerator("deadline")}
        text="deadline"
        currentValue={sortSettings.deadline}
      />
    </div>
  );
};

interface SortingRowProps {
  updateSortSettings: (newSetting: SortSettingValue) => void;
  currentValue: SortSettingValue;
  text: keyof SortSettings;
}
const SortingRow = ({
  updateSortSettings,
  currentValue,
  text,
}: SortingRowProps) => {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="capitalize"> {text}:</p>
      <div className="flex  gap-4">
        <Button
          onClick={() => {
            updateSortSettings("asc");
          }}
          active={currentValue === "asc"}
        >
          Asc
        </Button>
        <Button
          onClick={() => {
            updateSortSettings("desc");
          }}
          active={currentValue === "desc"}
        >
          Desc
        </Button>
        <Button
          onClick={() => {
            updateSortSettings(null);
          }}
          active={false}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active: boolean;
}
const Button = ({ children, className, active, ...rest }: ButtonProps) => {
  return (
    <button
      className={`border p-4 rounded ${className} ${
        active ? "border-blue-400 border-2" : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Sorting;
