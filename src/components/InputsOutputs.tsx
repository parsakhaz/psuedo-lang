import React, { useState, ChangeEvent, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';

const InputsOutputs = () => {
  const languagesArray = [
    'English',
    'Albanian',
    'Arabic',
    'Armenian',
    'Awadhi',
    'Azerbaijani',
    'Bashkir',
    'Basque',
    'Belarusian',
    'Bengali',
    'Bhojpuri',
    'Bosnian',
    'Brazilian Portuguese',
    'Bulgarian',
    'Cantonese (Yue)',
    'Catalan',
    'Chhattisgarhi',
    'Chinese',
    'Croatian',
    'Czech',
    'Danish',
    'Dogri',
    'Dutch',
    'English',
    'Estonian',
    'Faroese',
    'Finnish',
    'French',
    'Galician',
    'Georgian',
    'German',
    'Greek',
    'Gujarati',
    'Haryanvi',
    'Hindi',
    'Hungarian',
    'Indonesian',
    'Irish',
    'Italian',
    'Japanese',
    'Javanese',
    'Kannada',
    'Kashmiri',
    'Kazakh',
    'Konkani',
    'Korean',
    'Kyrgyz',
    'Latvian',
    'Lithuanian',
    'Macedonian',
    'Maithili',
    'Malay',
    'Maltese',
    'Mandarin',
    'Mandarin Chinese',
    'Marathi',
    'Marwari',
    'Min Nan',
    'Moldovan',
    'Mongolian',
    'Montenegrin',
    'Nepali',
    'Norwegian',
    'Oriya',
    'Pashto',
    'Persian (Farsi)',
    'Polish',
    'Portuguese',
    'Punjabi',
    'Rajasthani',
    'Romanian',
    'Russian',
    'Sanskrit',
    'Santali',
    'Serbian',
    'Sindhi',
    'Sinhala',
    'Slovak',
    'Slovene',
    'Slovenian',
    'Spanish',
    'Swahili',
    'Swedish',
    'Tajik',
    'Tamil',
    'Tatar',
    'Telugu',
    'Thai',
    'Turkish',
    'Turkmen',
    'Ukrainian',
    'Urdu',
    'Uzbek',
    'Vietnamese',
    'Welsh',
    'Wu',
  ];

  const [previouslyTranslatedText, setPreviouslyTranslatedText] = useState<string | undefined>();
  const [isLoadingTranslation, setIsLoadingTranslation] = useState<boolean>(false);
  const [isGenerateTranslationButtonDisabled, setIsGenerateTranslationButtonDisabled] = useState<boolean>(true);
  const [isSwapBtnDisabled, setIsSwapBtnDisabled] = useState<boolean>(true);
  const [translatorLanguage, setTranslatorLanguage] = useState<string | undefined>('Select the language to translate to');
  const [textToTranslate, setTextToTranslate] = useState<string | undefined>();
  const [guessedTranslationLanguage, setGuessedTranslationLanguage] = useState<string | undefined>();
  const [translatedTextOutput, setTranslatedTextOutput] = useState<string | undefined>();
  const [translatedText, setTranslatedText] = useState<string | undefined>();
  const [userInput, setUserInput] = useState<string | undefined>('');
  const [AlertOneFlag, setAlertOneFlag] = useState<boolean>(true);
  const [AlertTwoFlag, setAlertTwoFlag] = useState<boolean>(true);

  function hasWhiteSpace(s: string) {
    return !s.trim();
  }

  useEffect(() => {
    // console.log(translatorLanguage);
    // console.log(userInput);
  }), [];

  const handleLanguageChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    setTranslatorLanguage(event.target.value);
    event.preventDefault();
  };

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
    if (hasWhiteSpace(event.target.value) || event.target.value == null) {
      setIsGenerateTranslationButtonDisabled(true);
      // console.log(event.target.value + 'entered disable feedback button loop');
    } else {
      setIsGenerateTranslationButtonDisabled(false);
      // console.log(event.target.value + 'entered enable feedback button loop');
      setTextToTranslate(event.target.value);
      // console.log('text to be translated', event.target.value);
    }
  };

  const handleOutputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTranslatedTextOutput(event.target.value);
    if (hasWhiteSpace(event.target.value) || event.target.value == null) {
      // setIsGenerateTranslationButtonDisabled(true);
      console.log(event.target.value + 'entered disable feedback button loop');
    } else {
      // setIsGenerateTranslationButtonDisabled(false);
      console.log(event.target.value + 'entered enable feedback button loop');
      // setTextToTranslate(event.target.value);
      console.log('text to be translated', event.target.value);
    }
  };

  const handleQuestionBtn = async () => {
    setIsLoadingTranslation(true);
    setPreviouslyTranslatedText(textToTranslate);
    const response = await fetch('/api/generateTranslation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: translatorLanguage, textToTranslate: textToTranslate }),
    });
    const data = await response.text();
    console.log('data returned from gpt api:', data);

    let parsedData = await data.replace(/\[|\]/g, '').split('~');
    console.log(parsedData);
    console.log(parsedData[0]);
    console.log(parsedData[1]);
    setGuessedTranslationLanguage(parsedData[0]);
    setTranslatedText(parsedData[1]);
    setIsLoadingTranslation(false);

    // set text output box to have translated text & enable swap btn
    setIsSwapBtnDisabled(false);
    const textOutput = document.getElementById('user-output') as HTMLTextAreaElement;
    textOutput.value = parsedData[1] ? parsedData[1] : "Failed to translate. The translator may have failed to auto-detect the input language if it is too short or unsupported. Please modify your input and try again.";
  };

  const handlePhoneticizeBtn = async () => {
    setIsLoadingTranslation(true);
    setPreviouslyTranslatedText(textToTranslate);
    const response = await fetch('/api/generatePhoneticize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: translatorLanguage, textToTranslate: textToTranslate }),
    });
    const data = await response.text();
    console.log('data returned from gpt api:', data);

    let parsedData = await data.replace(/\[|\]/g, '').split('~');
    console.log(parsedData);
    console.log(parsedData[0]);
    console.log(parsedData[1]);
    setGuessedTranslationLanguage(parsedData[0]);
    setTranslatedText(parsedData[1]);
    setIsLoadingTranslation(false);

    // set text output box to have translated text & enable swap btn
    setIsSwapBtnDisabled(false);
    const textOutput = document.getElementById('user-output') as HTMLTextAreaElement;
    textOutput.value = parsedData[1] ? parsedData[1] : "Failed to phoneticize. Try transliterating instead. Still not working? Please check grammar and/or any typos and try again.";
  }

  const handleTransliterationBtn = async () => {
    setIsLoadingTranslation(true);
    setPreviouslyTranslatedText(textToTranslate);
    const response = await fetch('/api/generateTransliteration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language: translatorLanguage, textToTranslate: textToTranslate }),
    });
    const data = await response.text();
    console.log('data returned from gpt api:', data);

    let parsedData = await data.replace(/\[|\]/g, '').split('~');
    console.log(parsedData);
    console.log(parsedData[0]);
    console.log(parsedData[1]);
    setGuessedTranslationLanguage(parsedData[0]);
    setTranslatedText(parsedData[1]);
    setIsLoadingTranslation(false);

    // set text output box to have translated text & enable swap btn
    setIsSwapBtnDisabled(false);
    const textOutput = document.getElementById('user-output') as HTMLTextAreaElement;
    console.log(parsedData);
    textOutput.value = parsedData[1] ? parsedData[1] : "Failed to transliterate. Please check grammar and/or any typos and try again. Still not working? Reword your input into a different tense.";

  }

  const handleAlertOne = () => {
    setAlertOneFlag(false);
  };

  const handleAlertTwo = () => {
    setAlertTwoFlag(false);
  };

  const handleSwapBtn = () => {
    // set text output box to have translated text
    const textOutput = document.getElementById('user-output') as HTMLTextAreaElement;
    textOutput.value = textToTranslate ? textToTranslate : '';

    const textInput = document.getElementById('user-input') as HTMLTextAreaElement;
    textInput.value = translatedText ? translatedText : '';

    let swap = textToTranslate;
    setTextToTranslate(translatedText);
    setTranslatedText(swap);
  };

  return (
    <div>
    <div className="max-w-lg sm:max-w-3xl mx-auto">
        <div className="px-5 mx-auto py-2 pb-4">
          {/* Alert/tutorial on usage  */}
          <div className="px-8 py-8 alert alert-success shadow-lg justify-center">
            <div>
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg> */}
              <span className="text-xs sm:text-lg"><strong>Welcome to Pseudo-Lang</strong> - a functionality packed translator that can auto-detect <i>any language</i>, including <strong>pseudo</strong> <i>(fictional languages, languages that mimic a real language, etc)</i> ones, and can translate them into <strong>93</strong> languages.</span>
              {/* <div className="flex-none">
                <button className="btn btn-sm btn-ghost" onClick={handleAlertTwo}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-700 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    {AlertOneFlag && (
     <div className="max-w-lg sm:max-w-3xl mx-auto">
        <div className="px-5 mx-auto py-2">
          {/* Alert/tutorial on usage  */}
          <div className="alert bg-blue-100 text-black  shadow-lg justify-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-xs sm:text-lg">Try typing "salam, shoma khobeen" (Finglish) and translating it to English!</span>
              <div className="flex-none">
                <button className="btn btn-sm btn-ghost" onClick={handleAlertOne}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-700 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
  )} 
  
  {AlertTwoFlag && (
    <div className="max-w-lg sm:max-w-3xl mx-auto">
        <div className="px-5 mx-auto py-2 pb-4">
          {/* Alert/tutorial on usage  */}
          <div className="alert bg-blue-100 text-black shadow-lg justify-center">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-xs sm:text-lg">The phoneticize and transliterate features are a powerful way to learn to learn the English pronounciation of words in another language! <br/><br/> <span className="text-[0.7rem] leading-[0.2rem] sm:text-sm"><strong>Instructions</strong> input text in any language and select the language of your input text in the dropdown. Click tranlisterate/phoneticize and see the English pronounciation for your input!</span></span>
              <div className="flex-none">
                <button className="btn btn-sm btn-ghost" onClick={handleAlertTwo}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-red-700 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}



<div className="max-w-lg sm:max-w-2xl mx-auto">
      {/* Div with buttons to select output language, translate & swap */}
      <div className="flex justify-center pt-2">
        {/* Dropdown for Language Selection */}
        <div className="flex px-2 ">
          <select className="select select-bordered w-full max-w-xs mr-10 mb-5" id="positionSelect" value={translatorLanguage} onChange={handleLanguageChange}>
            <option disabled selected>
              Select the language to translate to
            </option>
            {languagesArray.map((language: string, index: number) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select> 
        </div>
      
         {/* Button to swap input and output */}
         <div className="px-2">
          <button disabled={isSwapBtnDisabled} className="btn btn-success mb-5" id="generateAnswerBtn" onClick={handleSwapBtn}>
            Swap
          </button>
        </div>
        </div>
        <div className="flex justify-center pt-2">
          {/* Button to translate input */}
          <div className="px-2">
          <button disabled={isGenerateTranslationButtonDisabled} className="btn btn-success mb-5" id="generateAnswerBtn" onClick={handleQuestionBtn}>
            TRANSLATE
          </button>
        </div>
           {/* Button to  input */}
           <div className="px-2">
           <button disabled={isGenerateTranslationButtonDisabled} className="btn btn-success mb-5" id="generateAnswerBtn" onClick={handlePhoneticizeBtn}>
           phoneticize
          </button>
          </div>
             {/* Button to  input */}
             <div className="px-2">
             <button disabled={isGenerateTranslationButtonDisabled} className="btn btn-success mb-5" id="generateAnswerBtn" onClick={handleTransliterationBtn}>
             transliterate
          </button>
          </div>
    
      </div>
      {/* Input for User Answer */}
      <div className="px-5 flex justify-center py-1 mb-5">
        <textarea
          placeholder="Enter text to translate here"
          className="textarea textarea-bordered textarea-lg w-full max-w-6xl overflow-hidden"
          onChange={handleInputChange}
          // disabled={isQuestionInputDisabled}
          id="user-input"></textarea>
      </div>
      {/* Loading animation */}
      <div className="flex justify-center">
        <BeatLoader className="pb-5" color={'white'} loading={isLoadingTranslation} size={10} aria-label="Loading Spinner" data-testid="loader" />
      </div>
      {/* Output for User Answer */}
      <div className="px-5 flex justify-center py-1 mb-5">
        <textarea
          placeholder="Translated text will appear here if successful"
          className="textarea textarea-bordered textarea-lg w-full max-w-6xl overflow-hidden"
          onChange={handleOutputChange}
          // disabled={isQuestionInputDisabled}
          id="user-output">
          {translatedText}
        </textarea>
      </div>
      {/* For debugging purposes (IGNORE)
      <br />
      <br />
      {previouslyTranslatedText && 'Previously Translated Text: ' + previouslyTranslatedText}
      <br />
      <br />
      {guessedTranslationLanguage && 'Guessed Language: ' + guessedTranslationLanguage}
      <br />
      <br />
      {textToTranslate && 'Text to Translate: ' + textToTranslate}
      <br />
      <br />
      {translatedText && 'Translated Text: ' + translatedText}
      <br />
      <br /> */}
    </div>
    </div>
  );
};

export default InputsOutputs;
