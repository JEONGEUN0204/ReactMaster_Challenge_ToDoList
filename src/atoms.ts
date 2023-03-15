import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export enum Categories {
  "TO_DO" = "TO DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

const { persistAtom } = recoilPersist({
  key: "persist",
  storage: localStorage,
});

export const categoryType = atom({
  key: "categories",
  default: Object.values(Categories),
  effects_UNSTABLE: [persistAtom],
});

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
