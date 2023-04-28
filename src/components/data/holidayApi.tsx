export async function fetchHolidayApi() {
  const response = await fetch('https://raw.githubusercontent.com/huuphuc93/calendar_api/main/holiday.json');
  if (!response.ok) {
    throw new Error('Failed to fetch products from API');
  }
  const data = await response.json();

  return data;
}
