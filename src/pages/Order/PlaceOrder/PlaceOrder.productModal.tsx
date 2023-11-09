import { useEffect, useMemo } from "react";
import useProductList from "@hooks/useProductList";
import { Button, Form, InputNumber, Modal, Select, Space, Tag } from "antd";
import AlertIfError from "@components/AlertIfError";
import { GetProductListResponse } from "@apis/product.api.types";
import { InfoCircleOutlined } from "@ant-design/icons";
import { createStyles, cx } from "antd-style";
import { map } from "lodash";

interface PlaceOrderProductModalProps {
  open: boolean;
  selectedProductItems: ProductItemWithQuantity[];
  modifyProductItem: ProductItemWithQuantity | null;
  onOk?: (productItem: ProductItemWithQuantity) => void;
  onCancel?: () => void;
}
type flattenProductListItem = GetProductListResponse["items"][number]["productItems"][number] & {
  productId: number;
  productName: string;
};

export type ProductItemWithQuantity = flattenProductListItem & {
  quantity: number;
};

const useStyles = createStyles(({ token }) => ({
  numberExtra: {
    marginTop: "0.5rem",
    color: token.colorInfo,
    display: "flex",
    gap: "0.25rem",
  },
  numberInput: {
    width: "100%",
  },
  disabledTag: {
    color: token.colorTextDisabled,
  },
}));

const PlaceOrderProductModal = ({
  open,
  selectedProductItems = [],
  modifyProductItem,
  onOk,
  onCancel,
}: PlaceOrderProductModalProps) => {
  const { styles } = useStyles();
  const { isLoading, isError, error, data: productList } = useProductList();
  const selectedProductItemIds = useMemo(() => map(selectedProductItems, "id"), [selectedProductItems]);
  const isUpdate = !!modifyProductItem;

  const productListOptions = useMemo(() => {
    return (
      productList?.items?.map((product) => {
        return {
          label: product.name,
          options: product.productItems.map((item) => {
            const isDisabled = selectedProductItemIds.indexOf(item.id) > -1 || item.stockQuantity <= 0 || false;
            return {
              ...item,
              value: item.id,
              label: (
                <span>
                  <Tag className={cx(isDisabled && styles.disabledTag)}>
                    庫存：{item.stockQuantity} | 價格：{item.price.toLocaleString()}
                  </Tag>
                  {item.name}
                </span>
              ),
              disabled: isDisabled,
            };
          }),
        };
      }) || []
    );
  }, [productList, selectedProductItemIds, styles]);

  const flattenProductListItem = useMemo(() => {
    return productList?.items?.reduce((acc, product) => {
      product.productItems?.forEach((item) => {
        acc.push({
          ...item,
          productId: product.id,
          productName: product.name,
        } as flattenProductListItem);
      });
      return acc;
    }, [] as flattenProductListItem[]);
  }, [productList]);

  const [form] = Form.useForm();

  const productItemId = Form.useWatch("productItemId", form);

  useEffect(() => {
    if (open && modifyProductItem) {
      form.setFieldsValue({
        productItemId: modifyProductItem.id,
        quantity: modifyProductItem.quantity,
      });
    }

    return () => {
      if (open) {
        setTimeout(() => {
          form.resetFields();
        }, 300);
      }
    };
  }, [open, modifyProductItem, form]);

  const currentProductItem = useMemo(
    () => flattenProductListItem?.find((item) => item.id === productItemId),
    [productItemId, flattenProductListItem],
  );

  const handleAdd = async () => {
    try {
      const values = await form.validateFields();
      onOk && onOk({ ...currentProductItem, ...values });
    } catch {}
  };

  return (
    <Modal
      title="商品清單"
      open={open}
      footer={[
        <Button key="close" onClick={onCancel}>
          關閉
        </Button>,
        <Button key="add" type="primary" onClick={handleAdd}>
          {isUpdate ? "更新庫存" : "加入購物清單"}
        </Button>,
      ]}
      onCancel={onCancel}
    >
      {isError ? (
        <AlertIfError isError={isError} description={error?.message} />
      ) : (
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} colon={false} form={form}>
          <Form.Item
            name="productItemId"
            label="商品品項"
            rules={[
              {
                required: true,
                message: "請選擇商品品項",
              },
            ]}
          >
            <Select
              options={productListOptions}
              loading={isLoading}
              disabled={isUpdate}
              placeholder="請選擇商品品項"
              optionLabelProp="label"
              onChange={() => {
                form.setFieldValue("quantity", null);
              }}
            />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="下單數量"
            rules={[
              {
                required: true,
                message: "請輸入下單數量",
              },
            ]}
            extra={
              currentProductItem?.stockQuantity ? (
                <div className={styles.numberExtra}>
                  <InfoCircleOutlined />
                  <span>最多下單數量為 {currentProductItem?.stockQuantity}</span>
                </div>
              ) : undefined
            }
          >
            <InputNumber
              max={currentProductItem?.stockQuantity}
              min={1}
              placeholder="請輸入下單數量"
              className={styles.numberInput}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default PlaceOrderProductModal;
