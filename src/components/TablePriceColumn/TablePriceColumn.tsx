const TablePriceColumn = ({ value }: { value: number | string | null }) => {
  return value?.toLocaleString();
};

export default TablePriceColumn;
