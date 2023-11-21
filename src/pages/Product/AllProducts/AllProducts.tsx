import PaginationQuery from "@/types/commons/PaginationQuery";
import { Button, Form, Image, Input, Space, Table } from "antd";
import { createStyles } from "antd-style";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "./useProducts";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import routeUtil from "@/utils/route.util";
import SearchKeywordInputExtraIcon from "@/components/SearchKeywordInputExtraIcon";
import AlertIfError from "@/components/AlertIfError";
import { Routes } from "@/layouts/routes";
import { GetProductsResponse } from "@/apis/product.api.types";
import { ColumnsType } from "antd/es/table";
import EditIcon from "@/components/TableEditIcon";
import TableOverflowColumn from "@/components/TableOverflowColumn";
import AllProductsItemTable from "./AllProducts.itemTable";
import TableEmptyColumn from "@/components/TableEmptyColumn";
import { antdUtils } from "@/utils/antd.util";
import useDeleteProduct from "./useDeleteProduct";
import TableDeleteIcon from "@/components/TableDeleteIcon";
import Content from "@components/Content";

type FormValues = {
  search: string | null;
};

type QueryValues = FormValues & PaginationQuery;

const useStyle = createStyles(({ token }) => ({
  searchWrapper: {
    marginBottom: "1rem",
  },
  pictureIcon: {
    color: token.colorPrimary,
  },
}));

const initPagination = {
  pageNumber: 1,
  pageSize: 10,
};

const initFormValue = {
  search: null,
};

const AllProducts = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [query, setQuery] = useState<QueryValues>({
    ...initFormValue,
    ...initPagination,
  });

  const { isError, error, isLoading, data, refetch } = useProducts(query, setQuery);
  const { mutate: deleteProduct } = useDeleteProduct(refetch);

  const [form] = Form.useForm();

  const columns: ColumnsType<GetProductsResponse["items"][number]> = useMemo(() => {
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
            <Link to={`${routeUtil.getRoutePath(Routes.EditProduct, { id: record.id })}`}>
              <EditIcon />
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
        render: (_: string, { id, name, isEditable }) =>
          isEditable ? (
            <Button
              type="link"
              onClick={() => {
                antdUtils.modal?.confirm({
                  title: "確認刪除",
                  content: `確定要刪除「${name}」商品嗎？`,
                  onOk: () => {
                    deleteProduct(id.toString());
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
        key: "images",
        title: "商品圖片",
        dataIndex: "images",
        align: "center",
        width: "6rem",
        render: (_, { images }) => {
          if (images.length === 0) return <TableEmptyColumn />;
          return (
            <Image.PreviewGroup items={images.map((image) => image.uri)}>
              <Image src={images?.[0]?.uri} />
            </Image.PreviewGroup>
          );
        },
      },
      {
        key: "name",
        title: "商品名稱",
        dataIndex: "name",
        render: (_, { name }) => {
          return <TableOverflowColumn value={name} hasTooltip />;
        },
      },
      {
        key: "description",
        title: "商品描述",
        dataIndex: "description",
        responsive: ["lg"],
        render: (_, { description }) => {
          return <TableOverflowColumn value={description} maxLine={3} hasTooltip />;
        },
      },
      {
        key: "brand",
        title: "品牌",
        dataIndex: "brand",
        width: "12rem",
        render: (_, { name }) => {
          return <TableOverflowColumn value={name} hasTooltip />;
        },
      },
      {
        key: "dimensions",
        title: "尺寸",
        align: "center",
        dataIndex: "dimensions",
        width: "12rem",
        render: (_, { dimensions }) => {
          return dimensions ? <TableOverflowColumn value={dimensions} hasTooltip /> : <TableEmptyColumn />;
        },
      },
      {
        key: "weight",
        title: "寬度",
        align: "center",
        dataIndex: "weight",
        width: "12rem",
        render: (_, { weight }) => {
          return weight ? <TableOverflowColumn value={weight} hasTooltip /> : <TableEmptyColumn />;
        },
      },
      {
        key: "items",
        title: "項目明細",
        align: "right",
        width: "8rem",
        fixed: "right",
        render: (_, { productItems }) => {
          const count = productItems.length;
          return count > 0 ? <span>x {count} 項</span> : <TableEmptyColumn />;
        },
      },
    ];
  }, [deleteProduct]);

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
            <Input placeholder="請輸入關鍵字" suffix={<SearchKeywordInputExtraIcon filterColumns={["商品名稱"]} />} />
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
              navigate(routeUtil.getRoutePath(Routes.CreateProduct));
            }}
            icon={<PlusOutlined />}
          >
            新增商品
          </Button>
        </Space>
      </Form>
      <Table
        rowKey="id"
        columns={columns}
        loading={isLoading}
        dataSource={data?.items}
        scroll={{ x: "80rem" }}
        expandable={{
          expandedRowRender: (record) => <AllProductsItemTable record={record} />,
          rowExpandable: (record) => record?.productItems?.length > 0,
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

export default AllProducts;
