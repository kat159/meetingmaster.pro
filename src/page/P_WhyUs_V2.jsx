/* eslint-disable react/jsx-pascal-case */
import React from "react";
import { CheckCircleFilled, CheckCircleOutlined, EyeFilled, EyeOutlined, SafetyCertificateFilled, SafetyCertificateOutlined } from "@ant-design/icons";
import config from "../config";
import { NavLink, useNavigate } from 'react-router-dom';

const data = {
    title: "Why Choose Meeting Master?",
    desc: [
        'After over a year of continuous research and development focused on the interviewee\'s perspective, we have identified and addressed the pain points found in existing real-time interview assistants.',
        'Our app delivers a truly seamless and effective interview assistant experience—far beyond a simple, mediocre demo.',
    ]
}
const features = [
    {
        iconSrc: "/icon-1.png",
        icon: <EyeOutlined />,
        title: "Transparency",
        description: `NO LOCKED FEATURES in your free trial, and detailed video guides to help you test our features. 
            
We have nothing to hide because the features of our app will speak for themselves.`,
        buttonText: "Try For Free",
    },
    {
        iconSrc: "/icon-2.png",
        icon: <SafetyCertificateOutlined />,
        title: "Top Safety",
        description: `While ensuring that our software remains undetectable by any interview platform, we have specifically developed features to address the issue of eye movement during software-assisted interviews. Your safety is our success.
`,
        buttonText: "Learn More",
    },
    {
        iconSrc: "/icon-3.png",
        icon: <CheckCircleOutlined />,
        title: "100% Answer Accuracy",
        description: `While we provide the same feature as other interview assistants to generate AI-powered answers based on your experience and resume, AI is not flawless. To address this, we’ve developed an advanced question-searching feature using cutting-edge search technology. This ensures that during the interview, you receive your pre-prepared answers, guaranteeing 100% accuracy.
`,
        buttonText: "Learn More",
    },
];
function FeatureCard({ iconSrc, icon, title, description, buttonText }) {
    const descriptionParagraphs = description.split("\n").filter(Boolean);
    const nav = useNavigate();
    return (
        <div className="bg-[#111] rounded-lg p-8 text-white shadow-md border-x border-b border-[#222] flex flex-col h-full">
            {/* 图标区域 */}
            <div className="flex justify-center mb-1">
                <div className="bg-[#1A1A1A] p-3 rounded-md flex items-center justify-center"
                    style={{
                        fontSize: '60px',
                        color: config.color_primary,
                        background: "linear-gradient(to top, #000, #242424)", // 黑到微灰的渐变
                    }}
                >
                    {icon}
                </div>
            </div>
            <h3
                className="text-[25px] font-medium mb-5 justify-center text-center"
            >{title}</h3>
            <div
                className="text space-y-2"
                style={{
                    color: '#c7c7c7',
                }}
            >
                {descriptionParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* 占位符推动按钮到底部 */}
            <div className="flex-grow"></div>
            {/* 按钮 */}
            <NavLink to="/get-started" >
                <div className="flex justify-center mt-auto" style={{ marginTop: '50px' }}>
                    <button
                        className="w-full bg-[#222] text-white py-2 px-4 rounded-md hover:bg-[#333] transition text-[1.5rem]"
                    >
                        {buttonText}
                    </button>
                </div>
            </NavLink>
        </div>
    );
}
function FeatureCard_Mobile({ iconSrc, icon, title, description, buttonText }) {
    const descriptionParagraphs = description.split("\n").filter(Boolean);
    const nav = useNavigate();
    return (
        <div className="bg-[#111] p-4 text-white shadow-md border-x border-b border-[#222] flex flex-col h-full">
            {/* 图标与标题区域 */}
            <div className="flex items-center gap-4 mb-2">
                <div 
                    className="bg-[#1A1A1A] p-3 rounded-md flex items-center justify-center"
                    style={{
                        fontSize: '30px',
                        color: config.color_primary,
                        background: "linear-gradient(to top, #000, #242424)",
                    }}
                >
                    {icon}
                </div>
                <h3 className="text-[1.5rem] font-medium text-left">{title}</h3> 
            </div>

            {/* 描述区域，沾满整行 */}
            <div className="text space-y-2 w-full" style={{ color: '#c7c7c7' }}>
                {descriptionParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>

            {/* 占位符推动按钮到底部 */}
            <div className="flex-grow"></div>

            {/* 按钮 */}
            <NavLink to="/get-started">
                <div className="flex justify-start">
                    <button
                        className="text-[1rem] mt-4 w-full bg-[#222] text-white py-2 px-4 rounded-md hover:bg-[#333] transition"
                    >
                        {buttonText}
                    </button>
                </div>
            </NavLink>
        </div>
    );
}
export default function P_WhyUs_V2() {
    return (
        <section className="content">
            <div className="title-container title-bg-1">
                <h2 className="title">{data.title}</h2>
                <div className="title-desc" >
                    {data.desc.map((desc, index) => (
                        <div key={index}>{desc}</div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3"
                style={{width: "100%",}}
            >
                {features.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        iconSrc={feature.iconSrc}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        buttonText={feature.buttonText}
                    />
                ))}
            </div>
        </section>
    );
}
export  function P_WhyUs_Mobile() {
    return (
        <section className="content">
            <div className="title-container title-bg-1">
                <h2 className="title">{data.title}</h2>
                <div className="title-desc" >
                    {data.desc.map((desc, index) => (
                        <div key={index}>{desc}</div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3"
                style={{width: "100%",}}
            >
                {features.map((feature, index) => (
                    <FeatureCard_Mobile
                        key={index}
                        iconSrc={feature.iconSrc}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                        buttonText={feature.buttonText}
                    />
                ))}
            </div>
        </section>
    );
}