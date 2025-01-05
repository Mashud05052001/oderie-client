export const getStringLastPortion = (str: string) =>
  str.split(" ")[str.split(" ").length - 1];

export const getStringFirstPortion = (str: string) => str.split(" ")[0];

export const onlyFirstCharacterCapitalize = (str: string) =>
  str[0].toUpperCase() + str.slice(1).toLowerCase();
