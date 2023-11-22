import { Chart } from "@antv/g2";
import { Card } from "antd";
import { createStyles } from "antd-style";
import { useEffect } from "react";

const DOM_ID = "summary-categories";

const DATA = [
  {
    category: "3C",
    sold: 3000,
  },
  {
    category: "家電",
    sold: 3100,
  },
  {
    category: "食品",
    sold: 1500,
  },
  {
    category: "服飾",
    sold: 600,
  },
  {
    category: "日用品",
    sold: 3990,
  },
  {
    category: "其他",
    sold: 320,
  },
];

const useStyle = createStyles(() => ({
  root: {
    width: "100%",
    height: "100%",
  },
  titleMonth: {
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  title: {
    fontSize: "1rem",
    marginLeft: "0.5rem",
    color: "#767676",
    fontWeight: 600,
  },
}));

const SummaryCategories = () => {
  const { styles } = useStyle();

  useEffect(() => {
    const chart = new Chart({
      container: DOM_ID,
      height: 300,
      autoFit: true,
    });

    chart.coordinate({ type: "theta", innerRadius: 0.8 });

    chart
      .interval()
      .transform({ type: "stackY" })
      .data(DATA)
      .encode("y", "sold")
      .encode("color", "category")
      .style("stroke", "white")
      .style("inset", 1)
      .style("radius", 6)
      .scale("color", {
        palette: "spectral",
        offset: (t) => t * 0.8 + 0.1,
      })
      .legend({
        color: {
          position: "right",
        },
      })
      .tooltip({
        items: [
          ({ sold, category }) => {
            return {
              name: `銷售額（${category}）：`,
              value: `${sold.toLocaleString()} 元`,
            };
          },
        ],
      })
      .animate("enter", { type: "waveIn" });

    chart
      .text()
      .style("text", "$ 6,600")
      .style("x", "50%")
      .style("y", "50%")
      .style("fontSize", 36)
      .style("fontWeight", "bold")
      .style("textAlign", "center");

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Card
      className={styles.root}
      style={{ width: "100%" }}
      title={
        <>
          <span className={styles.titleMonth}>9 月份</span>
          <span className={styles.title}>商品類別銷售額</span>
        </>
      }
    >
      <div id={DOM_ID} />
    </Card>
  );
};

export default SummaryCategories;
