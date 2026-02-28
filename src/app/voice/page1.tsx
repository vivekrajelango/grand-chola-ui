'use client';

import { useState, useEffect } from 'react';
import { Mic, MicOff, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Voice() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const [copied, setCopied] = useState(false);

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
          setTranscript(transcriptText);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event);
          toast.error('Error with speech recognition. Please try again.');
          setIsListening(false);
        };

        setRecognition(recognition);
      } else {
        toast.error('Speech recognition is not supported in this browser.');
      }
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const copyToClipboard = async () => {
    if (!transcript) return;

    try {
      await navigator.clipboard.writeText(transcript);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy text.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl p-6 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Voice Recognition
          </h1>
          <p className="text-gray-600">
            Click the microphone to start speaking
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={toggleListening}
            className={`rounded-full p-8 transition-all ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-white" />
            )}
          </button>
        </div>

        <div className="relative">
          <div className="min-h-[100px] p-4 bg-gray-50 rounded-lg">
            {transcript ? (
              <p className="text-lg text-gray-800">{transcript}</p>
            ) : (
              <p className="text-gray-800 text-center">
                Your speech will appear here...
              </p>
            )}
          </div>
          {transcript && (
            <button
              className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
