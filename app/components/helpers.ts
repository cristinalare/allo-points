export const formatNumber = (value?: number) => {
  return value ? new Intl.NumberFormat().format(value) : 0;
};
