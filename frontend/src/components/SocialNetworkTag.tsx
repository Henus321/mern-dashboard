import React from "react";
import { Tag, Tooltip } from "antd";
import { ICustomer } from "../models";

interface Props {
  record: ICustomer;
}

const SocialNetworkTag: React.FC<Props> = ({ record }) => {
  let color = "orange";
  let tag = "dimgrey";
  if (record.social?.includes("facebook")) {
    color = "steelblue";
    tag = "facebook";
  }
  if (record.social?.includes("instagram")) {
    color = "lightcoral";
    tag = "instagram";
  }
  if (record.social?.includes("vk")) {
    color = "dodgerblue";
    tag = "vk";
  }
  if (record.social?.includes("linkedin")) {
    color = "mediumturquoise";
    tag = "linkedin";
  }
  if (record.social?.includes("twitter")) {
    color = "lightskyblue";
    tag = "twitter";
  }

  return (
    <Tooltip title={record.social}>
      {record.social && (
        <Tag color={color} key={record.social} className="m-3">
          <a href={record.social} target="_blank" rel="noreferrer">
            {tag.toUpperCase()}
          </a>
        </Tag>
      )}
    </Tooltip>
  );
};

export default SocialNetworkTag;
