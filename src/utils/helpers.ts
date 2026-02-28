import dayjs from "dayjs";
import { DateFormats } from "@/constants/constants";

const wordToNumberMap: { [key: string]: string } = {
  'zero': '0',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
  'ten': '10'
};

export const convertWordsToNumbers = (text: string): string => {
  // Convert text to lowercase for matching
  let result = text.toLowerCase();
  
  // Replace number words with digits
  Object.entries(wordToNumberMap).forEach(([word, number]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    result = result.replace(regex, number);
  });
  // Handle compound numbers (e.g., "twenty one" -> "21")
  const compoundRegex = /(\d+)\s+(\d+)/g;
  result = result.replace(compoundRegex, (_, tens, ones) => {
    if (Number(tens) % 10 === 0 && Number(ones) < 10) {
      return String(Number(tens) + Number(ones));
    }
    return `${tens} ${ones}`;
  });
  return result;
};

export const isAfter11PM = (): boolean => {
  const currentTime = dayjs();
  const limitTime = dayjs().hour(23).minute(0).second(0); // 11 PM
  return currentTime.isAfter(limitTime);
};
