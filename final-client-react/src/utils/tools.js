export function getCurrentDate(separator = '') {

    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

export function getTodayDate() {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

export function getMilliseconds(time) {

  let h = 0, m = 0;

  h = +time.charAt(0) * 10 + +time.charAt(1);
  m = +time.charAt(3) * 10 + +time.charAt(4);

  return 1000 * ((h+5) * 3600 + m *60);
}
