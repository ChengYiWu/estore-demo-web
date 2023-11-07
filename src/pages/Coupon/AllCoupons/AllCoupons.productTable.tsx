import { Table } from "antd";
import { GetCouponsResponse } from "@/apis/coupon.api.types";

import type { ColumnsType } from "antd/es/table";

interface AllCouponsProductTableProps {
  record: GetCouponsResponse["items"][number];
}

const Columns: ColumnsType<GetCouponsResponse["items"][number]["applicableProducts"][number]> = [
  {
    key: "name",
    title: "商品名稱",
    dataIndex: "name",
  },
  {
    key: "productItemCount",
    title: "商品項目數量",
    dataIndex: "ProductItemCount",
    render: (_, { productItemCount }) => {
      return productItemCount.toLocaleString();
    },
  },
];

const AllCouponsProductTable = ({ record }: AllCouponsProductTableProps) => {
  return <Table rowKey="id" columns={Columns} dataSource={record.applicableProducts} pagination={false} />;
};

export default AllCouponsProductTable;
