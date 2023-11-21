import { Chart } from "@antv/g2";
import { Card } from "antd";
import { createStyles } from "antd-style";
import { padStart } from "lodash";
import { useEffect } from "react";

const DOM_ID = "summary-sold-by-day";

const DATA = Array.from({ length: 30 }).map((_, index) => {
  const sold = Math.floor(Math.random() * 10000);
  return {
    date: `09-${padStart((index + 1).toString(), 2, "0")}`,
    sold,
  };
});

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

const SummarySoldByDay = () => {
  const { styles } = useStyle();

  useEffect(() => {
    const chart = new Chart({
      container: DOM_ID,
      height: 300,
      autoFit: true,
    });

    chart
      .line()
      .data(DATA)
      .encode("x", "date")
      .encode("y", "sold")
      .transform({
        type: "sample",
        thresholds: 500,
        strategy: "max",
      })
      .tooltip({
        items: [
          ({ sold, date }) => {
            return {
              name: `銷售額（${date}）：`,
              value: `${sold.toLocaleString()} 元`,
            };
          },
        ],
      });

    chart.axisX().attr("title", "日期");
    chart.axisY().attr("title", "銷售額");

    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <Card
      className={styles.root}
      title={
        <>
          <span className={styles.titleMonth}>9 月份</span>
          <span className={styles.title}>每日銷售額</span>
        </>
      }
    >
      <div id={DOM_ID} />
    </Card>
  );
};

export default SummarySoldByDay;
