import type { ConvertTask } from "./convert";
import type { RenameTask } from "./rename";

export * from "./convert";
export * from "./rename";

export type SingletonTask = ConvertTask | RenameTask;
