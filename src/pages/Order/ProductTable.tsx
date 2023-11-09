import { Table } from "antd";
import { GetOrderResponse, GetOrdersResponse } from "@apis/order.api.types";
import { useMemo } from "react";
import { createStyles } from "antd-style";
import TableOverflowColumn from "@components/TableOverflowColumn";
import TablePriceColumn from "@components/TablePriceColumn";

export type OrderItems = GetOrdersResponse["items"][number]["orderItems"] | GetOrderResponse["orderItems"];
export type OrderItem = OrderItems[number];

interface ProductTableProps {
  product: {
    id: string;
    name: string;
  };
  productItems: OrderItem[];
}

const useStyles = createStyles(({ token }) => ({
  productWrapper: {
    padding: "1rem 2rem 2rem 2rem",
    background: "#efefef",
    borderRadius: "8px",
    "& .productName": {
      fontSize: "1.25rem",
      fontWeight: 600,
      marginBottom: "0.5rem",
    },
    "& .items": {
      marginLeft: "1rem",
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
    },
    "& .productItemWrapper": {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      "& .anticon": {
        flex: 0,
        cursor: "pointer",
        "&.delete": {
          color: token.colorError,
        },
        "&.edit": {
          color: token.colorPrimary,
        },
        "& svg": {
          width: "1rem",
          height: "1rem",
        },
      },
      "& .quantity": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        fontWeight: 600,
      },
      "& .name": {
        flex: 1,
      },
    },
  },
}));

const ProductTable = ({ product, productItems = [] }: ProductTableProps) => {
  const { styles } = useStyles();

  const totalPrice = useMemo(
    () => productItems.reduce((acc, item) => acc + item.orderItemPrice * item.orderItemQuantity, 0).toLocaleString(),
    [productItems],
  );

  return (
    <div className={styles.productWrapper}>
      <div className="productName">{product?.name}</div>
      <div className="items">
        <Table
          rowKey="orderItemId"
          dataSource={productItems}
          bordered={false}
          pagination={false}
          title={() => <span>商品總計：{totalPrice}</span>}
          columns={[
            {
              title: "品項名稱",
              dataIndex: "name",
              render: (_, { productItemName }) => {
                return <TableOverflowColumn value={productItemName} hasTooltip />;
              },
            },
            {
              title: "數量",
              dataIndex: "quantity",
              align: "center",
              render: (_, { orderItemQuantity }) => {
                return <TablePriceColumn value={orderItemQuantity} />;
              },
            },
            {
              title: "單價",
              dataIndex: "price",
              align: "center",
              render: (_, { orderItemPrice }) => {
                return <TablePriceColumn value={orderItemPrice} />;
              },
            },
            {
              title: "小計",
              dataIndex: "subtotal",
              align: "center",
              render: (_, { orderItemPrice, orderItemQuantity }) => {
                return <TablePriceColumn value={orderItemPrice * orderItemQuantity} />;
              },
            },
          ]}
          scroll={{ x: "40rem" }}
        />
      </div>
    </div>
  );
};

export default ProductTable;
