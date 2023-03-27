export function sortCities(a, b) {
  if (!a.includes("(") && !b.includes("(")) {
    return 0;
  }
  const aIdx = a.indexOf("(");
  const bIdx = b.indexOf("(");

  if (a.slice(aIdx).toLowerCase() > b.slice(bIdx).toLowerCase()) {
    return 1;
  }

  if (a.slice(aIdx).toLowerCase() < b.slice(bIdx).toLowerCase()) {
    return -1;
  }

  return 0;
}
