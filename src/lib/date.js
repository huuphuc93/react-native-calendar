const today = new Date();

export const year = today.getFullYear();
export const month = String(today.getMonth() + 1).padStart(2, '0');
export const day = String(today.getDate()).padStart(2, '0');
export const dateString = `${year}-${month}-${day}`;

const daysOfWeek = {
  0: 'Chủ nhật',
  1: 'Thứ hai',
  2: 'Thứ ba',
  3: 'Thứ tư',
  4: 'Thứ năm',
  5: 'Thứ sáu',
  6: 'Thứ bảy',
};

export function convertToDayOfWeek(stringDate) {
  const today = new Date(stringDate);
  const dayOfWeek = today.getDay();
  return daysOfWeek[dayOfWeek];
}

export function convertDateToSring(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
