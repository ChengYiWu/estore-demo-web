import { Avatar, Card, List, Space, Tooltip } from "antd";
import User1Img from "@/assets/user1.png";
import User2Img from "@/assets/user2.png";
import User3Img from "@/assets/user3.png";
import User4Img from "@/assets/user4.png";
import User5Img from "@/assets/user5.png";
import { createStyles } from "antd-style";

const DATA = [
  {
    username: "小明",
    currentMonthSale: 5000,
    totalSale: 50000,
    avatar: User1Img,
  },
  {
    username: "小華",
    currentMonthSale: 4000,
    totalSale: 53091,
    avatar: User2Img,
  },
  {
    username: "小芳",
    currentMonthSale: 2000,
    totalSale: 2500,
    avatar: User3Img,
  },
  {
    username: "小強",
    currentMonthSale: 3500,
    totalSale: 30994,
    avatar: User4Img,
  },
  {
    username: "小美",
    currentMonthSale: 210,
    totalSale: 1775,
    avatar: User5Img,
  },
];

const Text = ({
  prefix,
  text,
  suffix,
}: {
  prefix: React.ReactNode;
  text: React.ReactNode;
  suffix: React.ReactNode;
}) => (
  <Space style={{ alignItems: "baseline", flexWrap: "wrap" }}>
    {prefix}
    {text}
    {suffix}
  </Space>
);

const useStyle = createStyles(({ token }) => ({
  currentMonthSale: {
    color: token.colorPrimary,
    fontWeight: 600,
    fontSize: "1.25rem",
  },
  totalSale: {
    fontWeight: 600,
    fontSize: "1rem",
  },
}));

const SummaryTopSales = () => {
  const { styles } = useStyle();

  return (
    <Card bordered={false} title="Top 5 銷售人員">
      <List
        size="large"
        itemLayout="vertical"
        dataSource={DATA}
        renderItem={({ username, avatar, currentMonthSale }) => {
          return (
            <List.Item
              key={username}
              actions={[
                <Text
                  key="currentMonthSale"
                  prefix={<span>本月累積銷售：</span>}
                  text={<span className={styles.currentMonthSale}>{currentMonthSale.toLocaleString()}</span>}
                  suffix={<span>元</span>}
                />,
              ]}
            >
              <List.Item.Meta avatar={<Avatar src={avatar} />} title={username} />
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default SummaryTopSales;
