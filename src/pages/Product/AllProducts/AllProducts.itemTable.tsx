import { GetProductsResponse } from "@/apis/product.api.types";
import TableEmptyColumn from "@/components/TableEmptyColumn";
import TableOverflowColumn from "@/components/TableOverflowColumn";
import TablePriceColumn from "@/components/TablePriceColumn";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Table, Tooltip, Image } from "antd";
import { ColumnsType } from "antd/es/table";

interface AllProductsItemTableProps {
  record: GetProductsResponse["items"][number];
}

const Columns: ColumnsType<GetProductsResponse["items"][number]["productItems"][number]> = [
  {
    key: "image",
    title: "品項圖片",
    dataIndex: "image",
    align: "center",
    width: "6rem",
    render: (_, { image }) => {
      return image ? (
        <Image.PreviewGroup items={[image.uri]}>
          <Image src={image.uri} />
        </Image.PreviewGroup>
      ) : (
        <TableEmptyColumn />
      );
    },
  },
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
    width: "6rem",
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
    title: "下訂",
    align: "right",
    dataIndex: "placedOrderCount",
    width: "4rem",
    render: (_, { placedOrderCount }) => {
      return <TablePriceColumn value={placedOrderCount} />;
    },
  },
  {
    key: "cancelledOrderCount",
    title: "取消",
    align: "right",
    dataIndex: "cancelledOrderCount",
    width: "4rem",
    render: (_, { cancelledOrderCount }) => {
      return <TablePriceColumn value={cancelledOrderCount} />;
    },
  },
  {
    key: "shippedOrderCount",
    title: "出貨",
    align: "right",
    dataIndex: "shippedOrderCount",
    width: "4rem",
    render: (_, { cancelledOrderCount }) => {
      return <TablePriceColumn value={cancelledOrderCount} />;
    },
  },
  {
    key: "isActive",
    title: "上架",
    dataIndex: "name",
    align: "center",
    width: "4rem",
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
