import { NextPage } from "next";

interface props {
  children: any;
  onClicked?: () => void;
}

const Item: NextPage<props> = ({ children, onClicked }) => {
  return (
    <button
      className="text-white bg-blue-600 px-10 py-2 m-4 rounded-md transition-colors hover:bg-blue-700 active:ring-4 ring-blue-900"
      onClick={onClicked}
    >
      {children}
    </button>
  );
};

export default Item;
