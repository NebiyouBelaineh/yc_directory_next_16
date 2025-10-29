// Module where we can define helper functions.

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string){
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatViews(views: number | null | undefined) {
  return views && views > 1 ? `${views}` + ` views`: `${views || 0}` + ' view'
}


export function parseServerActionResponse<T>(response: T) {
  return JSON.parse(JSON.stringify(response));
}