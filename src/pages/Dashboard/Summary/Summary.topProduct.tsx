import React from "react";
import { Card, List, Space } from "antd";
import { createStyles } from "antd-style";
import CoffeBeansImg from "@/assets/咖啡豆.png";
import SmartBraceletImg from "@/assets/智能手環.png";
import TVImg from "@/assets/電視機.png";
import SoundMiniImg from "@/assets/藍芽喇叭.png";
import FoodProcessorImg from "@/assets/調理食物器.png";

const DATA = [
  {
    title: "智能手環 FitBand X5",
    image: SmartBraceletImg,
    description:
      "FitBand X5 是一款先進的健康追蹤智能手環，具有心率監測、睡眠追蹤和全天候活動記錄功能，並且具有長達7天的電池續航力。",
    currentMonthSale: 300,
    totalSale: 1023,
    unit: "個",
  },
  {
    title: "山景咖啡豆 - 特選混合",
    image: CoffeBeansImg,
    description: "來自中美洲高地的精選咖啡豆，山景咖啡豆 - 特選混合為您帶來豐富而均衡的口感，適合早晨的提神選擇。",
    currentMonthSale: 250,
    totalSale: 2023,
    unit: "包",
  },
  {
    title: "UltraClear 4K 電視 55英寸",
    image: TVImg,
    description:
      "UltraClear 4K 電視提供絕佳的圖像質量和清晰度，配備智能串流技術和多種連接選項，為您的家庭娛樂體驗增添色彩。",
    currentMonthSale: 230,
    totalSale: 1023,
    unit: "台",
  },
  {
    title: "全能廚師多功能料理機",
    image: FoodProcessorImg,
    description:
      "全能廚師多功能料理機是廚房的完美助手，具有攪拌、搗碎、打蛋和揉麵團等多種功能，是忙碌生活中的理想選擇。",
    currentMonthSale: 121,
    totalSale: 123,
    unit: "台",
  },
  {
    title: "迷你便攜藍牙喇叭 SoundMini",
    image: SoundMiniImg,
    description:
      "SoundMini 迷你便攜藍牙喇叭提供卓越的音質和長達12小時的播放時間，其輕巧的設計使其成為旅行和外出的理想音樂伴侶。",
    currentMonthSale: 90,
    totalSale: 329,
    unit: "台",
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
  <Space style={{ alignItems: "baseline" }}>
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

const SummaryTopProduct = () => {
  const { styles } = useStyle();

  return (
    <Card bordered={false} title="Top 5 熱銷商品">
      <List
        itemLayout="vertical"
        size="large"
        dataSource={DATA}
        renderItem={({ title, image, description, currentMonthSale, totalSale, unit }) => (
          <List.Item
            key={title}
            extra={<img width={100} alt="logo" src={image} />}
            actions={[
              <Text
                key="currentMonthSale"
                prefix={<span>本月累積銷售：</span>}
                text={<span className={styles.currentMonthSale}>{currentMonthSale.toLocaleString()}</span>}
                suffix={<span>{unit}</span>}
              />,
              <Text
                key="totalSale"
                prefix={<span>總累積銷售：</span>}
                text={<span className={styles.totalSale}>{totalSale.toLocaleString()}</span>}
                suffix={<span>{unit}</span>}
              />,
            ]}
          >
            <List.Item.Meta title={title} description={description} />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SummaryTopProduct;
