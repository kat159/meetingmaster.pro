import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import { ConfigProvider as AntdProvider, theme, Layout, Drawer } from "antd";
import { DollarCircleOutlined, HomeOutlined, MailOutlined, MenuOutlined, QuestionCircleOutlined, RocketOutlined } from "@ant-design/icons";

import { P_Home_Mobile } from "./page/P_Home_V2";
import P_404 from "./page/P_404";
// import P_FAQ_V2 from "./page/P_FAQ_V2";
// import P_GetStarted_V2 from "./page/P_GetStarted_V2";
// import P_Pricing_V2, { P_Payment_Success } from "./page/P_Pricing_V2";
// import P_Term from "./page/policies/P_Term";
// import P_Privacy from "./page/policies/P_Privacy";
// import P_Refund from "./page/policies/P_Refund";
// import P_Cookie from "./page/policies/P_Cookie";
const P_FAQ_V2 = lazy(() => import("./page/P_FAQ_V2"));
const P_GetStarted_V2 = lazy(() => import("./page/P_GetStarted_V2"));
const P_Pricing_V2 = lazy(() => import("./page/P_Pricing_V2"));
const P_Payment_Success = lazy(() => import("./page/P_Pricing_V2").then(module => ({ default: module.P_Payment_Success })));
const P_Term = lazy(() => import("./page/policies/P_Term"));
const P_Privacy = lazy(() => import("./page/policies/P_Privacy"));
const P_Refund = lazy(() => import("./page/policies/P_Refund"));
const P_Cookie = lazy(() => import("./page/policies/P_Cookie"));

export default function App_Moble() {
    return <Router>
        <div className="mobile">
            <Body />
        </div>
    </Router>
}
function Header() {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => setVisible(true);
    const onClose = () => setVisible(false);
    return <header className="header">
        <div className="header-logo" onClick={() => window.location.href = "/"} >
            <img src="/icon-taskbard.webp" alt="Logo" className="logo-image" title="Meeting Master" />
            <div className="logo-text">Meeting Master</div>
        </div>
        <MenuOutlined onClick={showDrawer} className="header-menu-icon" />
        {/* <Button type="default" icon={<MenuOutlined />} onClick={showDrawer} size="large"/> */}
        <Drawer
            className="menu-drawer"
            closeIcon={null}
            placement="right"
            onClose={onClose}
            visible={visible}
            bodyStyle={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            style={{ fontSize: "1rem" }}

        >
            <NavLink to="/" onClick={onClose} className="nav-link">
                <HomeOutlined style={{ transform: "scale(1.3)", marginRight: "1rem" }} />
                Home
            </NavLink>
            <NavLink to="/get-started" onClick={onClose} className="nav-link">
                <RocketOutlined style={{ transform: "scale(1.3)", marginRight: "1rem" }} />
                Get Started
            </NavLink>
            <NavLink to="/pricing" onClick={onClose} className="nav-link">
            <DollarCircleOutlined style={{ transform: "scale(1.3)", marginRight: "1rem" }} />
            Pricing</NavLink>
            <NavLink to="/faq" onClick={onClose} className="nav-link">
            <QuestionCircleOutlined style={{ transform: "scale(1.3)", marginRight: "1rem" }} />
            FAQ</NavLink>
            <NavLink to="mailto:meetlingmaster@gmail.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                <MailOutlined style={{ transform: "scale(1.3)", marginRight: "1rem" }} />Contact Us
            </NavLink>
        </Drawer>
    </header>
}
function Body() {
    return (
        <AntdProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: {
                },
            }}
        >
            <Layout >
                <div className="app">
                    <Header />
                    <div className="layout-content">
                        <Routes>
                            <Route path="/" element={<P_Home_Mobile />} />
                            <Route path="/get-started" element={<P_GetStarted_V2 />} />
                            <Route path="/pricing" element={<P_Pricing_V2 isDesktop={false} />} />
                            <Route path="/faq" element={<P_FAQ_V2 />} />
                            <Route path="/payment-success" element={<P_Payment_Success />} />
                            <Route path="/terms" element={<P_Term />} />
                            <Route path="/privacy" element={<P_Privacy />} />
                            <Route path="/refund" element={<P_Refund />} />
                            <Route path="/cookie" element={<P_Cookie />} />
                            <Route path="*" element={<P_404 />} />
                            {/* <Route path="/contact" element={<div>Contact Us Page</div>} /> */}
                        </Routes>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <div className="footer" style={{ display: "block", marginLeft: "auto", marginTop: "30px" }}>
                    <Footer />
                </div>

            </Layout>

        </AntdProvider>
    );
}
function Footer() {
    return (
        <Layout.Footer style={{ fontSize: "1rem" }}>
            <div >
                <a className="hover:text-white underline" href='./terms' target="_blank" rel="noreferrer" >Terms of service</a> |{" "}
                <a className="hover:text-white underline" href='./privacy' target="_blank" rel="noreferrer">Privacy Policy</a> |{" "}
                <a className="hover:text-white underline" href='./refund' target="_blank" rel="noreferrer">Refund Policy</a> |{" "}
                <a className="hover:text-white underline" href='./cookie' target="_blank" rel="noreferrer">Cookie Policy</a>
            </div>
            <div >
                © 2024 Meeting Master. All rights reserved.
            </div>
        </Layout.Footer>
    );
}