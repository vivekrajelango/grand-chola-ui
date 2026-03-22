import dayjs from "dayjs";

export const isAfter11PM = (): boolean => {
  const currentTime = dayjs();
  const limitTime = dayjs().hour(23).minute(0).second(0); // 11 PM
  return currentTime.isAfter(limitTime);
};
