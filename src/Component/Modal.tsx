export default function Modal({
  visible,
  setVisible,
  children,
}: {
  visible: boolean;
  setVisible: (x: boolean) => void;
  children?: JSX.Element;
}) {
  return (
    <div className="fixed z-10 inset-0 w-screen h-screen">
      {/* <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  --> */}
      <div className="flex items-center justify-center relative w-full h-full">
        <div
          onClick={() => {
            console.log("click");
            setVisible(false);
          }}
          className="absolute w-full h-full inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        ></div>

        <div className="z-10  p-2 rounded bg-white w-fit h-fit  ">
          {children}
        </div>
      </div>
    </div>
  );
}
