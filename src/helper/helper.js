/*  transform date format */
export function dateFormat(date) {
  const dateOriginalArray = date.split('-');
  const dateReverseArray = dateOriginalArray.reverse();
  const newDateString = dateReverseArray.join('.');
  return newDateString;
}
