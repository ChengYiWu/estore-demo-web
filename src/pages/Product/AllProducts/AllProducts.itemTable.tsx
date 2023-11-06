import { GetProductsResponse } from "@/apis/product.api.types";
import TableOverflowColumn from "@/components/TableOverflowColumn";
import TablePriceColumn from "@/components/TablePriceColumn";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

interface AllProductsItemTableProps {
  record: GetProductsResponse["items"][number];
}

const Columns: ColumnsType<GetProductsResponse["items"][number]["productItems"][number]> = [
  {
    key: "name",
    title: "項目名稱",
    dataIndex: "name",
    render: (_, { name }) => {
      return <TableOverflowColumn value={name} hasTooltip />;
    },
  },
  {
    key: "price",
    title: "項目價格",
    align: "right",
    dataIndex: "price",
    width: "8rem",
    render: (_, { price }) => {
      return price.toLocaleString();
    },
  },
  {
    key: "stockQuantity",
    title: "剩餘庫存",
    align: "right",
    dataIndex: "stockQuantity",
    width: "8rem",
    render: (_, { stockQuantity }) => {
      return (
        <span style={{ color: stockQuantity <= 20 ? "red" : "" }}>
          <TablePriceColumn value={stockQuantity} />{" "}
        </span>
      );
    },
  },
  {
    key: "placedOrderCount",
    title: "已下訂數量",
    align: "right",
    dataIndex: "placedOrderCount",
    width: "8rem",
    render: (_, { placedOrderCount }) => {
      return <TablePriceColumn value={placedOrderCount} />;
    },
  },
  {
    key: "cancelledOrderCount",
    title: "已取消數量",
    align: "right",
    dataIndex: "cancelledOrderCount",
    width: "8rem",
    render: (_, { cancelledOrderCount }) => {
      return <TablePriceColumn value={cancelledOrderCount} />;
    },
  },
  {
    key: "shippedOrderCount",
    title: "已出貨數量",
    align: "right",
    dataIndex: "shippedOrderCount",
    width: "8rem",
    render: (_, { cancelledOrderCount }) => {
      return <TablePriceColumn value={cancelledOrderCount} />;
    },
  },
  {
    key: "isActive",
    title: "是否上架",
    dataIndex: "name",
    align: "center",
    fixed: "right",
    width: "8rem",
    render: (_, { isActive }) => {
      return isActive ? (
        <Tooltip title="已上架">
          <EyeOutlined style={{ color: "#008800" }} />
        </Tooltip>
      ) : (
        <Tooltip title="未上架">
          <EyeInvisibleOutlined style={{ color: "#880000" }} />
        </Tooltip>
      );
    },
  },
];

const AllProductsItemTable = ({ record }: AllProductsItemTableProps) => {
  return <Table rowKey="id" columns={Columns} dataSource={record.productItems} pagination={false} />;
};

export default AllProductsItemTable;
