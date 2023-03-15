import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GenerateTransliteration = async (req: NextApiRequest, res: NextApiResponse<string | undefined>) => {
  const { language, textToTranslate } = req.body;
  const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role":"system", "content": `You are a binary evaluation system. Guess a language based on the context of the text given, then translate the text to ${language}. Separate language name and translation output with the character ~. Do nothing else. If untranslatable text is given, do your best to translate it. If you do not recognize words, output with the character ~. Do nothing else.`},
        {"role": "user", "content": `${textToTranslate}`}
      ],
      temperature: 0,
    }).catch((err: any) => (console.error("Internal Server Error 500 (generateTranslation): ", err)));
  
    let contentOutput = completion.data.choices[0].message.content;

    if(completion && contentOutput != "~" || contentOutput != "~." || contentOutput != "") {
      // transliteration logic
      let parsedData = await contentOutput.replace(/\[|\]/g, '').split('~');
      let transliterateLanguage = await "English"; // hard coded to transliterate to English for now, since I haven't made dropdown for it yet
      let textToTransliterate = await parsedData[1];
    const completion2 = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {"role":"system", "content": `You are a binary evaluation system. Guess a language based on the context of the text given, then transliterate the text with ${transliterateLanguage}. Separate language name and translation output with ~. Do not include the text 'translation'. Do nothing else. If untranslatable text is given, give your best shot at translating it, if you can't, output ~.`},
        {"role": "user", "content": `${textToTransliterate}`}
      ],
      temperature: 0,
    }).catch((err: any) => (console.error("Internal Server Error 500 (generateTransliteration): ", err)));
  
    let contentOutput2 = completion2.data.choices[0].message.content;

    if(completion2 && contentOutput2 != "~" || contentOutput2 != "~." || contentOutput2 != "") {
    res.send(contentOutput2);
  } else {
    res.send("~Error while transliterating. Please subtly reword your text and try again.");
  }
  } else {
    res.send("~Error while generating translation. Please subtly reword your text and try again.");
  }


  
};

export default GenerateTransliteration;