import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

export async function fetchFromURL<Data>(url: string) {
  const response = await fetch(url);
  const data = (await response.json()) as Data;
  console.log(data);
  return data;
}

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
