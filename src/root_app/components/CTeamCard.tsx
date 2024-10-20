import { Card, Typography } from "antd";
import React, { memo } from "react";
import CAvatar from "./CAvatar";
import { ITeamResponse } from "../interfaces/teams";

type CTeamCardProps = {
  loading?: boolean;
  actions?: React.ReactNode[];
  style?: React.CSSProperties;
  cardData: ITeamResponse;
  className?: string;
};

const CTeamCard: React.FC<CTeamCardProps> = (props) => {
  const { loading, actions, style, cardData, className } = props;

  return (
    <Card
      loading={loading}
      actions={actions}
      style={{ minHeight: 200, padding: 0, ...style }}
      className={`team-card ${className}`}
    >
      <div
        style={{
          backgroundImage: `url(${cardData?.banner})`,
          height: "150px",
          width: "100%",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          position: "relative",
        }}
      ></div>
      <CAvatar
        src={cardData?.logo as string}
        height="80px"
        width="80px"
        className="team-card-logo"
      />
      <div className="p-8 pt-8 ml-3 mr-3">
        <Typography.Title level={3}>{cardData?.title}</Typography.Title>
        <Typography.Text className="text">
          {cardData?.description}
        </Typography.Text>
      </div>
    </Card>
  );
};

export default memo(CTeamCard);
