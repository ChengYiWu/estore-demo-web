import { Alert } from "antd";

const ApiServerDelayAlert = ({ noStyle = false }: { noStyle?: boolean }) => {
  return (
    <Alert
      message="溫馨提醒"
      description="後端 API 部屬於免費定價層，故第一次執行時可能會花久一點時間等待伺服器喚醒。"
      showIcon
      style={noStyle ? {} : { marginBottom: "1rem" }}
      type="warning"
      closable
    />
  );
};

export default ApiServerDelayAlert;
