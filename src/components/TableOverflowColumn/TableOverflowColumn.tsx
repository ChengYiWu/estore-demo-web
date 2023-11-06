import { Tooltip } from "antd";
import TableEmptyColumn from "../TableEmptyColumn";

interface TableOverflowColumnProps {
  value: string | null;
  maxLine?: number;
  hasTooltip?: boolean;
  title?: string;
}

const TableOverflowColumn = ({ value, maxLine = 1, hasTooltip, title }: TableOverflowColumnProps) => {
  return value ? (
    <span
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: maxLine,
        WebkitBoxOrient: "vertical",
        whiteSpace: "pre-wrap",
        wordBreak: "break-word",
      }}
    >
      {hasTooltip ? (
        <Tooltip title={<span style={{ whiteSpace: "pre-wrap" }}>{title ? title : value}</span>}>{value}</Tooltip>
      ) : (
        value
      )}
    </span>
  ) : (
    <TableEmptyColumn />
  );
};

export default TableOverflowColumn;
