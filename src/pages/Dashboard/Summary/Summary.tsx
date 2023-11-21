import { createStyles } from "antd-style";
import { Alert, Card, Col, Row, Statistic } from "antd";
import SummaryCategories from "./Summary.categories";
import SummarySoldByDay from "./Summary.soldByDay";
import SummaryTopSales from "./Summary.topSales";
import SummaryTopProduct from "./Summary.topProduct";

const useStyle = createStyles(() => ({
  root: {
    padding: "1rem",
    height: "100%",
  },
  totalAreaWrap: {
    marginTop: "1rem",

    "& .ant-statistic-content-suffix": {
      fontSize: "1rem",
    },
  },
  row: {
    marginTop: "1rem",
  },
}));

const Summary = () => {
  const { styles, cx } = useStyle();

  return (
    <div className={styles.root}>
      <Alert message="此頁面資料為固定資料，未實作後端 API" type="warning" showIcon />
      <Row gutter={[16, 16]} className={cx(styles.totalAreaWrap, styles.row)}>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic title="總銷售額" value={305222} precision={0} valueStyle={{ color: "#3f8600" }} suffix="元" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic title="總折扣金額" value={1250} precision={0} valueStyle={{ color: "#3f8600" }} suffix="元" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic title="完成訂單數" value={3500} precision={0} valueStyle={{ color: "#3f8600" }} suffix="單" />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card bordered={false}>
            <Statistic title="平均訂單價值" value={2300} precision={0} valueStyle={{ color: "#3f8600" }} suffix="元" />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.row}>
        <Col xs={24} md={15}>
          <SummarySoldByDay />
        </Col>
        <Col xs={24} md={9}>
          <SummaryCategories />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles.row}>
        <Col xs={24} md={18}>
          <SummaryTopProduct />
        </Col>
        <Col xs={24} md={6}>
          <SummaryTopSales />
        </Col>
      </Row>
    </div>
  );
};

export default Summary;
