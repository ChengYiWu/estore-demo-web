import { Alert } from "antd";
import { createStyles } from "antd-style";

interface AlertIfErrorProps {
  isError?: boolean;
  title?: string;
  description?: string;
}

const useStyle = createStyles(() => ({
  root: {
    margin: "1rem 0",
  },
}));

const AlertIfError = ({
  isError = false,
  title = "錯誤",
  description = "發生錯誤了，請通知系統管理員。",
}: AlertIfErrorProps) => {
  const { styles } = useStyle();

  return isError && <Alert message={title} description={description} type="error" showIcon className={styles.root} />;
};

export default AlertIfError;
