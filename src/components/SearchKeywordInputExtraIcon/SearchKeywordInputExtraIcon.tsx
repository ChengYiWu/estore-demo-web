import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const SearchKeywordInputExtraIcon = ({ filterColumns = [] }: { filterColumns: string[] }) => {
  return (
    <Tooltip
      title={
        filterColumns?.length > 0 ? (
          <div>
            <div>關鍵字搜尋欄位：</div>
            <ul style={{ paddingLeft: "2rem" }}>
              {filterColumns.map((filterColumn, index) => (
                <li key={index} style={{ listStyle: "circle" }}>
                  {filterColumn}
                </li>
              ))}
            </ul>
          </div>
        ) : null
      }
    >
      <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
    </Tooltip>
  );
};

export default SearchKeywordInputExtraIcon;
