import { NextPage } from "next";

interface props {
  children: any;
  onClicked?: () => void;
}

const SecondaryButton: NextPage<props> = ({ children, onClicked }) => {
  return (
    <button
      className="text-white bg-gray-600 px-10 py-2 m-4 rounded-md transition-colors hover:bg-gray-700 active:ring-4 ring-gray-800"
      onClick={onClicked}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
