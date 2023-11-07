import { ReactNode, useEffect } from "react";
import { App as AntApp } from "antd";
import { antdUtils } from "@utils/antd.util";
import Layout from "./layouts";
import "./global.css";

const AntFeedbackWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { notification, message, modal } = AntApp.useApp();

  useEffect(() => {
    antdUtils.setNotificationInstance(notification);
    antdUtils.setMessageInstance(message);
    antdUtils.setModalInstance(modal);
  }, [notification, message, modal]);

  return children;
};

const App = () => {
  return (
    <AntApp>
      <AntFeedbackWrapper>
        <Layout />
      </AntFeedbackWrapper>
    </AntApp>
  );
};

export default App;
