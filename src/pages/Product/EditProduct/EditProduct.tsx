import { Fragment, useEffect, useMemo } from "react";
import useGetEditProduct from "./useGetEditProduct";
import { createStyles } from "antd-style";
import { useNavigate, useParams } from "react-router-dom";
import useSaveProduct from "./useSaveProduct";
import type { UploadFile } from "antd";
import { Button, Col, Divider, Flex, Form, Input, InputNumber, Row, Switch } from "antd";
import AlertIfError from "@/components/AlertIfError";
import { DeleteOutlined, InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Uploader from "@/components/Uploader";
import { FileType } from "@/components/Uploader/Uploader";
import fileUtil from "@/utils/file.util";

type ProductItemFormValues = {
  name: string;
  price: number;
  stockQuantity: number;
  isActive?: boolean | null;
  images: UploadFile[] | undefined;
};

type ProductFormValues = {
  name: string;
  description: string;
  brand?: string;
  weight?: string;
  dimensions?: string;
  images: UploadFile[] | undefined;
  productItems: ProductItemFormValues[];
};

const MaxItemCount = 10;

const useStyles = createStyles(({ token }) => ({
  root: {
    minHeight: "100%",
  },
  itemCountDivider: {
    "&.ant-divider-with-text": {
      fontSize: "1rem",
      margin: "0 0 1rem 0",
    },
    "& .itemCount": {
      fontSize: "1.25em",
      fontWeight: 600,
      margin: "0 0.5rem",
    },
    "& .maxCountNotice": {
      fontSize: "1em",
      color: token.colorInfo,
      "& .maxCount": {
        marginLeft: "0.25rem",
        fontSize: "1em",
      },
    },
  },
}));

const EditProduct = () => {
  const { styles } = useStyles();
  const navigate = useNavigate();
  const { id = "" } = useParams<{ id: string }>();
  const isCreate = useMemo(() => !id, [id]);
  const { isError, error, data } = useGetEditProduct(id, !isCreate);

  const {
    mutate: saveProduct,
    isPending: isSaving,
    isError: isSaveError,
    error: saveError,
  } = useSaveProduct(id, isCreate);

  const [form] = Form.useForm<ProductFormValues>();

  useEffect(() => {
    if (data) {
      const formValues = {
        ...data,
        images: data.images.map((image) => ({
          uid: image.id.toString(),
          name: image.fileName,
          url: image.uri,
          thumbUrl: image.uri,
        })),
        productItems: data.productItems.map((item) => ({
          ...item,
          image: undefined,
          images: item.image
            ? [
                {
                  uid: item.image.id.toString(),
                  name: item.image.fileName,
                  url: item.image.uri,
                  thumbUrl: item.image.uri,
                },
              ]
            : [],
        })),
      };

      form.setFieldsValue(formValues);
    }
  }, [data, form]);

  const handleFisih = (values: ProductFormValues) => {
    const [oriImageIds, newImages] = fileUtil.transferAntFilesToOriAndUploadedFiles(values.images);

    delete values.images;

    const product = {
      ...values,
      oriImageIds: oriImageIds,
      newImages: newImages,
      productItems: values.productItems.map((item) => {
        const [oriImageIds, newImages] = fileUtil.transferAntFilesToOriAndUploadedFiles(item.images);
        delete item.images;
        return {
          ...item,
          oriImageId: oriImageIds?.[0],
          newImage: newImages?.[0],
        };
      }),
    };

    saveProduct(product);
  };

  const itemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  return (
    <div className={styles.root}>
      <AlertIfError isError={isError} description={error?.message} />
      <AlertIfError isError={isSaveError} description={saveError?.message} />
      <div>
        <Form
          form={form}
          onFinish={handleFisih}
          colon={false}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 18 }}
          initialValues={{
            images: [],
            productItems: [],
          }}
        >
          <Form.Item
            name="name"
            label="商品名稱"
            rules={[
              {
                required: true,
                message: "請輸入商品名稱",
              },
              {
                max: 128,
                message: "商品名稱最多128個字",
              },
            ]}
          >
            <Input placeholder="請輸入商品名稱" />
          </Form.Item>
          <Form.Item
            name="description"
            label="商品描述"
            rules={[
              {
                required: true,
                message: "請輸入商品描述",
              },
            ]}
          >
            <Input.TextArea placeholder="請輸入商品描述" />
          </Form.Item>
          <Form.Item name="brand" label="商品品牌">
            <Input placeholder="請輸入商品品牌" />
          </Form.Item>
          <Form.Item name="weight" label="商品重量">
            <Input placeholder="請輸入商品重量" />
          </Form.Item>
          <Form.Item name="dimensions" label="商品尺寸">
            <Input placeholder="請輸入商品尺寸" />
          </Form.Item>
          <Form.Item
            name="images"
            label="商品圖片"
            rules={[
              {
                required: true,
                validator(_, files) {
                  if (files && files.length <= 0) {
                    return Promise.reject("請上傳至少 1 張圖片");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Uploader
              uploadBtnText="上傳商品圖片"
              action="/products/upload"
              max={5}
              allowedFileTypes={[FileType.JPEG, FileType.JPG, FileType.PNG]}
            />
          </Form.Item>
          <Form.List
            name="productItems"
            rules={[
              {
                validator(_, items) {
                  if (items && items.length <= 0) {
                    return Promise.reject("請新增至少 1 個品項");
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <Form.Item label="品項" required>
                <Divider rootClassName={styles.itemCountDivider}>
                  共<span className="itemCount">{fields.length}</span>
                  個品項（
                  <span className="maxCountNotice">
                    <InfoCircleOutlined />
                    <span className="maxCount">最多 {MaxItemCount} 個品項</span>
                  </span>
                  ）
                </Divider>
                {fields.map(({ key, name, ...rest }) => (
                  <Fragment key={key}>
                    <Flex style={{ padding: "2rem", background: "#efefef", borderRadius: "8px" }}>
                      <div style={{ flex: 0, flexBasis: "3rem" }}>
                        <Button
                          icon={<DeleteOutlined />}
                          danger
                          size="small"
                          onClick={() => {
                            remove(name);
                          }}
                          style={{ marginTop: "0.25rem" }}
                        />
                      </div>
                      <div key={key} style={{ flex: 1 }}>
                        <Form.Item
                          {...rest}
                          {...itemLayout}
                          name={[name, "name"]}
                          label="品項名稱"
                          rules={[{ required: true, message: "請填寫品項名稱" }]}
                        >
                          <Input placeholder="請填寫品項名稱" />
                        </Form.Item>
                        <Form.Item
                          {...rest}
                          {...itemLayout}
                          name={[name, "price"]}
                          label="品項價格"
                          rules={[{ required: true, message: "請填寫品項價格" }]}
                        >
                          <InputNumber placeholder="請填寫品項價格" min={1} precision={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                          {...rest}
                          {...itemLayout}
                          name={[name, "stockQuantity"]}
                          label="品項庫存"
                          rules={[{ required: true, message: "請填寫品項庫存" }]}
                        >
                          <InputNumber placeholder="請填寫庫存" min={0} precision={0} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                          {...rest}
                          {...itemLayout}
                          name={[name, "isActive"]}
                          label="是否上架"
                          valuePropName="checked"
                        >
                          <Switch checkedChildren="上架" unCheckedChildren="下架" />
                        </Form.Item>
                        <Form.Item {...rest} {...itemLayout} name={[name, "images"]} label="品項圖片">
                          <Uploader
                            uploadBtnText="上傳品項圖片"
                            action="/products/upload"
                            max={1}
                            allowedFileTypes={[FileType.JPEG, FileType.JPG, FileType.PNG]}
                          />
                        </Form.Item>
                      </div>
                    </Flex>
                    {fields.length > 0 && <Divider />}
                  </Fragment>
                ))}
                {fields.length < MaxItemCount && (
                  <Form.Item>
                    <Button
                      icon={<PlusCircleOutlined />}
                      onClick={() =>
                        add({
                          isActive: false,
                        })
                      }
                    >
                      新增品項
                    </Button>
                  </Form.Item>
                )}
                <Form.ErrorList errors={errors} />
              </Form.Item>
            )}
          </Form.List>
          <Form.Item {...itemLayout} label=" ">
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={12} md={4}>
                <Button block type="primary" htmlType="submit" loading={isSaving}>
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
    </div>
  );
};

export default EditProduct;
