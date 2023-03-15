import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryType } from "../atoms";

interface IForm {
  category: string;
}

function CreateCategroy() {
  const setCategory = useSetRecoilState(categoryType);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ category }: IForm) => {
    setCategory((prev: []) => {
      return [...prev, category];
    });
    setValue("category", "");
  };

  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("category", {
          required: "Please write a category",
        })}
        placeholder="Write a category"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateCategroy;
