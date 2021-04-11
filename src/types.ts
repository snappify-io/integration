export type SnappifyCallback = (blob: Blob) => void;

export interface SnappifyConfig {
  url?: string;
}

export interface UserInfo {
  displayName: string;
  userName: string;
  image: string;
}
