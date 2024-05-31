export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

// https://uibakery.io/regex-library/phone-number
export const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
);

export function deliveryTime() {
  const diff = Math.floor(Math.random() * (70 - 30 + 1) + 20)

  return new Date(new Date().getTime() + diff * 60000)
}

export const convertToOptionList = (array) => {
  return array.map((item) => ({ label: item.charAt(0).toUpperCase() + item.slice(1), value: item }))
}