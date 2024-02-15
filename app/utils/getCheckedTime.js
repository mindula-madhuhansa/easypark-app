export function getCheckedTime(time24) {
  if (!time24) return "";
  const [hours, minutes, seconds] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  let hours12 = hours % 12;
  hours12 = hours12 === 0 ? 12 : hours12;

  const time12 = `${hours12}:${minutes}:${seconds} ${period}`;

  return time12;
}
