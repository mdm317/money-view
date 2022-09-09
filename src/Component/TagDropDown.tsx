import useTags from "../hooks/react-query/useTags";
import DropDown from "./DropDown";

type TagDropDown = {
  title: string;
  onClick: any;
  index: number;
  value?: string;
};
function TagDropDown({ title, onClick, index, value }: TagDropDown) {
  const { data: tagList } = useTags();
  if (!tagList) {
    return <></>;
  }

  return (
    <DropDown
      title={title}
      value={value}
      menus={tagList}
      index={index}
      onClick={onClick}
    />
  );
}

export default TagDropDown;
