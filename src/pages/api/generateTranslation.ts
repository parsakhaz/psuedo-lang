import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GenerateTranslation = async (req: NextApiRequest, res: NextApiResponse<string | undefined>) => {
    const { language, textToTranslate } = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role":"system", "content": `You are a binary evaluation system. Guess a language based on the context of the text given, then translate the text to ${language}. Output the guessed language after a '~', and the ${language} translation (and nothing else) after a '~'. Do nothing else. If untranslatable text is given, respond with "~".`},
          {"role": "user", "content": `Translator: ${textToTranslate}`}
        ],
        temperature: 0,
      });
      console.log(completion.data.choices[0].message);
      
    res.send(completion.data.choices[0].message.content);
};

export default GenerateTranslation;