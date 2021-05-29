interface IColumns {
  id: string;
  title: string;
  order: number;
}

interface IBoard {
  id?: string;
  title: string;
  columns: IColumns[];
}

interface IUser {
  id?: string;
  name: string;
  login: string;
  password: string;
}

interface ITask {
  id?: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface IDB {
  Users: Array<IUser>;
  Boards: Array<IBoard>;
  Tasks: Array<ITask>;
  removeTasksOfRemovedBoard (board: IBoard): void;
  updateTaskForDeletedUser (user: IUser): void;
}

export { IBoard, IColumns, IUser, ITask, IDB };
