import { theme } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { useToken } = theme;

const TableDeleteIcon = (props) => {
  const { token } = useToken();
  return <DeleteOutlined style={{ color: token.colorError, ...props.style }} {...props} />;
};

export default TableDeleteIcon;
