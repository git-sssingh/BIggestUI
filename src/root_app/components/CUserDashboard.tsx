import { Card, Col, Divider, Row, Statistic, Typography } from "antd";
import React, { memo } from "react";
import { MailIcon, PhoneIcon } from "../utilities/icons";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { formatNumber } from "../utilities";

type CUserDashboardProps = {
  cards?: any[];
  description?: string;
  email?: string;
  phone?: string;
};

const CUserDashboard: React.FC<CUserDashboardProps> = ({
  cards,
  description,
  email,
  phone,
}) => {
  return (
    <React.Fragment>
      <Typography.Title level={3}>
        Hi, there is something about me.
      </Typography.Title>
      <Typography.Paragraph>
        {description || "No description available from the user."}
      </Typography.Paragraph>
      <div className="mt-4 d-flex justify-content-center align-items-center flex-wrap">
        <div className="d-flex align-items-center ">
          <MailIcon className="color-danger" />
          <Typography.Text className="ml-1">
            {email || "No email available"}
          </Typography.Text>
        </div>
        <div className="ml-3 d-flex align-items-center">
          <PhoneIcon className="color-success" />
          <Typography.Text className="ml-1">
            {phone || "No contact number available"}
          </Typography.Text>
        </div>
      </div>
      <Divider />
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        className="d-flex justify-content-space-evenly mt-4"
        style={{ rowGap: "16px" }}
      >
        {cards?.map((card, index) => (
          <Col key={index} xs={12} sm={12} md={8} lg={8} xxl={4}>
            <Card bordered={false} hoverable>
              <Statistic
                title={card.title}
                value={formatNumber(card.count) || 0}
                valueStyle={{ color: "#055cb4" }}
                style={{ width: "fit-content", height: "100px" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default memo(CUserDashboard);
