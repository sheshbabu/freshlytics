function getCurrentDateInUtc() {
  const now = new Date();
  const date = now
    .getUTCDate()
    .toString()
    .padStart(2, "0");
  const month = (now.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = now.getFullYear();

  return `${year}-${month}-${date}`;
}

export default {
  getCurrentDateInUtc
};
