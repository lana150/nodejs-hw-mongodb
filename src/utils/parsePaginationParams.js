export const parsePaginationParams = (query) => {
  const parseNumber = (number, defaultValue) => {
    const parsedNumber = parseInt(number, 10);
    return Number.isNaN(parsedNumber) || parsedNumber <= 0 ? defaultValue : parsedNumber;
  };

  return {
    page: parseNumber(query.page, 1),
    perPage: parseNumber(query.perPage, 10),
  };
};



/*const parseNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parsedNumber)) {
    return defaultValue;
  }

  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};*/