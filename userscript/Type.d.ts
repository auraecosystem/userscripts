/**
 * Aura Playground
 * Global Type Definitions
 * types.d.ts
 */

import type Browser from "webextension-polyfill";

declare global {
  /**
   * Global Aura SDK
   */
  const Aura: AuraSDK;

  /**
   * Userscript Manager API
   */
  const GM: Userscripts.GM;

  /**
   * Legacy Userscript API
   */
  const GM_xmlhttpRequest: Userscripts.GM_xmlhttpRequest;

  interface Window {
    Aura: AuraSDK;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  CONFIG                                    */
/* -------------------------------------------------------------------------- */

interface AuraConfig {
  appName: string;
  version: string;

  debug: boolean;

  language: string;

  theme: "glass" | "light" | "dark" | "system";

  aiProvider:
    | "lmlm"
    | "ollama"
    | "openai"
    | "gemini"
    | "anthropic";
}

/* -------------------------------------------------------------------------- */
/*                                  STORAGE                                   */
/* -------------------------------------------------------------------------- */

interface AuraStorage {
  get<T>(key: string, defaultValue?: T): Promise<T>;

  set<T>(key: string, value: T): Promise<void>;

  remove(key: string): Promise<void>;

  clear(): Promise<void>;

  keys(): Promise<string[]>;
}

/* -------------------------------------------------------------------------- */
/*                                   NETWORK                                  */
/* -------------------------------------------------------------------------- */

interface AuraNetwork {
  get<T>(url: string): Promise<T>;

  post<T>(url: string, body: unknown): Promise<T>;

  put<T>(url: string, body: unknown): Promise<T>;

  delete(url: string): Promise<void>;
}

/* -------------------------------------------------------------------------- */
/*                                   LOGGER                                   */
/* -------------------------------------------------------------------------- */

interface AuraLogger {
  info(...args: unknown[]): void;

  warn(...args: unknown[]): void;

  error(...args: unknown[]): void;

  debug(...args: unknown[]): void;
}

/* -------------------------------------------------------------------------- */
/*                                    AI                                      */
/* -------------------------------------------------------------------------- */

interface AuraAI {
  id: string;

  chat(prompt: string): Promise<string>;

  stream(prompt: string): AsyncIterable<string>;

  embed(text: string): Promise<number[]>;

  models(): Promise<string[]>;

  health(): Promise<boolean>;
}

/* -------------------------------------------------------------------------- */
/*                                  PLUGINS                                   */
/* -------------------------------------------------------------------------- */

interface AuraPlugin {
  id: string;

  name: string;

  version: string;

  author?: string;

  activate(): Promise<void>;

  deactivate(): Promise<void>;
}

interface AuraPluginManager {
  install(id: string): Promise<void>;

  uninstall(id: string): Promise<void>;

  enable(id: string): Promise<void>;

  disable(id: string): Promise<void>;

  list(): Promise<AuraPlugin[]>;
}

/* -------------------------------------------------------------------------- */
/*                                    UI                                      */
/* -------------------------------------------------------------------------- */

interface AuraUI {
  sidebar(): void;

  palette(): void;

  toast(message: string): void;

  notify(message: string): void;

  modal(title: string, body: string): void;
}

/* -------------------------------------------------------------------------- */
/*                                 AUTOMATION                                 */
/* -------------------------------------------------------------------------- */

interface AuraAutomation {
  start(name: string): Promise<void>;

  stop(name: string): Promise<void>;

  pause(name: string): Promise<void>;

  resume(name: string): Promise<void>;

  list(): Promise<string[]>;
}

/* -------------------------------------------------------------------------- */
/*                                   THEMES                                   */
/* -------------------------------------------------------------------------- */

interface AuraThemeManager {
  current(): Promise<string>;

  load(name: string): Promise<void>;

  unload(name: string): Promise<void>;

  available(): Promise<string[]>;
}

/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */

interface AuraEventMap {
  "theme:changed": string;

  "plugin:loaded": AuraPlugin;

  "plugin:unloaded": AuraPlugin;

  "storage:changed": {
    key: string;
    value: unknown;
  };

  "ai:response": string;

  "automation:finished": string;
}

interface AuraEvents {
  on<K extends keyof AuraEventMap>(
    event: K,
    callback: (payload: AuraEventMap[K]) => void
  ): void;

  off<K extends keyof AuraEventMap>(
    event: K,
    callback: (payload: AuraEventMap[K]) => void
  ): void;

  emit<K extends keyof AuraEventMap>(
    event: K,
    payload: AuraEventMap[K]
  ): void;
}

/* -------------------------------------------------------------------------- */
/*                                    SDK                                     */
/* -------------------------------------------------------------------------- */

interface AuraSDK {
  version: string;

  config: AuraConfig;

  storage: AuraStorage;

  network: AuraNetwork;

  logger: AuraLogger;

  ai: AuraAI;

  plugins: AuraPluginManager;

  automation: AuraAutomation;

  themes: AuraThemeManager;

  events: AuraEvents;

  ui: AuraUI;
}

/* -------------------------------------------------------------------------- */
/*                               USERSCRIPT TYPES                             */
/* -------------------------------------------------------------------------- */

declare namespace Userscripts {
  interface GM {
    info: {
      scriptHandler: string;
      version: string;
      scriptMetaStr: string;
    };

    addStyle(css: string): Promise<void>;

    setValue<T>(key: string, value: T): Promise<void>;

    getValue<T>(key: string, defaultValue?: T): Promise<T>;

    deleteValue(key: string): Promise<void>;

    listValues(): Promise<string[]>;

    openInTab(
      url: string,
      openInBackground?: boolean
    ): Promise<Browser.Tabs.Tab>;
  }
}

export {};
