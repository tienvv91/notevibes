
import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';
import { useSpeechSynthesis } from 'react-speech-kit';

const TextToSpeech = (props) => {
    const [value, setValue] = useState('');
  const { speak } = useSpeechSynthesis();
 
  return (
    <div>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <button onClick={() => speak({ text: value })}>Speak</button>
    </div>
  );
}

export default TextToSpeech;