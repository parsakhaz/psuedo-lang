import Head from "next/head";
import { Inter } from "@next/font/google";
import InputsOutputs from "@/components/InputsOutputs";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PseudoLang - Translate anything.</title>
        <meta name="description" content="PseudoLang - Translate, sound out (phoneticize), and transliterate real & pseudo languages like Elvish, Finglish, and more with AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <InputsOutputs />
    </>
  );
}
