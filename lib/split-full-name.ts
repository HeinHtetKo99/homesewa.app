export function splitFullName(fullName: string): {
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
} {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: null, middleName: null, lastName: null };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], middleName: null, lastName: null };
  }
  if (parts.length === 2) {
    return { firstName: parts[0], middleName: null, lastName: parts[1] };
  }
  return {
    firstName: parts[0],
    middleName: parts.slice(1, -1).join(" "),
    lastName: parts[parts.length - 1],
  };
}
