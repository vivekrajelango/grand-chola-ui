import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertWordsToNumbers } from '@/utils/helpers';
import { useRouter } from 'next/navigation';


interface voiceProps {
  sendTextHandler: any;
}
const AnimateListen = ({ sendTextHandler }: voiceProps) => {
  const router = useRouter();
  // ... (previous state declarations remain the same)
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const silenceTimeoutRef = useRef<NodeJS.Timeout>();
  const errorTimeoutRef = useRef<NodeJS.Timeout>();

  // ... (speech recognition initialization remains the same)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const transcriptText = event.results[current][0].transcript;
          const convertedText = convertWordsToNumbers(transcriptText);
          setTranscript(convertedText);

          // Reset silence timeout
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }
          silenceTimeoutRef.current = setTimeout(() => {
            recognition.stop();
            setIsListening(false);
            typeWriter(convertedText);
            sendTextHandler(convertedText);
          }, 1500); // Stop after 1.5 seconds of silence
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event);
          showError('Error with speech recognition. Please try again.');
          setIsListening(false);
        };

        setRecognition(recognition);
      } else {
        showError('Speech recognition is not supported in this browser.');
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    };
  }, []);

  const showError = (message: string) => {
    setError(message);
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    errorTimeoutRef.current = setTimeout(() => {
      setError(null);
    }, 3000);
  };

  // Updated typeWriter function
  const typeWriter = (text: string) => {
    let currentText = '';
    let currentIndex = 0;

    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
        timeoutRef.current = setTimeout(type, 50);
      }
    };

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Start typing
    type();
  };

  const toggleListening = () => {
    if (!recognition) {
      showError('Speech recognition is not available');
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setDisplayText('');
      setTranscript('');
      recognition.start();
      setIsListening(true);
    }
  };

  // ... (rest of the component remains the same)
  return (
    <div className='bg-white'>
    <div className="flex justify-end p-5" onClick={()=>router.back()}>
      <X size={28} color='gray'/>
    </div>
    <div className="max-w-md mx-auto p-4 flex flex-col justify-center items-center bg-white h-[90vh]">
      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4"
          >
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-slate-900">
        {/* Text Display Area */}
        <div className=" mb-6">
          <AnimatePresence mode="wait">
            {isListening ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-lg text-gray-600"
              >
                {transcript || "Speak now..."}
              </motion.p>
            ) : displayText && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-lg text-gray-900"
              >
                {displayText}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Microphone Button and Animations */}
        <div className="flex justify-center items-center relative">
          <motion.button
            onClick={toggleListening}
            className={`relative z-10 rounded-full p-4 ${isListening
                ? 'bg-gray-500 hover:bg-gray-600'
                : 'bg-blue-500 hover:bg-blue-600'
              } text-gray-900`}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-gray-900" />
            ) : (
              <div
                className="w-[50px] h-[50px] bg-cover"
                style={{
                  backgroundImage: 'url("/mic.gif")',
                }}
              ></div>
            )}
          </motion.button>

          {/* Listening Animation Rings */}
          <AnimatePresence>
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 1.5, opacity: 0.3 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 bg-gray-200 rounded-full"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ scale: 1, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.2
                  }}
                  className="absolute inset-0 bg-gray-100 rounded-full"
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Listening Status Text */}
        <AnimatePresence>
          {isListening && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center mt-4"
            >
              <p className="text-gray-500">Listening...</p>
              <motion.div
                className="flex justify-center gap-1 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 bg-gray-500 rounded-full"
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className='text-center'>
        <p className='text-gray-800'>Tap once & Speak</p>
        <small className='text-gray-400'>This is trial version of AI, mistakes may happen.</small>
      </div>

      <div className='mt-12 text-start text-gray-500 text-sm'>
        <p className='font-semibold'>Example:</p>
        <div>1. "order 2 chicken biryani and 1 mutton chukka"</div>
        <div>2. "please order 3 pongal and 5 vada"</div>
        <div>3. "5 chapathi and 1 mutton liver fry"</div>
        <div>4. "order 1 Chicken Meals and 1 Veg Meals"</div>
        <div>5. "order 1 kiwi juice and 2 lime juice"</div>
      </div>

    </div>
    </div>
  );
};

export default AnimateListen;