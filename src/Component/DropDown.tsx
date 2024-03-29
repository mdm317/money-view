import { FC, useState } from "react";
import { myColors } from "../const/color";
import useTags from "../hooks/react-query/useTags";
import { colorPicker } from "../utils";

type DropDownProps = {
  menus: string[];
  title: string;
  onClick: any;
  index: number;
  value?: string;
};

const DropDown: FC<DropDownProps> = ({
  menus,
  title,
  onClick,
  index,
  value,
}) => {
  const [visibleDropdown, seTvisibleDropdown] = useState(false);
  const { data } = useTags();
  const tagIndex = value ? data?.findIndex((el) => el === value) : undefined;
  return (
    <div className="flex justify-center">
      <div>
        <div className="dropdown relative">
          <button
            style={{
              backgroundColor: colorPicker(tagIndex),
            }}
            className={`dropdown-toggle px-6 py-2.5  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg active:text-white transition duration-150 ease-in-out flex items-center whitespace-nowrap `}
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => seTvisibleDropdown(!visibleDropdown)}
          >
            {value ? value : title}
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </button>
          <ul
            className={`${
              visibleDropdown ? "" : "hidden"
            } dropdown-menu min-w-max absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none`}
            aria-labelledby="dropdownMenuButton1"
          >
            {menus.map((menu) => (
              <li key={menu}>
                <div
                  onClick={() => {
                    onClick(index, menu);
                    seTvisibleDropdown(false);
                  }}
                  className="min-w-[130px] dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100 "
                >
                  {menu}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
