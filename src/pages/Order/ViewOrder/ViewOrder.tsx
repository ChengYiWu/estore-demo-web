import { useEffect, useMemo } from "react";
import { Alert, Button, Descriptions, Drawer, Form, Input, Skeleton, Spin, Tag } from "antd";
import { createStyles } from "antd-style";
import AlertIfError from "@components/AlertIfError";
import TableEmptyColumn from "@components/TableEmptyColumn";
import OrderSystemCodes from "@utils/systemCodes/order";
import useOrder from "./useOrder";
import ProductTable from "../ProductTable";
import { groupBy, map } from "lodash";
import dayjs from "dayjs";
import useOrderStatusChangeToCancelled from "./useOrderStatusChangeToCancelled";
import useOrderStatusChangeToShipped from "./useOrderStatusChangeToShipped";
import { antdUtils } from "@utils/antd.util";

interface ViewOrderProps {
  open: boolean;
  orderNo: string;
  onClose?: () => void;
  onChangeStatusSuccess?: () => void;
}

const useStyles = createStyles(() => ({
  number: {
    textAlign: "right",
  },
  orderInfo: {
    "& .title": {
      fontSize: "1.25rem",
      fontWeight: "700",
      margin: "1rem 0",
    },
    "& .title:first-child": {
      margin: "0 0 1rem 0",
    },
    "& .detailWrapper": {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "0.5rem",
  },
}));

const ViewOrder = ({ open, orderNo, onClose, onChangeStatusSuccess }: ViewOrderProps) => {
  const { styles } = useStyles();
  const { isLoading, isError, error, data, refetch } = useOrder(orderNo || "");
  const {
    mutate: changeToCancelled,
    isPending: isChangeToCancelledPending,
    isError: isChangeToCancelledError,
    error: changeToCancelledError,
  } = useOrderStatusChangeToCancelled(orderNo || "", () => {
    refetch();
    onChangeStatusSuccess && onChangeStatusSuccess();
  });
  const {
    mutate: changeToShipped,
    isPending: isChangeToShippedPending,
    isError: isChangeToShippedError,
    error: changeToShippedError,
  } = useOrderStatusChangeToShipped(orderNo || "", () => {
    refetch();
    onChangeStatusSuccess && onChangeStatusSuccess();
  });

  const [order, orderItems] = useMemo(() => {
    if (data) {
      const status = OrderSystemCodes[data.status];
      const orderDescriptions = [
        {
          key: "orderNo",
          label: "訂單編號",
          children: data.orderNo,
          span: 2,
        },
        {
          key: "status",
          label: "狀態",
          children: status ? <Tag color={status.color}>{status.label}</Tag> : <TableEmptyColumn />,
          span: 1,
        },
        { key: "shippingAddress", label: "收件地址", children: data.shippingAddress, span: 2 },
        { key: "contactPhone", label: "聯絡電話", children: data.contactPhone, span: 1 },
        { key: "note", label: "備註", children: data.note || <TableEmptyColumn />, span: 3 },
        {
          key: "finalTotalPrice",
          label: "總計金額",
          className: styles.number,
          children: "$ " + data.finalTotalPrice.toLocaleString(),
          span: 2,
        },
        {
          key: "placedAt",
          label: "訂購時間",
          children: dayjs(data.placedAt).format("YYYY-MM-DD HH:mm"),
          span: 1,
        },
        {
          key: "shippingFee",
          label: "運費",
          className: styles.number,
          children: data.shippingFee ? "$ " + data.shippingFee?.toLocaleString() : <TableEmptyColumn />,
          span: 2,
        },
        {
          key: "priceDiscount",
          label: "優惠券折扣",
          className: styles.number,
          children: data.priceDiscount ? "$ " + data.priceDiscount?.toLocaleString() : <TableEmptyColumn />,
          span: 1,
        },
        { key: "shippedUserName", label: "出貨人員", children: data.shippedUserName || <TableEmptyColumn />, span: 2 },
        {
          key: "shippedAt",
          label: "出貨時間",
          children: data.shippedAt ? dayjs(data.shippedAt).format("YYYY-MM-DD HH:mmm") : <TableEmptyColumn />,
          span: 1,
        },
        {
          key: "cancelledUserName",
          label: "退訂人員",
          children: data.cancelledUserName || <TableEmptyColumn />,
          span: 2,
        },
        {
          key: "cancelledAt",
          label: "退訂時間",
          children: data.cancelledAt ? dayjs(data.cancelledAt).format("YYYY-MM-DD HH:mm") : <TableEmptyColumn />,
          span: 1,
        },
        { key: "cancelledReason", label: "退訂原因", children: data.cancelledReason || <TableEmptyColumn />, span: 3 },
      ];

      const groupedOrderItemsByProduct = groupBy(data.orderItems, "productId");
      const orderItemsByProduct = map(groupedOrderItemsByProduct, (items, productId) => {
        return {
          product: {
            id: productId,
            name: items?.[0].productName,
          },
          items,
        };
      });
      return [orderDescriptions, orderItemsByProduct];
    }

    return [];
  }, [data, styles]);

  const [form] = Form.useForm();

  useEffect(() => {
    return () => {
      if (open) {
        form.resetFields();
      }
    };
  }, [open, form]);

  const handleChangeToShipped = () => {
    antdUtils.modal?.confirm({
      title: "確定",
      content: "確定要出貨嗎？",
      onOk: () => {
        changeToShipped();
      },
    });
  };

  const handleChangeToCancelled = async () => {
    try {
      const values = await form.validateFields();
      antdUtils.modal?.confirm({
        title: "確定",
        content: "確定要取消訂單嗎？",
        onOk: () => {
          changeToCancelled({
            reason: values.reason,
          });
        },
      });
    } catch {}
  };

  return (
    <Drawer
      open={open}
      title="訂單"
      onClose={onClose}
      size="large"
      width={"52rem"}
      footer={[
        <Button key="close" onClick={onClose} loading={isChangeToCancelledPending || isChangeToShippedPending}>
          關閉
        </Button>,
        ...(data?.status === OrderSystemCodes.Placed.value && data?.isEditable
          ? [
              <Button
                key="changeToShipped"
                type="primary"
                onClick={handleChangeToShipped}
                loading={isChangeToShippedPending}
              >
                訂單出貨
              </Button>,
            ]
          : []),
        ...([OrderSystemCodes.Placed.value, OrderSystemCodes.Shipped.value].includes(data?.status ?? "") &&
        data?.isEditable
          ? [
              <Button
                key="changeToCancelled"
                type="primary"
                danger
                onClick={handleChangeToCancelled}
                loading={isChangeToCancelledPending}
              >
                訂單取消
              </Button>,
            ]
          : []),
      ]}
      classNames={{
        footer: styles.footer,
      }}
    >
      {!data?.isEditable && (
        <Alert
          message="提醒"
          description="此訂單已被管理員設置為不可編輯，故無法做後續轉換狀態操作。"
          showIcon
          closable
          type="warning"
          style={{ marginBottom: "1rem" }}
        />
      )}
      <AlertIfError isError={isError} title={error?.message} />
      <AlertIfError isError={isChangeToCancelledError} title={changeToCancelledError?.message} />
      <AlertIfError isError={isChangeToShippedError} title={changeToShippedError?.message} />
      {isLoading ? (
        <Skeleton active />
      ) : (
        <Spin spinning={isChangeToCancelledPending || isChangeToShippedPending}>
          <div className={styles.orderInfo}>
            <div className="title">訂單資訊</div>
            <Descriptions items={order} bordered />
            <div className="title">訂單明細</div>
            <div className="detailWrapper">
              {orderItems?.map(({ product, items }) => (
                <ProductTable key={product.id} product={product} productItems={items} />
              ))}
            </div>
            {[OrderSystemCodes.Placed.value, OrderSystemCodes.Shipped.value].includes(data?.status ?? "") &&
              data?.isEditable && (
                <>
                  <div className="title">取消訂單處理</div>
                  <Form form={form} colon={false} layout="vertical">
                    <Form.Item label="取消原因" name="reason" rules={[{ required: true, message: "請填寫取消原因" }]}>
                      <Input.TextArea placeholder="請填寫取消原因" />
                    </Form.Item>
                  </Form>
                </>
              )}
          </div>
        </Spin>
      )}
    </Drawer>
  );
};

export default ViewOrder;
