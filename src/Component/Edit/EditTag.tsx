import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import useWriteTag from "../../hooks/react-query/mutations/useWriteTag";
import useTags from "../../hooks/react-query/useTags";
import { useUser } from "../../UserContext";
import Sortable from "sortablejs";
import { toast } from "react-toastify";

function EditTag() {
  const { user } = useUser();
  const { data } = useTags();
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const { mutateAsync } = useWriteTag("tag");
  const list = useRef(null);

  useEffect(() => {
    data && setTagList(data);
  }, [data]);

  useEffect(() => {
    if (list.current) {
      Sortable.create(list.current, {
        onChange: (e) => {
          const par = e.from;
          let newTagList = [];
          for (let i = 0; i < par.children.length; i++) {
            newTagList.push(par.children[i].id);
          }
          setTagList(newTagList);
          console.log(newTagList);
        },
      });
    }
  }, []);
  const addTag2TagList = () => {
    if (tag === "") {
      return toast.error("tag 를 입력해주세요");
    }
    setTagList([...tagList, tag]);
    setTag("");
  };
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === "Enter") {
      addTag2TagList();
    }
  };
  const handleTagSave = () => {
    mutateAsync(tagList).then(() => toast.success("성공"));
  };
  const handleDeleteTag = (_tag: string) => {
    const newTagList = tagList.filter((tag) => tag !== _tag);
    setTagList(newTagList);
  };

  return (
    <div className="p-10">
      <h1 className="text-7xl">Edit tag</h1>
      <button
        className="bg-sky-500 hover:bg-sky-700 px-5 py-2 text-sm leading-5 rounded-full font-semibold text-white"
        onClick={handleTagSave}
      >
        저장
      </button>
      <div className="relative">
        <input
          value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
          type="text"
          placeholder="Enter Tag"
          className="border my-3 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
          onKeyUp={handleKeyDown}
        />
        {tag !== "" && (
          <span
            onClick={() => addTag2TagList()}
            className="absolute right-5 top-2"
          >
            ✅
          </span>
        )}
      </div>

      <ul ref={list}>
        {tagList.map((tag: string) => (
          <li
            key={tag}
            id={tag}
            className="first:rounded-t-md last:rounded-b-md bg-white flex mt-[-1px] p-3 border-solid border border-slate-300"
          >
            <span className="mr-5">↕️</span>
            <h3 className="text-lg">{tag}</h3>
            <button
              className="ml-5"
              onClick={() => {
                handleDeleteTag(tag);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EditTag;
