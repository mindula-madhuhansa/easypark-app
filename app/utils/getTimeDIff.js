export const getTimeDiff = (time1, time2) => {
  if (!time1 || !time2) return "";
  const [hours1, minutes1, seconds1] = time1.split(":").map(parseFloat);
  const [hours2, minutes2, seconds2] = time2.split(":").map(parseFloat);

  const date1 = new Date(0, 0, 0, hours1, minutes1, seconds1);
  const date2 = new Date(0, 0, 0, hours2, minutes2, seconds2);

  const differenceMs = date2 - date1;
  const differenceHours = differenceMs / (1000 * 60 * 60);

  return differenceHours;
};
