import React from "react";
import { List, Typography } from "antd";

const data = [
  {
    title: "Terms of Service",
    url: "https://www.meeting-master.pro/terms",
  },
  {
    title: "Privacy Policy",
    url: "https://www.meeting-master.pro/privacy",
  },
  {
    title: "Refund Policy",
    url: "https://www.meeting-master.pro/refund",
  },
  {
    title: "Cookie Policy",
    url: "https://www.meeting-master.pro/cookie",
  },
];

export function P_TermsAndPolicies() {
  return (
    <div style={{ padding: "50px" }}>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <a href={item.url} target="_blank" rel="noreferrer" style={{fontSize: "22px"}}>
              {item.title}
            </a>
          </List.Item>
        )}
        style={{ maxWidth: "600px", margin: "auto" }}
      />
    </div>
  );
}
