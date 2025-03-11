/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import P_WhyUs_V2, { P_WhyUs_Mobile } from "./P_WhyUs_V2";
import { NavLink } from "react-router-dom";
import ReactGA from "react-ga4";
import { C_Button_Normal } from "../component/C_Button";
import { f_gaevent } from "../util";
const videoId = "hIymljYf-iQ";
const data = {
    // video: "https://www.youtube.com/embed/hIymljYf-iQ",
    // video: "https://www.youtube-nocookie.com/embed/hIymljYf-iQ",
    // video: "https://www.youtube-nocookie.com/embed/hIymljYf-iQ?modestbranding=1&rel=0&controls=1",
    video: "https://www.youtube-nocookie.com/embed/hIymljYf-iQ?modestbranding=1&rel=0&controls=1&enablejsapi=1&disablekb=1",

}
export function P_Home_Mobile() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: 'Page: Home' });
    }, [])
    return (
        <div >
            <section className="hero">
                <h1 className="hero-title">
                    Top Safe And Powerful <br /> Real-time Interview Assistant
                </h1>
                <div className="w-full mb-4">
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                        <VideoIframe />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-between items-center space-y-2 lg:space-y-0 gap-0">
                    <NavLink to="/get-started" className="w-full">
                        <button
                            className="w-4/5 bg-blue-300 text-black font-semibold px-6 py-3 rounded-lg hover:bg-blue-400 transition"
                            style={{ fontSize: '1rem' }}
                        >
                            Start For Free
                        </button>
                    </NavLink>
                    <p
                        className="w-9/10 text-gray-400 text-center lg:text-left leading-relaxed"
                    >
                        Demo is cheap, number can be faked, but a free trial with no features locked won't lie. Test it on your own right now.
                    </p>
                </div>
            </section>
            <div className="mt-0"></div>
            <P_WhyUs_Mobile />
        </div>
    );
}
// 异步加载video,避免阻塞页面加载, 不然PageSpeed Insights显示很慢

const VideoIframe = () => {
    const [isShow, setIsShow] = React.useState(false);
    const [clickTimes, setClickTimes] = useState(0);
    useEffect(() => {
        setIsShow(true);
    }, []);

    if (!isShow) return null;

    return <iframe
        title="video"
        src={data.video}
        className="absolute top-0 left-0 w-full h-full"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
    ></iframe>
}
function P_Home_V2() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", title: 'Page: Home' });
    }, [])
    return (
        <div >
            <section className="hero">
                <h1 className="hero-title">
                    Top Safe And Powerful <br /> Real-time Interview Assistant
                </h1>
                <section className="text-white py-8 px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between mx-auto gap-8"
                    // style={{ maxWidth: '2100px' }}
                    >
                        {/* 左侧视频区域 */}
                        <div className="w-full md:w-2/3 flex justify-center items-center mb-8 md:mb-0">
                            <div className="relative w-full max-w-[1200px] rounded-lg overflow-hidden shadow-lg" style={{ paddingTop: '56.25%' }}>
                                <VideoIframe />
                            </div>
                        </div>

                        {/* 右侧按钮和文本 */}
                        <div className="w-full md:w-1/3 flex flex-col justify-between items-center space-y-4 md:space-y-0 gap-4">
                            <NavLink to="/get-started"
                                onClick={() => { f_gaevent({ category: "Button", action: `Click Start For Free - Home`, label: "Start For Free - Home" }); }}
                            >
                                <C_Button_Normal className="bg-blue-300 text-black font-semibold px-6 py-3 rounded-lg hover:bg-blue-400 transition"

                                    style={{ fontSize: '20px' }}
                                >
                                    Start For Free
                                </C_Button_Normal>
                            </NavLink>
                            <p
                                className="text-gray-400 text-center md:text-left leading-relaxed"
                                // className="title-desc"
                                style={{ maxWidth: '600px', fontSize: '18px' }}

                            >
                                Demo is cheap, number can be faked, but a free trial with no features locked won't lie. Test it on your own right now.
                            </p>
                        </div>
                    </div>
                </section>

            </section>
            <P_WhyUs_V2 />
        </div>
    );
}

export default P_Home_V2;
