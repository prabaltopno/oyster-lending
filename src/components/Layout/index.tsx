import React from "react";
import "./../../App.less";
import { Menu } from "antd";
import {
  PieChartOutlined,
  GithubOutlined,
  BankOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  HomeOutlined,
  RocketOutlined,
  // LineChartOutlined
} from "@ant-design/icons";

import BasicLayout from "@ant-design/pro-layout";
import { AppBar } from "./../AppBar";
import { Link, useLocation } from "react-router-dom";
import { useConnectionConfig } from "../../contexts/connection";
import { LABELS } from "../../constants";

export const AppLayout = (props: any) => {
  const { env } = useConnectionConfig();
  const location = useLocation();

  const paths: { [key: string]: string } = {
    "/dashboard": "2",
    "/deposit": "3",
    "/borrow": "4",
    "/liquidate": "5",
    "/margin": "6",
    "/faucet": "7",
  };

  const current =
    [...Object.keys(paths)].find((key) => location.pathname.startsWith(key)) ||
    "";
  const defaultKey = paths[current] || "1";
  const theme = 'light';

  return (
    <div className="App">
      <div className="Banner">
        <div className="Banner-description">{LABELS.AUDIT_WARNING}</div>
      </div>
      <BasicLayout
        title={LABELS.APP_TITLE}
        footerRender={() => <div className="footer" title={LABELS.FOOTER}>{LABELS.FOOTER}</div>}
        navTheme={theme}
        headerTheme={theme}
        theme={theme}
        layout="mix"
        fixSiderbar={true}
        primaryColor="#d83aeb"
        logo={<div className="App-logo" />}
        rightContentRender={() => <AppBar />}
        links={[
          <div title="Fork">
            <GithubOutlined />
          </div>,
        ]}
        menuContentRender={() => {
          return (
            <Menu theme={theme} defaultSelectedKeys={[defaultKey]} mode="inline">
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link
                  to={{
                    pathname: "/",
                  }}
                >
                  {LABELS.MENU_HOME}
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<PieChartOutlined />}>
                <Link
                  to={{
                    pathname: "/dashboard",
                  }}
                >
                  {LABELS.MENU_DASHBOARD}
                </Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<BankOutlined />}>
                <Link
                  to={{
                    pathname: "/deposit",
                  }}
                >
                  {LABELS.MENU_DEPOSIT}
                </Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<LogoutOutlined />}>
                <Link
                  to={{
                    pathname: "/borrow",
                  }}
                >
                  {LABELS.MENU_BORROW}
                </Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<ShoppingOutlined />}>
                <Link
                  to={{
                    pathname: "/liquidate",
                  }}
                >
                  {LABELS.MENU_LIQUIDATE}
                </Link>
              </Menu.Item>
              {/* Hide margin option for now  */}
              {/* <Menu.Item key="6" icon={< LineChartOutlined/>}>
                <Link
                  to={{
                    pathname: "/margin",
                  }}
                >
                  {LABELS.MARGIN_TRADING}
                </Link>
              </Menu.Item> */}
              {env !== "mainnet-beta" && (
                <Menu.Item key="7" icon={<RocketOutlined />}>
                  <Link
                    to={{
                      pathname: "/faucet",
                    }}
                  >
                    {LABELS.MENU_FAUCET}
                  </Link>
                </Menu.Item>
              )}
            </Menu>
          );
        }}
      >
        {props.children}
      </BasicLayout>
    </div>
  );
};
