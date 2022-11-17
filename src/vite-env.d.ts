/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_SERVER_ENDPOINT: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
