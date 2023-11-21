import { useMemo, useState } from "react";
import { Button, Col, Form, Input, Row, Select, Space, Table, Tag } from "antd";
import { createStyles } from "antd-style";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import TableEditIcon from "@components/TableEditIcon";
import TableDeleteIcon from "@components/TableDeleteIcon";
import TablePriceColumn from "@components/TablePriceColumn";
import TableOverflowColumn from "@components/TableOverflowColumn";
import AlertIfError from "@components/AlertIfError";
import { antdUtils } from "@utils/antd.util";
import useUserList from "@hooks/useUserList";
import PlaceOrderProductModal from "./PlaceOrder.productModal";
import usePlaceOrder from "./usePlaceOrder";
import { groupBy, map } from "lodash";

import type { ProductItemWithQuantity } from "./PlaceOrder.productModal";
import useCouponList from "@hooks/useCouponList";
import Content from "@components/Content";

type ProductItemFormValues = {
  productItemId: number;
  quantity: number;
};

type OrderFormValues = {
  contactPhone: string;
  shippingAddress: string;
  note?: string;
  customerId: string;
  couponCode?: string;
  items: ProductItemFormValues[];
};

type ProductItemModal = {
  productItems: ProductItemWithQuantity[];
  modifyProductItem: ProductItemWithQuantity | null;
  open: boolean;
};

const useStyles = createStyles(({ token }) => ({
  root: {
    minHeight: "100%",
  },
  shopList: {
    marginTop: "0.5rem",
    width: "100%",
  },
  totalPrice: {
    fontWeight: 600,
    fontSize: "1rem",
    "& .price": {
      fontSize: "1.25rem",
      color: "#ed5858",
      margin: "0 0.5rem",
    },
  },
  productWrapper: {
    padding: "1rem 2rem 2rem 2rem",
    background: "#efefef",
    borderRadius: "8px",
    "& .productName": {
      fontSize: "1.5rem",
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
  couponSelectTag: {
    marginLeft: "0.5rem",
  },
}));

const PlaceOrder = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const [form] = Form.useForm<OrderFormValues>();
  const {
    isLoading: isUserListLoading,
    isError: isUserListError,
    error: userListError,
    data: userList,
  } = useUserList();

  const { mutate: placeOrder, error, isError } = usePlaceOrder();
  const {
    data: couponList,
    isLoading: isCouponListLoading,
    error: couponListError,
    isError: isCouponListError,
  } = useCouponList();

  const [productItemModal, setProductItemModal] = useState<ProductItemModal>({
    open: false,
    productItems: [],
    modifyProductItem: null,
  });

  const productItemGroup = useMemo(() => {
    const productItemGroup = groupBy(productItemModal.productItems, "productId");
    return map(productItemGroup, (productItems, productId) => ({
      productId,
      productName: productItems?.[0].productName,
      items: productItems,
    }));
  }, [productItemModal.productItems]);

  const userListOptions = useMemo(() => {
    return userList?.map(({ id, userName }) => ({ value: id, label: userName })) || [];
  }, [userList]);

  const couponListOptions = useMemo(() => {
    return (
      couponList?.items?.map(({ code, title, applicableProducts }) => ({
        value: code,
        label: (
          <span>
            {title}
            <span className={styles.couponSelectTag}>
              {applicableProducts.map((applicableProduct) => (
                <Tag key={applicableProduct.id}>{applicableProduct.name}</Tag>
              ))}
            </span>
          </span>
        ),
      })) || []
    );
  }, [couponList, styles]);

  const handleFisih = (values: OrderFormValues) => {
    if (productItemModal.productItems.length === 0) {
      antdUtils.message?.error("請選擇購買商品");
      return;
    }

    const formValue = {
      ...values,
      items: productItemModal.productItems.map((item) => ({
        productItemId: item.id,
        quantity: item.quantity,
      })),
    };

    placeOrder(formValue);
  };

  const handleSaveProductItem = (productItem: ProductItemWithQuantity) => {
    setProductItemModal((pre) => {
      // 採用替換的方式，避免順序變動
      let isReplaced = false;
      let newProductItems = pre.productItems.map((item) => {
        if (item.id === productItem.id) {
          isReplaced = true;
          return productItem;
        }

        return item;
      });

      newProductItems = [...newProductItems, ...(isReplaced ? [] : [productItem])];

      return { ...pre, modifyProductItem: null, productItems: newProductItems, open: false };
    });

    setTimeout(() => {
      form.validateFields(["couponCode"]);
    }, 0);
  };

  const handleCancelProductItem = () => {
    setProductItemModal((pre) => ({ ...pre, open: false }));
  };

  const handleEditProductItem = (productItem: ProductItemWithQuantity) => {
    setProductItemModal((pre) => ({ ...pre, open: true, modifyProductItem: productItem }));
  };

  const handleDeleteProductItem = (productItem: ProductItemWithQuantity) => {
    setProductItemModal((pre) => {
      const remaingProductItems = pre.productItems.filter((item) => item.id !== productItem.id);
      return { ...pre, productItems: remaingProductItems };
    });

    setTimeout(() => {
      form.validateFields(["couponCode"]);
    }, 0);
  };

  const itemLayout = {
    wrapperCol: { xs: { span: 24 }, sm: { offset: 3, span: 18 } },
  };

  return (
    <Content>
      <div className={styles.root}>
        <PlaceOrderProductModal
          open={productItemModal.open}
          modifyProductItem={productItemModal.modifyProductItem}
          selectedProductItems={productItemModal.productItems}
          onOk={handleSaveProductItem}
          onCancel={handleCancelProductItem}
        />
        <AlertIfError isError={isUserListError} description={userListError?.message} />
        <AlertIfError isError={isError} description={error?.message} />
        <AlertIfError isError={isCouponListError} description={couponListError?.message} />
        <Form form={form} onFinish={handleFisih} colon={false} labelCol={{ span: 3 }} wrapperCol={{ span: 18 }}>
          <Form.Item
            name="contactPhone"
            label="聯絡電話"
            extra="例如：0912345678"
            rules={[
              {
                required: true,
                message: "請輸入聯絡電話",
              },
              {
                max: 64,
                message: "聯絡電話最多128個字",
              },
              {
                pattern: new RegExp("^09[0-9]{8}$"),
                message: "聯絡電話格式錯誤",
              },
            ]}
          >
            <Input placeholder="請輸入聯絡電話" />
          </Form.Item>
          <Form.Item
            name="shippingAddress"
            label="收件地址"
            rules={[
              {
                required: true,
                message: "請輸入收件地址",
              },
            ]}
          >
            <Input placeholder="請輸入收件地址" />
          </Form.Item>
          <Form.Item name="note" label="請輸入備註">
            <Input.TextArea placeholder="請輸入備註" />
          </Form.Item>
          <Form.Item
            name="customerId"
            label="訂購顧客"
            rules={[
              {
                required: true,
                message: "請選擇訂購顧客",
              },
            ]}
          >
            <Select options={userListOptions} loading={isUserListLoading} placeholder="請選擇訂購顧客" />
          </Form.Item>
          <Form.Item
            name="couponCode"
            label="優惠券"
            rules={[
              {
                validator(_, value) {
                  if (value && productItemModal.productItems?.length > 0) {
                    const currentCoupon = couponList?.items?.find((coupon) => coupon.code === value);

                    if (currentCoupon) {
                      const allowedProductIds = currentCoupon.applicableProducts.map(
                        (applicableProduct) => applicableProduct.id,
                      );

                      const isAllProductAllowed = productItemModal.productItems.every(({ productId }) =>
                        allowedProductIds.includes(productId),
                      );

                      return isAllProductAllowed ? Promise.resolve() : Promise.reject("優惠券不適用於購買清單商品");
                    }
                  }

                  return Promise.resolve();
                },
              },
            ]}
          >
            <Select options={couponListOptions} loading={isCouponListLoading} placeholder="請選擇優惠券" />
          </Form.Item>
          <Form.Item label="購買清單" required>
            <div>
              <Button
                icon={<PlusOutlined />}
                onClick={() => {
                  setProductItemModal((prev) => ({ ...prev, modifyProductItem: null, open: true }));
                }}
              >
                選擇商品
              </Button>
              <div className={styles.totalPrice}>
                總計：
                <span className="price">
                  {productItemModal.productItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toLocaleString()}
                </span>
                元
              </div>
            </div>
            <Form.Item>
              <Space direction="vertical" size={[16, 16]} className={styles.shopList}>
                {productItemGroup.map((productItemGroup) => {
                  const totalPrice = productItemGroup.items.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                  }, 0);
                  return (
                    <div key={productItemGroup.productId} className={styles.productWrapper}>
                      <div className="productName">{productItemGroup.productName}</div>
                      <div className="items">
                        <Table
                          rowKey="id"
                          dataSource={productItemGroup.items}
                          bordered={false}
                          pagination={false}
                          title={() => <span>商品總計：{totalPrice.toLocaleString()}</span>}
                          columns={[
                            {
                              title: "編輯",
                              dataIndex: "edit",
                              align: "center",
                              width: "4rem",
                              render: (_, productItem) => {
                                return <TableEditIcon onClick={() => handleEditProductItem(productItem)} />;
                              },
                            },
                            {
                              title: "刪除",
                              dataIndex: "delete",
                              align: "center",
                              width: "4rem",
                              render: (_, productItem) => {
                                return <TableDeleteIcon onClick={() => handleDeleteProductItem(productItem)} />;
                              },
                            },
                            {
                              title: "品項名稱",
                              dataIndex: "name",
                              render: (_, { name }) => {
                                return <TableOverflowColumn value={name} hasTooltip />;
                              },
                            },
                            {
                              title: "數量",
                              dataIndex: "quantity",
                              align: "center",
                              render: (_, { quantity }) => {
                                return <TablePriceColumn value={quantity} />;
                              },
                            },
                            {
                              title: "單價",
                              dataIndex: "price",
                              align: "center",
                              render: (_, { price }) => {
                                return <TablePriceColumn value={price} />;
                              },
                            },
                            {
                              title: "小計",
                              dataIndex: "subtotal",
                              align: "center",
                              render: (_, { price, quantity }) => {
                                return <TablePriceColumn value={price * quantity} />;
                              },
                            },
                          ]}
                          scroll={{ x: "40rem" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Space>
            </Form.Item>
          </Form.Item>
          <Form.Item {...itemLayout} label="">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={4}>
                <Button block type="primary" htmlType="submit">
                  儲存
                </Button>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Button
                  block
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  回上頁
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};

export default PlaceOrder;
