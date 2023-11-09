import { useMemo, useState } from "react";
import { Button, DatePicker, Form, Grid, Input, Select, Space, Table, Tag, Typography } from "antd";
import { createStyles } from "antd-style";
import { CloseOutlined, FileSearchOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import TableEmptyColumn from "@components/TableEmptyColumn";
import TableOverflowColumn from "@components/TableOverflowColumn";
import TablePriceColumn from "@components/TablePriceColumn";
import AlertIfError from "@components/AlertIfError";
import SearchKeywordInputExtraIcon from "@components/SearchKeywordInputExtraIcon";
import { GetOrdersResponse } from "@apis/order.api.types";
import OrderSystemCodes from "@utils/systemCodes/order";
import useOrders from "./useOrders";
import dayjs from "dayjs";

import type { ColumnsType } from "antd/es/table";
import type PaginationQuery from "@/types/commons/PaginationQuery";
import routeUtil from "@utils/route.util";
import { Routes } from "@/layouts/routes";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

type FormValues = {
  search: string | null;
  status?: string | null;
  placedAtRange?: [string | null, string | null] | null;
};

type QueryValues = FormValues & PaginationQuery;

const useStyle = createStyles(({ token }) => ({
  searchWrapper: {
    marginBottom: "1rem",
  },
  statusQuerySelect: {
    minWidth: "8rem",
  },
  orderNoColumn: {
    display: "flex",
  },
}));

const initPagination = {
  pageNumber: 1,
  pageSize: 10,
};

const initFormValue = {
  search: null,
  status: null,
  startAt: null,
  endAt: null,
};

const OrderStatusOptions = Object.entries(OrderSystemCodes).map(([_, { label, value }]) => ({ label, value }));

const AllOrders = () => {
  const { styles } = useStyle();
  const { lg } = useBreakpoint();
  const navigate = useNavigate();

  const [query, setQuery] = useState<QueryValues>({
    ...initFormValue,
    ...initPagination,
  });

  const [viewOrderNo, setViewOrderNo] = useState<string>();

  const { isError, error, isLoading, data, refetch } = useOrders(query);

  const [form] = Form.useForm();

  const columns: ColumnsType<GetOrdersResponse["items"][number]> = useMemo(() => {
    return [
      {
        key: "view",
        title: "檢視",
        dataIndex: "view",
        align: "center",
        width: "4rem",
        fixed: "left",
        render: (_: string, { orderNo }) => (
          <Button
            type="link"
            onClick={() => {
              setViewOrderNo(orderNo);
            }}
            icon={<FileSearchOutlined />}
          />
        ),
      },
      {
        key: "orderNo",
        title: "訂單編號",
        dataIndex: "orderNo",
        align: "center",
        width: "12rem",
        render: (_, { orderNo }) => {
          return (
            <Typography.Text className={styles.orderNoColumn} copyable={{ text: orderNo }}>
              <TableOverflowColumn value={orderNo} hasTooltip />
            </Typography.Text>
          );
          // return <TableOverflowColumn value={orderNo} hasTooltip />;
        },
      },
      {
        key: "contactPhone",
        title: "聯絡電話",
        dataIndex: "contactPhone",
        align: "center",
        width: "12rem",
      },
      {
        key: "shippingAddress",
        title: "收件地址",
        dataIndex: "shippingAddress",
        width: "16rem",
        render: (_, { shippingAddress }) => {
          return <TableOverflowColumn value={shippingAddress} hasTooltip />;
        },
      },
      {
        key: "note",
        title: "備註",
        dataIndex: "note",
        render: (_, { note }) => {
          return note ?? <TableEmptyColumn />;
        },
      },
      {
        key: "items",
        title: "訂購品項數",
        align: "right",
        width: "8rem",
        fixed: lg ? "right" : undefined,
        render: (_, { orderItems }) => {
          return <span>x {orderItems.length} 項商品</span>;
        },
      },
      {
        key: "placedAt",
        title: "訂購日期",
        align: "center",
        width: "10rem",
        fixed: lg ? "right" : undefined,
        render: (_, { placedAt }) => {
          return dayjs(placedAt).format("YYYY-MM-DD HH:mm");
        },
      },
      {
        key: "finalTotalPrice",
        title: "總計金額",
        align: "right",
        width: "6rem",
        fixed: "right",
        render: (_, { finalTotalPrice }) => {
          return <TablePriceColumn value={finalTotalPrice} />;
        },
      },
      {
        key: "status",
        title: "訂單狀態",
        align: "center",
        width: "8rem",
        fixed: "right",
        render: (_, { status }) => {
          const { label, color } = OrderSystemCodes[status] || {};
          return <Tag color={color}>{label}</Tag>;
        },
      },
    ];
  }, [styles, lg]);

  const handleFinish = (formValues: FormValues) => {
    setQuery({
      ...formValues,
      ...initPagination,
    });
  };

  return (
    <div>
      <AlertIfError isError={isError} description={error?.message} />
      <Form layout="inline" form={form} rootClassName={styles.searchWrapper} onFinish={handleFinish}>
        <Space size={[8, 16]} wrap>
          <Form.Item name="search" noStyle>
            <Input
              placeholder="請輸入關鍵字"
              suffix={<SearchKeywordInputExtraIcon filterColumns={["訂單編號", "出貨人員姓名", "出貨人員 Email"]} />}
            />
          </Form.Item>
          <Form.Item name="status" noStyle>
            <Select options={OrderStatusOptions} placeholder="訂單狀態" className={styles.statusQuerySelect} />
          </Form.Item>
          <Form.Item name="placedAtRange" noStyle>
            <DatePicker.RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              allowEmpty={[true, true]}
              placeholder={["訂單下訂開始時間", "訂單下訂結束時間"]}
            />
          </Form.Item>
          <Button htmlType="submit" icon={<SearchOutlined />}>
            搜尋
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => {
              form.resetFields();
              setQuery({ ...initPagination, ...form.getFieldsValue() });
            }}
          >
            清除
          </Button>
          <Button
            type="primary"
            onClick={() => {
              navigate(routeUtil.getRoutePath(Routes.PlaceOrder));
            }}
            icon={<PlusOutlined />}
          >
            訂購商品
          </Button>
        </Space>
      </Form>
      <Table
        rowKey="orderNo"
        columns={columns}
        loading={isLoading}
        dataSource={data?.items}
        scroll={{ x: "96rem" }}
        pagination={{
          current: query.pageNumber,
          pageSize: query.pageSize,
          total: data?.totalCount,
          onChange: (pageNumber, pageSize) => {
            setQuery((preQuery) => ({
              ...preQuery,
              pageNumber,
              pageSize,
            }));
          },
        }}
      />
    </div>
  );
};

export default AllOrders;
