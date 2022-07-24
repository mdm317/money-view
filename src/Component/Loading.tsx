import { FC, PropsWithChildren } from "react";
import { ReactComponent as Heart } from "../assets/heart.svg";

type LoadingType = {
  loading: boolean;
};

const Loading: FC<PropsWithChildren<LoadingType>> = ({ children, loading }) => {
  return (
    <div className="relative">
      <div
        className={`${
          loading ? "" : "hidden"
        } flex items-center justify-center absolute w-full h-full opacity-50 bg-[#FF8B8B]`}
      >
        <Heart />
      </div>
      {children}
    </div>
  );
};

export default Loading;
