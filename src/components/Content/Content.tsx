import { createStyles } from "antd-style";

const useStyle = createStyles(({ token }) => ({
  root: {
    background: token.colorBgContainer,
    margin: "1rem",
    padding: "1.5rem 1rem",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
    height: "100%",
  },
}));

const Content = ({ children }) => {
  const { styles } = useStyle();
  return <div className={styles.root}>{children}</div>;
};

export default Content;
