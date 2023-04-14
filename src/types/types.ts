export type Author = {
  name: string;
};

export type Section = {
  id: string;
  sectionTitle: string;
  todos?: Todo[];
  allDone?: boolean;
};

export type Todo = {
  id?: string;
  name?: string;
  author?: string;
  createdDate?: string;
  createdTime?: string;
  description?: string;
  completed?: boolean;
  priority?: string;
};

