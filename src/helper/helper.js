/*  transform date format */
export function dateFormat(date) {
  if (date) {
    const dateOriginalArray = date.split('-');
    const dateReverseArray = dateOriginalArray.reverse();
    const newDateString = dateReverseArray.join('.');
    return newDateString;
  }
  return null;
}
