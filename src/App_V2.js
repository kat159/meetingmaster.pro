import React, { Suspense, lazy, useEffect } from "react";

import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from "react-router-dom";

import { ConfigProvider as AntdProvider, theme, Layout } from "antd";

import { MailOutlined } from "@ant-design/icons";

// import P_Pricing_V2, { P_Payment_Success } from "./page/P_Pricing_V2";

// import P_FAQ_V2 from "./page/P_FAQ_V2";
// import P_GetStarted_V2 from "./page/P_GetStarted_V2";
// import P_Term from "./page/policies/P_Term";
// import P_Privacy from "./page/policies/P_Privacy";
// import P_Refund from "./page/policies/P_Refund";
// import P_Cookie from "./page/policies/P_Cookie";
import ReactGA from "react-ga4";
import P_Home_V2 from "./page/P_Home_V2";
import P_404 from "./page/P_404";
const P_FAQ_V2 = lazy(() => import("./page/P_FAQ_V2"));
const P_GetStarted_V2 = lazy(() => import("./page/P_GetStarted_V2"));
const P_Pricing_V2 = lazy(() => import("./page/P_Pricing_V2"));
const P_Payment_Success = lazy(() => import("./page/P_Pricing_V2").then(module => ({ default: module.P_Payment_Success })));
const P_Term = lazy(() => import("./page/policies/P_Term"));
const P_Privacy = lazy(() => import("./page/policies/P_Privacy"));
const P_Refund = lazy(() => import("./page/policies/P_Refund"));
const P_Cookie = lazy(() => import("./page/policies/P_Cookie"));

export default function App_V2() {
    return <Router>
        <Body />
    </Router>
}
function Header() {
    return <header className="header">
        <div className="header-logo" onClick={() => window.location.href = "/"} >
            <img src="/icon-taskbard.webp" alt="Logo" className="logo-image" title="Meeting Master" />
            <div className="logo-text">Meeting Master</div>
        </div>
        <nav
            className="nav"
            style={{
                display: "flex",            // 使用 flexbox
                justifyContent: "center",   // 水平方向居中
                alignItems: "center",       // 垂直方向居中（确保高度一致）
                gap: "20px",                // 每个导航链接之间的间距
            }}
        >
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
                Home
            </NavLink>
            <NavLink
                to="/get-started"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
                Get Started
            </NavLink>
            <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
                Pricing
            </NavLink>
            <NavLink
                to="/faq"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
                FAQ
            </NavLink>
        </nav>
        <div className="social" >
            <span>Stay Connected</span>
            {/* <NavLink to="https://discord.gg/FRjfZteqvx" target="_blank" rel="noopener noreferrer" className="nav-link">
                <DiscordOutlined style={{ transform: "scale(1.5)" }} />
            </NavLink> */}
            <NavLink to="mailto:meetlingmaster@gmail.com" target="_blank" rel="noopener noreferrer" className="nav-link">
                <MailOutlined style={{ transform: "scale(1.5)" }} />
            </NavLink>
        </div>
    </header>
}
function Body() {
    const location = useLocation();
    const noLayoutPaths = ["/terms", "/privacy", "/refund", "/cookie"];
    const hideLayout = noLayoutPaths.includes(location.pathname);
    // if (hideLayout) {
    //     console.log("Hide Layout");
    //     return <div className="terms">
    //         <Routes>
    //             <Route path="/terms" element={<P_Term />} />
    //             <Route path="/privacy" element={<P_Privacy />} />
    //             <Route path="/refund" element={<P_Refund />} />
    //             <Route path="/cookie" element={<P_Cookie />} />
    //         </Routes>
    //     </div>
    // }
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
                    <div style={{ minHeight: "calc(100vh - 4rem)", marginTop: "4rem" }}>
                        <Routes>
                            <Route path="/" element={<P_Home_V2 />} />
                            <Route path="/get-started" element={<P_GetStarted_V2 />} />
                            <Route path="/pricing" element={<P_Pricing_V2 />} />
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
        <Layout.Footer>
            <div  >
                <a className="hover:text-white underline" href='./terms' target="_blank" rel="noreferrer" >Terms of service</a> | <a className="hover:text-white underline" href='./privacy' target="_blank" rel="noreferrer">Privacy Policy</a> | <a className="hover:text-white underline" href='./refund' target="_blank" rel="noreferrer">Refund Policy</a> | <a className="hover:text-white underline" href='./cookie' target="_blank" rel="noreferrer">Cookie Policy</a>
            </div>
            <div >
                © 2024 Meeting Master. All rights reserved.
            </div>
            {/* <div className="title-desc">
                Logo by{" "}
                <a className="hover:text-white underline" 
                    // href="https://delapouite.com/" 
                    // target="_blank" rel="noreferrer"
                    >
                    Delapouite
                </a>
                {" "}under CC BY 3.0
            </div> */}
        </Layout.Footer>
    );
}