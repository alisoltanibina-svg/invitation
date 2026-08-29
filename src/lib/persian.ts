const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFaDigits(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

export function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

export function formatJalaliLong(parts: {
  year: number;
  month: number;
  day: number;
  monthName: string;
}): string {
  return `${toFaDigits(parts.day)} ${parts.monthName}ماه ${toFaDigits(parts.year)}`;
}
