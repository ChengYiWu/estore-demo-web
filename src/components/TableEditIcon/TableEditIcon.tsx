import { theme } from "antd";
import { FormOutlined } from "@ant-design/icons";

const { useToken } = theme;

const TableEditIcon = (props) => {
  const { token } = useToken();
  return <FormOutlined style={{ color: token.colorPrimary, ...props.style }} {...props} />;
};

export default TableEditIcon;
