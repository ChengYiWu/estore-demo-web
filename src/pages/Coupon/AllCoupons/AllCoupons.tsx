import { useMemo, useState } from "react";
import { Button, Form, Input, Space, Tag, Tooltip, Table } from "antd";
import { CheckOutlined, CloseOutlined, PlusOutlined, SearchOutlined, StopOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import { Link, useNavigate } from "react-router-dom";
import AlertIfError from "@components/AlertIfError";
import SearchKeywordInputExtraIcon from "@components/SearchKeywordInputExtraIcon";
import TableDeleteIcon from "@components/TableDeleteIcon";
import TableEmptyColumn from "@components/TableEmptyColumn";
import TableOverflowColumn from "@components/TableOverflowColumn";
import TableEditIcon from "@components/TableEditIcon";
import routeUtil from "@utils/route.util";
import { antdUtils } from "@utils/antd.util";
import CouponSystemCodes from "@utils/systemCodes/coupon";
import { GetCouponsResponse } from "@apis/coupon.api.types";
import { Routes } from "@/layouts/routes";
import useCoupons from "./useCoupons";
import useDeleteCoupon from "./useDeleteCoupon";
import AllCouponsProductTable from "./AllCoupons.productTable";
import dayjs from "dayjs";

import type { ColumnsType } from "antd/es/table";
import type PaginationQuery from "@/types/commons/PaginationQuery";
import Content from "@components/Content";

type FormValues = {
  search: string | null;
  isActive: boolean | null;
  type: "PriceAmountDiscount" | "PercentDiscount" | null;
};

type QueryValues = FormValues & PaginationQuery;

const useStyle = createStyles(() => ({
  searchWrapper: {
    marginBottom: "1rem",
  },
}));

const initPagination = {
  pageNumber: 1,
  pageSize: 10,
};

const initFormValue = {
  search: null,
  isActive: null,
  type: null,
};

const AllCoupons = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [query, setQuery] = useState<QueryValues>({
    ...initFormValue,
    ...initPagination,
  });

  const { isError, error, isLoading, data, refetch } = useCoupons(query, setQuery);
  const { mutate: deleteCoupon } = useDeleteCoupon(refetch);

  const [form] = Form.useForm();

  const columns: ColumnsType<GetCouponsResponse["items"][number]> = useMemo(() => {
    return [
      {
        key: "edit",
        title: "編輯",
        dataIndex: "edit",
        align: "center",
        width: "4rem",
        fixed: "left",
        render: (_: string, record) =>
          record.isEditable ? (
            <Link to={`${routeUtil.getRoutePath(Routes.EditCoupon, { id: record.id })}`}>
              <TableEditIcon />
            </Link>
          ) : (
            <TableEmptyColumn />
          ),
      },
      {
        key: "delete",
        title: "刪除",
        dataIndex: "delete",
        align: "center",
        width: "4rem",
        fixed: "left",
        render: (_: string, { id, title, usedOrderCount, isEditable }) =>
          usedOrderCount <= 0 && isEditable ? (
            <Button
              type="link"
              onClick={() => {
                antdUtils.modal?.confirm({
                  title: "確認刪除",
                  content: `確定要刪除「${title}」優惠券嗎？`,
                  onOk: () => {
                    deleteCoupon(id.toString());
                  },
                });
              }}
              icon={<TableDeleteIcon />}
            />
          ) : (
            <TableEmptyColumn />
          ),
      },
      {
        key: "title",
        title: "優惠券名稱",
        dataIndex: "title",
        width: "12rem",
        render: (_, { title }) => {
          return <TableOverflowColumn value={title} hasTooltip />;
        },
      },
      {
        key: "code",
        title: "領取代碼",
        dataIndex: "code",
        width: "8rem",
        render: (_, { code }) => {
          return <TableOverflowColumn value={code} hasTooltip />;
        },
      },
      {
        key: "description",
        title: "商品描述",
        dataIndex: "description",
        width: "20rem",
        responsive: ["lg"],
        render: (_, { description }) => {
          return <TableOverflowColumn value={description} maxLine={3} hasTooltip />;
        },
      },
      {
        key: "dateRange",
        title: "有效期間",
        dataIndex: "dateRange",
        align: "center",
        width: "20rem",
        render: (_, { startedAt, expiredAt }) => {
          return `${startedAt ? dayjs(startedAt).format("YYYY-MM-DD HH:mm") : "無"} ~ ${
            expiredAt ? dayjs(expiredAt).format("YYYY-MM-DD HH:mm") : "無"
          }`;
        },
      },
      {
        key: "type",
        title: "折扣類型",
        align: "center",
        dataIndex: "type",
        width: "8rem",
        render: (_, { type, priceAmountDiscount, pricePercentDiscount }) => {
          switch (type) {
            case CouponSystemCodes.PriceAmountDiscount.value:
              return (
                <Tag style={{ color: CouponSystemCodes[type].color }}>
                  {CouponSystemCodes[type].label} / {priceAmountDiscount} {CouponSystemCodes.PriceAmountDiscount.unit}
                </Tag>
              );
            case CouponSystemCodes.PricePercentDiscount.value:
              return (
                <Tag style={{ color: CouponSystemCodes[type].color }}>
                  {CouponSystemCodes[type].label} / {pricePercentDiscount} {CouponSystemCodes.PricePercentDiscount.unit}
                </Tag>
              );
            default:
              return <TableEmptyColumn />;
          }
        },
      },
      {
        key: "isActive",
        title: "可否使用",
        align: "center",
        dataIndex: "isActive",
        width: "6rem",
        render: (_, { isActive }) => {
          return isActive ? (
            <Tooltip title="可使用">
              <CheckOutlined style={{ color: "#008800" }} />
            </Tooltip>
          ) : (
            <Tooltip title="不可用">
              <StopOutlined style={{ color: "#880000" }} />
            </Tooltip>
          );
        },
      },
      {
        key: "applicableProducts",
        title: "可用商品",
        render: (_, { applicableProducts }) => {
          const count = applicableProducts.length;
          return count > 0 ? <span>x {count} 個商品</span> : <TableEmptyColumn />;
        },
      },
    ];
  }, [deleteCoupon]);

  const handleFinish = (formValues: FormValues) => {
    setQuery({
      ...formValues,
      ...initPagination,
    });
  };

  return (
    <Content>
      <AlertIfError isError={isError} description={error?.message} />
      <Form layout="inline" form={form} rootClassName={styles.searchWrapper} onFinish={handleFinish}>
        <Space>
          <Form.Item name="search" noStyle>
            <Input
              placeholder="請輸入關鍵字"
              suffix={<SearchKeywordInputExtraIcon filterColumns={["優惠券名稱", "領取代碼"]} />}
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
              navigate(routeUtil.getRoutePath(Routes.CreateCoupon));
            }}
            icon={<PlusOutlined />}
          >
            新增優惠券
          </Button>
        </Space>
      </Form>
      <Table
        rowKey="id"
        columns={columns}
        loading={isLoading}
        dataSource={data?.items}
        scroll={{ x: "100rem" }}
        expandable={{
          expandedRowRender: (record) => <AllCouponsProductTable record={record} />,
          rowExpandable: (record) => record?.applicableProducts.length > 0,
        }}
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
    </Content>
  );
};

export default AllCoupons;
