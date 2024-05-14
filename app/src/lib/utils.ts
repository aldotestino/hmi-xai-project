import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAge(birthDate: Date): number {
  const today: Date = new Date();

  const ageDiffMillis: number = today.getTime() - birthDate.getTime();

  const ageDate: Date = new Date(ageDiffMillis);
  const age: number = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
}