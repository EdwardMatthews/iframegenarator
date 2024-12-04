export interface IframeConfig {
  width: string;
  height: string;
  padding: string;
  margin: string;
  borderWidth: string;
  borderStyle: string;
  borderColor: string;
  borderRadius: string;
  backgroundColor: string;
  sandbox: string[];
  allow: string[];
}

export type Locale = 'en' | 'zh'; 