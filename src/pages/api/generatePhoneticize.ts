import { NextApiRequest, NextApiResponse } from "next";
import dotenv from 'dotenv';

dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const GeneratePhoneticize = async (req: NextApiRequest, res: NextApiResponse<string | undefined>) => {
    const { language, textToTranslate } = req.body;
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {"role":"system", "content": `You are a binary evaluation system. Guess a language based on the context of the text given, then phoneticize (sound out) the text with ${language}. Separate language name and translation output with ~. Do not include the text 'translation'. Do nothing else. If untranslatable text is given, give your best shot at translating it, if you can't, output ~.`},
          {"role": "user", "content": `${textToTranslate}`}
        ],
        temperature: 0,
      }).catch((err: any) => (console.error("Internal Server Error 500 (generateTranslation): ", err)));
    
      let contentOutput = completion.data.choices[0].message.content;

      if(completion && contentOutput != "~" || contentOutput != "~." || contentOutput != "") {
      res.send(contentOutput);
    } else {
      res.send("~Error while phoneticizing. Please try again.");
    }
};

export default GeneratePhoneticize;