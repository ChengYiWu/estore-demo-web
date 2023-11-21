import { useState } from "react";
import { Button, Form, Input, Space, Table, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useUsers from "./useUsers";
import AlertIfError from "@components/AlertIfError";
import { Routes } from "@/layouts/routes";
import routeUtil from "@utils/route.util";
import { getUsersResponse } from "@/apis/user.api.types";
import type { ColumnsType } from "antd/es/table";
import EditIcon from "@/components/TableEditIcon";
import { CloseOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { createStyles } from "antd-style";
import PaginationQuery from "@/types/commons/PaginationQuery";
import SearchKeywordInputExtraIcon from "@components/SearchKeywordInputExtraIcon";
import Content from "@components/Content";

type FormValues = {
  search: string | null;
};

type QueryValues = FormValues & PaginationQuery;

const useStyle = createStyles(() => ({
  searchWrapper: {
    marginBottom: "1rem",
  },
}));

const Columns: ColumnsType<getUsersResponse["items"][number]> = [
  // 不允許編輯
  // {
  //   key: "edit",
  //   title: "編輯",
  //   dataIndex: "edit",
  //   align: "center",
  //   width: "4rem",
  //   fixed: "left",
  //   render: (_: string, record) => (
  //     <Link to={`${routeUtil.getRoutePath(Routes.EditUser, { id: record.id })}`}>
  //       <EditIcon />
  //     </Link>
  //   ),
  // },
  {
    key: "email",
    title: "電子信箱",
    dataIndex: "email",
    width: "16rem",
  },
  {
    key: "userName",
    title: "使用者名稱",
    dataIndex: "userName",
    width: "16rem",
  },
  {
    key: "roles",
    title: "角色",
    dataIndex: "roles",
    render: (_, { roles }) => roles.map((role) => <Tag key={role.id}>{role.name}</Tag>),
  },
];

const initPagination = {
  pageNumber: 1,
  pageSize: 10,
};

const initFormValue = {
  search: null,
};

const AllUsers = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();
  const [query, setQuery] = useState<QueryValues>({
    ...initFormValue,
    ...initPagination,
  });
  const { isError, error, isLoading, data } = useUsers(query);

  const [form] = Form.useForm();

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
              suffix={<SearchKeywordInputExtraIcon filterColumns={["電子郵件", "使用者姓名"]} />}
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
          {/* 不允許新增 */}
          {/* <Button
            type="primary"
            onClick={() => {
              navigate(routeUtil.getRoutePath(Routes.CreateUser));
            }}
            icon={<PlusOutlined />}
          >
            新增使用者
          </Button> */}
        </Space>
      </Form>
      <Table
        rowKey="id"
        columns={Columns}
        loading={isLoading}
        dataSource={data?.items}
        scroll={{ x: "64rem" }}
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

export default AllUsers;
