export const isValidPhone = (phone) => {
  return phone
    .split("")
    .every((letter) =>
      [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "0",
        "(",
        ")",
        "+",
      ].includes(letter)
    );
};
