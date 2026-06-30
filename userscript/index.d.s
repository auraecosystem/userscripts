export type RunAt =
  | "document-start"
  | "document-end"
  | "document-idle";

export interface UserScriptMetadata {
  name: string;
  namespace?: string;
  version: string;
  description?: string;
  author?: string;
  match?: string[];
  include?: string[];
  exclude?: string[];
  grant?: string[];
  runAt?: RunAt;
}

export interface GM {
  getValue<T>(key: string): Promise<T>;
  setValue<T>(key: string, value: T): Promise<void>;
  deleteValue(key: string): Promise<void>;
}

export interface UserScriptContext {
  metadata: UserScriptMetadata;
  GM: GM;
}
