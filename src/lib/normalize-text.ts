/**
 * Removes Vietnamese diacritics/accents from text for flexible searching
 * e.g., "Hai Bà Trưng" -> "hai ba trung"
 */
export const normalizeVietnamese = (text: string): string => {
  if (!text) return "";
  
  return text
    .toLowerCase()
    // Vietnamese vowels with diacritics
    .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a")
    .replace(/[èéẹẻẽêềếệểễ]/g, "e")
    .replace(/[ìíịỉĩ]/g, "i")
    .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o")
    .replace(/[ùúụủũưừứựửữ]/g, "u")
    .replace(/[ỳýỵỷỹ]/g, "y")
    .replace(/đ/g, "d")
    // Remove any remaining accents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
};

/**
 * Checks if the search query matches the target text
 * Supports both exact match and Vietnamese diacritic-insensitive match
 */
export const flexibleMatch = (target: string, query: string): boolean => {
  if (!target || !query) return false;
  
  const normalizedTarget = normalizeVietnamese(target);
  const normalizedQuery = normalizeVietnamese(query);
  
  // Check both normalized and original for best matching
  return (
    normalizedTarget.includes(normalizedQuery) ||
    target.toLowerCase().includes(query.toLowerCase())
  );
};
