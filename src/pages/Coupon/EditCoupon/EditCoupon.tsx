import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Switch } from "antd";
import { createStyles } from "antd-style";
import AlertIfError from "@components/AlertIfError";
import CouponSystemCodes from "@utils/systemCodes/coupon";
import useGetEditCoupon from "./useGetEditCoupon";
import useSaveCoupon, { SaveCouponRequest } from "./useSaveCoupon";
import dayjs, { Dayjs } from "dayjs";
import useProductList from "@hooks/useProductList";
import { camelCase } from "lodash";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Content from "@components/Content";

type CouponFormValues = {
  title: string;
  code: string;
  description: string;
  type: string;
  priceDiscount: number;
  startRange: [Dayjs | null, Dayjs | null] | null;
  isActive?: boolean;
  applicableProductIds: number[];
};

const useStyles = createStyles(({ token }) => ({
  root: {
    minHeight: "100%",
  },
  typeSelect: {
    width: "auto",
    minWidth: "8rem",
  },
  typeExtra: {
    color: token.colorWarning,
  },
  numberInput: {
    width: "calc(100% - 8rem)",
    "& .ant-input-number": {
      borderRadius: 0,
    },
  },
}));

const TypeOptions = Object.entries(CouponSystemCodes).map(([_, { value, label }]) => ({ label, value }));

const EditCoupon = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { id = "" } = useParams<{ id: string }>();
  const isCreate = useMemo(() => !id, [id]);
  const { isError, error, data } = useGetEditCoupon(id, !isCreate);
  const {
    isLoading: productListLoading,
    error: productListError,
    isError: isProductListError,
    data: productList,
  } = useProductList();

  const {
    mutate: saveCoupon,
    isPending: isSaving,
    isError: isSaveError,
    error: saveError,
  } = useSaveCoupon(id, isCreate);

  const [form] = Form.useForm<CouponFormValues>();

  useEffect(() => {
    if (data) {
      const formValues = {
        ...data,
        priceDiscount: data[camelCase(CouponSystemCodes[data.type].value)],
        startRange: [data.startedAt ? dayjs(data.startedAt) : null, data.expiredAt ? dayjs(data.expiredAt) : null],
        applicableProductIds: data.applicableProducts?.map((p) => p.id) || [],
      };

      form.setFieldsValue(formValues);
    }
  }, [data, form]);

  const type = Form.useWatch("type", form);

  const currentTypeInfo = useMemo(() => {
    return (
      CouponSystemCodes[type] ?? {
        unit: "",
        label: "折扣值",
        value: "",
      }
    );
  }, [type]);

  const productOptions = useMemo(() => {
    return (
      productList?.items?.map((product) => {
        return {
          label: product.name,
          value: product.id,
        };
      }) || []
    );
  }, [productList]);

  const handleFisih = (values: CouponFormValues) => {
    const coupon = {
      ...values,
      isActive: values.isActive || false,
      startedAt: values?.startRange?.[0]?.format("YYYY-MM-DD HH:mm") || null,
      expiredAt: values?.startRange?.[1]?.format("YYYY-MM-DD HH:mm") || null,
      [currentTypeInfo.value]: values.priceDiscount,
    };

    saveCoupon(coupon as SaveCouponRequest);
  };

  const formLayout = {
    labelCol: { sm: { span: 3 }, md: { offset: 4, span: 3 } },
    wrapperCol: { sm: { span: 18 }, md: { span: 10 } },
  };

  const btnLayout = {
    wrapperCol: { sm: { offset: 3, span: 18 }, md: { offset: 7, span: 10 } },
  };

  return (
    <Content>
      <div className={styles.root}>
        <AlertIfError isError={isError} description={error?.message} />
        <AlertIfError isError={isSaveError} description={saveError?.message} />
        <AlertIfError isError={isProductListError} description={productListError?.message} />
        <Form {...formLayout} form={form} onFinish={handleFisih} colon={false}>
          <Form.Item
            name="title"
            label="優惠券名稱"
            rules={[
              { required: true, message: "請輸入優惠券名稱" },
              {
                max: 128,
                message: "優惠券名稱最多128個字",
              },
            ]}
          >
            <Input placeholder="請輸入優惠券名稱" />
          </Form.Item>
          <Form.Item
            name="code"
            label="領取代碼"
            rules={[
              { required: true, message: "請輸入領取代碼" },
              {
                max: 64,
                message: "優惠券名稱最多64個字",
              },
            ]}
          >
            <Input placeholder="請輸入領取代碼" />
          </Form.Item>
          <Form.Item
            name="description"
            label="描述"
            rules={[
              { required: true, message: "請輸入描述" },
              {
                max: 1024,
                message: "優惠券名稱最多1024個字",
              },
            ]}
          >
            <Input.TextArea placeholder="請輸入描述" />
          </Form.Item>
          <Form.Item
            label="優惠券類型"
            extra={
              <span className={styles.typeExtra}>
                <ExclamationCircleOutlined />
                &nbsp;
                <span>不可修改優惠券類型</span>
              </span>
            }
            required
          >
            <Space.Compact block>
              <Form.Item name="type" rules={[{ required: true, message: "請選擇類型" }]} noStyle>
                <Select
                  className={styles.typeSelect}
                  options={TypeOptions}
                  disabled={!isCreate}
                  placeholder="請選擇優惠券類型"
                />
              </Form.Item>
              <Form.Item
                name="priceDiscount"
                dependencies={["type"]}
                noStyle
                rules={[
                  ({ getFieldValue }) => ({
                    required: true,
                    message: `請輸入${
                      getFieldValue("type") ? CouponSystemCodes[getFieldValue("type")].label : "折扣值"
                    }`,
                  }),
                ]}
              >
                <InputNumber
                  className={styles.numberInput}
                  placeholder={`請輸入${currentTypeInfo.label}`}
                  min={1}
                  addonAfter={currentTypeInfo.unit}
                />
              </Form.Item>
            </Space.Compact>
          </Form.Item>
          <Form.Item name="applicableProductIds" label="可用商品">
            <Select
              mode="multiple"
              options={productOptions}
              loading={productListLoading}
              placeholder="請選擇可用商品"
            />
          </Form.Item>
          <Form.Item name="startRange" label="可用期限">
            <DatePicker.RangePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              allowEmpty={[true, true]}
            />
          </Form.Item>
          <Form.Item name="isActive" label="是否啟用" valuePropName="checked">
            <Switch checkedChildren="啟用" unCheckedChildren="停用" />
          </Form.Item>
          <Form.Item {...btnLayout}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} lg={6}>
                <Button block type="primary" htmlType="submit" loading={isSaving}>
                  儲存
                </Button>
              </Col>
              <Col xs={24} sm={12} lg={6}>
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

export default EditCoupon;
