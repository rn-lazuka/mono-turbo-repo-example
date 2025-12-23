export const parseArrayParam = (
  paramName: string,
  searchParams: URLSearchParams
): string[] | null => {
  const paramValue = searchParams.get(paramName);
  return paramValue ? paramValue.split(',') : null;
};

export const parseRangeParam = (
  paramName: string,
  searchParams: URLSearchParams
): [number, number] | null => {
  const paramValue = searchParams.get(paramName);
  if (paramValue) {
    const [min, max] = paramValue.split(',').map((str) => parseFloat(str));
    if (!isNaN(min) && !isNaN(max)) {
      return [min, max];
    }
  }
  return null;
};

export const parseParamToNumber = (
  paramName: string,
  searchParams: URLSearchParams
): number | null => {
  const paramValue = searchParams.get(paramName);
  return paramValue ? Number(paramValue) : null;
};

export const parseParamToString = (
  paramName: string,
  searchParams: URLSearchParams
): string | null => {
  const paramValue = searchParams.get(paramName);
  return paramValue ? paramValue : null;
};
