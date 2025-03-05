/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { CloseOutlined, DownloadOutlined, PlusOutlined, VideoCameraOutlined, WindowsFilled } from "@ant-design/icons";
import { Button, List, Popover, Space, Table } from "antd";
import { C_FAQs } from "./P_FAQ_V2";

const curVersion = '3.6.8';
const downloadData = [
    {
        platform: "Windows",
        icon: <WindowsFilled />,
        version: curVersion,
        name: `Download for Windows v${curVersion}`,
        link: `https://github.com/meetingmaster/meeting-master-general/releases/download/v${curVersion}/meeting-master_${curVersion}.exe`,
        // link: `https://github.com/meetingmaster/meeting-master-general/releases/download/v3.6.8/meeting-master_3.6.8.exe`,
    }
];

const TT_FAQs_ = ({ faqs, head, botton }) => {
    return (
        <span>
            <Popover
                trigger="hover"
                placement="right"
                content={
                    <div style={{ fontSize: "16px" }}>
                        <div>
                            {head}
                        </div>
                        <div>
                            {faqs && faqs.length > 0 &&
                                <Table
                                    className='faq-table'
                                    dataSource={faqs}
                                    size="small"
                                    style={{ minWidth: "1200px", maxWidth: "1400px", fontSize: "14px" }}
                                    columns={[
                                        {
                                            title: "Question",
                                            dataIndex: "question",
                                            key: "question",
                                        },
                                        {
                                            title: "Answer",
                                            dataIndex: "answer",
                                            key: "answer",
                                        },
                                    ]}
                                    bordered
                                />
                            }
                        </div>
                        {botton}
                    </div>
                }
            >
                <span className="ml-2 cursor-pointer link">
                    FAQs
                </span>
            </Popover>
        </span>
    );
}
const faqs_QuestionSearch = <TT_FAQs_ faqs={[
    {
        question: "Why does the system return answers for previous questions during my test?",
        answer: `This happens when you didn't verbally answer the question, or the answer was incomplete 
leading the system to think the previous questions were also unanswered.`
    },
    {
        question: "Sometimes, partially related answers are returned. For example, in the video, when I tested by asking about Object-Oriented Programming, the system returned answers for both OOP and Functional Programming.",
        answer: `Yes, the system sometimes returns related questions instead of only questions strictly matching the input. In this case, it's because Functional programming and OOP both belong to Programming Paradigms. This behavior is somewhat random. However, rest assured, this will not cause the loss of precisely matched answers.`
    },
    {
        question: `I have imported thousands of questions, how to delete them all?`,
        answer: `Create an empty CSV file and import it, then choose "Remove All and Import".`
    },
    {
        question: `I tested a interview question that should return dozens of prepared answers, but the system only returned a few. Why?`,
        answer: `We limit the maximum number of answers returned to 5.`
    }
]}
/>
const faq_KeepSafe = <TT_FAQs_
    faqs={[
        {
            question: `I pressed 'Alt + - | =', but font size didn't change?`,
            answer: `Press Alt + B. You might be adjusting header.`
        },
        {
            question: `Dialog, solution tags and screenshots all disappeared?`,
            answer: `Press 'Ctrl + \\`
        }
    ]}
/>
const faq_general = <TT_FAQs_ faqs={[
    {
        question: "Transcription not works",
        answer: <div>
            Check the following:
            <C_List items={[
                "Press 'Alt + Tab'in an interview. You might have hidden the dialog window. Becuase the change will be persisted.",
                "Press 'Ctrl + \\' then press 'Alt + Tab'. You might have enabled 'Show Answer Only'.",
                "System volume is not too low.",
                // "Headphones are not connected.",
            ]} />
            <div>If the issue still persists, please contact us.</div>
        </div>
    }
]}
/>
const quickStartData = {
    // title: "Video Guides",
    // desc: "All the requests created in the videos and the shortcuts used have been set up in your app.",
    items: [
        {
            subtitle: "General Verbal Questions and Search Your Prepared Answer",
            youtubeSrc: "8mAdrj8cVUM",
            description: <div className="title-desc">
                <div>00:00 - 00:20: Requirements. {faq_general}</div>
                <div>00:20 - 01:50: Build a Simple Experience/Resume based Request </div>
                <div>01:50 - 02:40: Request with Manual Input. </div>
                <div>02:40 - 03:25: Make Answers More Detailed. </div>
                <div>03:25 - 04:25: Overrdie/Add Instructions During the Interview.</div>
                <div>04:25 - 07:15: Return Your Prepared Answers.  {faqs_QuestionSearch} </div>
            </div>,
        },
        {
            subtitle: "Custom Request for Industry Specific Problems (Example of Coding Problems)",
            youtubeSrc: "6x6Z3OwGRp0",
            description: <div className="title-desc">
                <div>00:00 - 01:30: Ask GPT how to create prompts to gain inspiration.</div>
                <div>01:30 - 02:30: Build a Request Based on GPT's Suggestions. </div>
                <div>02:30 - 03:50: Switch from auto-detecting the coding language to enforcing a specific language output.</div>
                <div>03:50 - 04:20: Use Manual Screenshot</div>
                <div>04:20 - 05:29: Improve Response Structure & Extract solutions and contents from answers</div>
            </div>
        },
        {
            subtitle: "Keep Safe",
            youtubeSrc: "dbX_NJYr2MQ",
            description: <div className="title-desc">
                <div>00:00 - 00:30: Avoid gaze shift in different interview stage</div>
                <div>00:30 - 01:40: Avoid noticeable eye movement while communicate</div>
                <div>01:40 - 02:10: Avoid mouse operations under screen sharing</div>
                <div>02:10 - 11:25: Set up Copy Mode from scratch</div>
                <div>11:25 - 14:05: Comprehensive showcase</div>
                <div>14:05 - 14:15: Additional points.</div>
                <div> {faq_KeepSafe} </div>
            </div>
        },
        {
            youtubeSrc: "Othp7Gek1wE",
        },
        {
            youtubeSrc: "11LKLJF_LIE",
        },
    ],
};
const faq = [
    {
        question: "How can I safely use shortcuts? My keyboard is very loud.",
        answer: <div> <C_List items={[
            "Consider buying a silent keyboard, preferably one made of silicone material. It costs only around $20 on Amazon.",
            "If you're worried that using a silent keyboard might raise suspicion, our app can also play keyboard sounds when you're typing normally and automatically mute them when using shortcuts.",
            "If you're using headphones, you can still play keyboard sounds locally or on a secondary device.",
            "For keyboard sound settings and tutorials, go to 'Settings → Display' in the app, and navigate to 'Keyboard Sound' in the left-side menu.",
        ]} />
        </div>
    },
    {
        question: "Transcription not works?",
        answer: <div>
            Check the following:
            <C_List items={[
                "Press 'Alt + Tab'in an interview. You might have hidden the dialog window. Becuase the change will be persisted.",
                "Press 'Ctrl + \\' then press 'Alt + Tab'. You might have enabled 'Show Answer Only'.",
                "System volume is not too low.",
                // "Headphones are not connected.",
            ]} />
            <div>If the issue still persists, please contact us.</div>
        </div>
    },
    {
        question: "Why does the system return answers for previous questions during my test?",
        answer: `This happens when you didn't verbally answer the question, or the answer was incomplete 
leading the system to think the previous questions were also unanswered.`
    },
    {
        question: "Sometimes, partially related answers are returned. For example, in the video, when I tested by asking about Object-Oriented Programming, the system returned answers for both OOP and Functional Programming.",
        answer: `Yes, the system sometimes returns related questions instead of only questions strictly matching the input. In this case, it's because Functional programming and OOP both belong to Programming Paradigms. This behavior is somewhat random. However, rest assured, this will not cause the loss of precisely matched answers.`
    },
    {
        question: `I have imported thousands of questions, how to delete them all?`,
        answer: `Create an empty CSV file and import it, then choose "Remove All and Import".`
    },
    {
        question: `I pressed 'Alt + - | =', but font size didn't change?`,
        answer: `Press Alt + B. You might be adjusting header.`
    },
    {
        question: `Dialog, solution tags and screenshots all disappeared?`,
        answer: `Press 'Ctrl + \\`
    }
]
export function C_List({ items }) {
    return (
        <List
            size="small"
            dataSource={items}
            renderItem={(item, index) => (            // 渲染每一项
                <List.Item key={index}
                    // className="title-desc"
                    style={{
                        marginBottom: "0px",
                        // color: 'rgba(255, 255, 255, 0.73)' 
                    }}>
                    {item}
                </List.Item>
            )}
        />
    );
}
const whatsNewData = [
    {
        version: "3.0.0",
        content: <C_List
            items={[
                "New feature: Shortcuts Chain. You can create one shortcut to trigger a series of existing shortcut actions.",
                "New feature: Mark the current answer to quickly shift to it.",
                "Update: Simplified the shortcut settings for Copy Mode to quickly adjust the display to fit the input window.",
                "Update: Made the story title repeatable.",
                "Update: Now, scrolling a line corresponds to an actual line, regardless of its size and line height, either it's header, or text or code. Changing the display mode, font size, or line height will no longer cause the first line of text to disappear or be pushed downward. (Note: 1. However, moving the border is still calculated based on the text size you set in the app. 2. The position of Auto Scroll cannot be recorded. You need to use Alt+W|S|A|D to turn off Auto Scroll in order to record the current position)",
                "Fix: Changing font-size caused the top line of text disappear or pushed down.",
                "Fix: Changing deplay modes caused the top line of text disappear or pushed down.",
            ]}

        />,
    },
    {
        version: "2.3.0",
        content: <C_List
            items={["Fix: Resolved the issue where GPU transcription occasionally failed to start.",
            ]}
        />,
    },
    {
        version: "2.2.0",
        content: <C_List items={["Update: Increase free trial time to 1000 credits. an extra 500 credits have been added to all existing accounts. For paid users, this update will also apply—you will be able to use any remaining free trial credits after your subscription period ends",
        ]} />,
    },
].map((item, index) => ({ ...item, key: index }))
const C_WhatsNew = () => {
    return (
        <Popover
            content={
                <div>
                    <div className="title-desc" style={{ marginBottom: "0px" }}>
                        Some updates may not be reflected in the video.
                    </div>
                    <div className="title-desc" style={{ marginBottom: "5px" }}>
                        If you notice any missing updates while watching the video, please email us to let us know.
                    </div>
                    <Table
                        dataSource={whatsNewData}
                        size="small"
                        style={{ maxWidth: "800px" }}
                        columns={[
                            {
                                title: "Version",
                                dataIndex: "version",
                            },
                            {
                                title: "Updates",
                                dataIndex: "content",
                            },
                        ]}
                        bordered
                    />
                </div>
            }
            trigger={["click"]}
        >
            <span className="justify-center link ml-2">
                What's New
            </span>
        </Popover>
    );
}
export default function P_GetStarted_V2() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section className="bg-black text-white ">
            {/* 标题部分 */}
            <div className="title-container title-bg-3">
                <h2 className="title">
                    Get Started
                </h2>
                <Space style={{ gap: "20px" }}>
                    {/* <div className="title-desc justify-center" style={{ marginBottom: '0px' }}>
                        Current Version: {curVersion}
                    </div> */}
                    <Popover
                        overlayStyle={{
                            // width: "400px",
                            maxWidth: "min(600px, calc(100% - 40px))",
                        }}
                        trigger="click"
                        placement="bottom"
                        content={<div>
                            {
                                downloadData.map(({ platform, icon, version, link }, index) => (
                                    <div key={index}> 
                                        <div className="download-note">
                                            Your browser or operating system might flag our software as potentially unsafe, but please rest assured — our software is completely safe to use. This is a false positive caused by the way some systems handle less commonly downloaded software.
                                        </div>
                                        <a
                                            key={index}
                                            href={link}
                                            className={`link`}
                                            download
                                            target="_blank"
                                            rel="noreferrer"
                                            alt="Download"
                                        >
                                            <span className="download-icon">
                                                {icon}
                                            </span>
                                            <span className="download-text">
                                                Download for {platform} v{version}
                                            </span>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>}
                    >
                        <div
                            className="link"
                        >
                            <DownloadOutlined className="link-icon" style={{ marginRight: '5px' }} />
                            Download App
                        </div>
                    </Popover>
                    {/* {
                        downloadData.map((download, index) => (
                            <div key={index}>
                                <a
                                    key={index}
                                    href={download.link}
                                    className={`link`}
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    alt="Download"
                                >
                                    <DownloadOutlined className="link-icon" style={{ marginRight: '5px' }} />
                                    {download.name}
                                </a>
                            </div>
                        ))
                    } */}
                </Space>
                <p className="title-desc justify-center" style={{ marginBottom: '5px' }}>
                    Download the app, open it, and then log in with your Google Account to start your free trial. No credit card required, no additional steps needed.
                </p>
                <p className="title-desc justify-center" style={{ marginBottom: '5px' }}>
                    All the requests and shortcuts created/used in the videos have been set up in your app.
                </p>
            </div>
            <section
                // style={{ maxWidth: "1800px", margin: "0 auto", marginTop: "20px" }}
                className="content"
            >
                <Section title={quickStartData.title} desc={quickStartData.desc} items={quickStartData.items} />
            </section>
            <br />
            <C_FAQs faqs={faq} />
        </section>
    );
}

const QuickStartItem = ({ subtitle, youtubeSrc, description }) => {
    return (
        <div
            className="bg-black rounded-lg overflow-hidden relative"
            style={{
                maxWidth: "800px", // 每个视频最大宽度
                width: "100%", // 宽度自适应
                margin: "0 auto", // 居中显示
                position: "relative", // 父容器相对定位
                paddingTop: "56.25%", // 16:9 比例 (9/16 = 0.5625)
            }}
        >
            <iframe
                title="video"
                src={`https://www.youtube.com/embed/${youtubeSrc}`}
                className="absolute top-0 left-0 w-full h-full"
                frameBorder="0"
                allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};


const Section = ({ title, desc, items, downloadData }) => {
    return (
        <section
            style={{
                maxWidth: "1800px",
                margin: "0 auto",
                marginTop: "30px",
            }}
        >
            {/* 标题 */}
            <div className="text-center mb-16">
                <h2 className="title">{title}</h2>
                <div className="title-desc">{desc}</div>
            </div>

            {/* 两列内容块布局 */}
            {items && (
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                    style={{
                        justifyItems: "center", // 居中内容
                    }}
                >
                    {items.map((item, index) => (
                        <QuickStartItem
                            key={index}
                            subtitle={item.subtitle}
                            youtubeSrc={item.youtubeSrc}
                            description={item.description}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};