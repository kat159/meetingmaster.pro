/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
// 单个 FAQ 项目组件
function FAQItem({ number, question, answer, isOpen, onToggle }) {
    return (
        <div
            className={`bg-[#111] border border-[#222] rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? "mb-1" : "mb-1"}`}
        >
            {/* 问题部分 */}
            <div
                className="flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-[#1A1A1A] transition"
                onClick={onToggle}
            >
                <div className="flex items-center">
                    <span
                        className="rounded faq-number"
                        style={{
                            fontSize: "25px",
                            background: "linear-gradient(to top, #000, #242424)", // 黑到微灰的渐变
                            // width: "50px",
                            minWidth: "50px",
                            height: "50px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isOpen ? '#93C5FD' : "#c7c7c7",
                            borderRadius: "8px", // 添加圆角效果
                        }}
                    >
                        {number}
                    </span>
                    <span className="faq-title"
                        style={{
                            fontSize: "16px",
                            marginLeft: "20px",
                            color: isOpen ? '#93C5FD' : "#c7c7c7",
                        }}
                    >
                        {question}
                    </span>
                </div>
                <span className="faq-close-icon"
                    style={{
                        fontSize: "16px",
                        color: isOpen ? '#93C5FD' : "#c7c7c7",
                        marginLeft: "20px",
                    }}
                >
                    {isOpen ? <CloseOutlined /> : <PlusOutlined />}
                </span>
            </div>

            {/* 答案部分 */}
            {isOpen && (
                <div className="faq-content px-6 py-4 bg-[#1A1A1A] title-desc"
                // style={{
                //     fontSize: "16px",
                // }}
                >
                    {answer}
                </div>
            )}
        </div>
    );
}


// FAQ 页面
export default function P_FAQ_V2() {
    const faqs = [
        // {
        //     question: "How is the app window visible in your video while you claim it's hidden from screen capture?",
        //     answer: "We temporarily disabled that feature while recording the video guides to provide clearer demonstrations. However, rest assured that the app you receive will always include the feature to hide from screen sharing.",
        // },
        {
            question: "How can I test if your app hides during full-screen sharing?",
            answer: <div>
                <div>
                    <strong>Zoom Example:</strong>
                    <div style={{ margintop: '8px', }}> 1. Create two Zoom accounts (one as the user, the other as the interviewer).
                        <br /> 2. Start screen sharing using the user account in full-screen mode.
                        <br /> 3. Check whether our app appears on the interviewer's screen. </div>
                    <div style={{ margintop: '8px', }}> You can test this using a phone and computer, or the Zoom website and the Zoom desktop app. </div>
                    {/* <div style={{ margintop: '8px', }}>
                        <strong>Important Note:</strong> Carefully test this with any app that claims to hide from screen sharing.
                        Based on our users' experiences, some such apps fail to deliver on their promises,
                        which has resulted in users being blacklisted by their dream companies.
                    </div> */}
                </div>
            </div>,
        },
        // {
        //     question: "Why is my free trial credit getting cleared?",
        //     answer: "Because you log in with different accounts. Please log in with the same account during the trial period.",
        // },
        // {
        //     question: "How can I make AI's answers more detailed?",
        //     answer: "You can do this by simply modifying the request prompt. Check the videos on the 'Get Started' page to learn how.",
        // },
        // {
        //     question: "How to change coding language?",
        //     answer: "You can do this by simply modifying the request prompt. Check the videos on the 'Get Started' page to learn how.",
        // },
        // {
        //     question: "For coding problems, can I simply rely on AI?",
        //     answer: <div>
        //         <div>Yes, you can. But you need at least a basic understanding of coding.</div>
        //         <div style={{ marginTop: "8px" }}>
        //             Coding problems are different from other types of questions because they do not involve your
        //             personal experiences. Instead, they rely heavily on rote memorization and pattern matching.
        //             After all, nobody can invent a new algorithm on the spot during a one-hour coding interview.
        //         </div>
        //         <div style={{ marginTop: "8px" }}>
        //             The reason LeetCode experts can solve coding problems quickly is that they excel at pattern
        //             matching and have practiced extensively. When they encounter a new problem, they can relate
        //             it to similar problems they've already solved — and this is where AI excels.
        //         </div>
        //         <div style={{ marginTop: "8px" }}>
        //             Current GPT-4o can handle 99% of coding interview problems, as most of them are identical or
        //             very similar to those found on platforms like LeetCode and HackerRank. Even if it provides an
        //             incorrect answer, you can use our follow-up request feature to refine the AI's response
        //             based on feedback from the interviewer, which also highlights your ability to learn and
        //             communicate effectively.
        //         </div>
        //     </div>
        //     ,
        // },
        // You can create multiple requests, using GPT-4o-mini for faster responses in simple scenarios and GPT-4o for handling more complex questions. Because you may have also noticed that GPT-4o's response speed has recently become quite unstable, sometimes lagging significantly.
        // {
        //     question: "What model do you use?",
        //     answer: `We support GPT-4o and GPT-4o-mini. `
        // },
        // {
        //     question: "My mouse keeps flickering?",
        //     answer: "This happens because you've selected the input source but haven't entered the interview. Launch the interview or click 'Refresh Page' at the bottom left of the homepage to resolve the issue."
        // },
        {
            question: "What’s your refund policy?",
            answer: "We don’t accept refunds after payment, since you can explore all features during the free trial.",
        },
        // {
        //     question: "Can I upload my resume/experience for AI-generated answers?",
        //     answer: "Yes, go to 'Experience,' paste your resume/experience. Press Alt+1 during the interview, the AI will use it to generate tailored answers. Watch the videos in 'Get Started' for how it works and create your custom requests.",
        // },
        // {
        //     question: "What model do you use for local GPU-based Transcription?",
        //     answer: "Openai Whisper."
        // },
        {
            question: "How is the credit usage calculated?",
            answer: "Check the 'Pricing' page for details."
        },
        {
            question: "Is your app helping interviewees cheat in interviews?",
            answer: <div>
                {/* <div className="mb-2">
                    No, this app is designed to assist you in presenting your <strong>best self</strong> during interviews.
                </div> */}
                <div className="mb-2">
                    No, when we say <strong>"stealthy"</strong> or <strong>"safe"</strong>, we are not talking about hiding cheating from interviewers.
                    We simply aim to minimize the chances of <strong>losing points</strong> during the interview process.
                </div>
                <div className="mb-2">
                    For example, the <strong>"hide from screen sharing"</strong> feature ensures that the app does not obstruct
                    any content that the interviewer needs to see.
                </div>
                <div className="mb-2">
                    Similarly, the <strong>"avoid eye movement"</strong> feature is designed to help improve your <strong>impression score</strong>.
                    Frequent or erratic eye movements can negatively impact how interviewers perceive you.
                    Think about it: when speaking to someone who maintains steady eye contact versus someone whose
                    eyes nervously dart around—who do you think leaves a better impression?
                </div>

            </div>,
        },
        {
            question: "Why should I use an interview assistant?",
            answer: <div>
                <div style={{ marginTop: "8px" }}>
                    The number of interviewees relying on interview assistants is far beyond your imagination.
                    {/* If you don’t use one, how can you compete with them?  */}
                    Without it, not only will you fall behind in interviews,
                    but also in your actual work capabilities.
                </div>
                <div style={{ marginTop: "8px" }}>
                    Think about it: you spend 10 days preparing answers to interview questions, but spend months memorizing them,
                    fearing you might forget under the pressure of an interview. Or worse, you spend months grinding LeetCode problems
                    that you’ll never use on the job. Meanwhile, our users are investing that time into learning new skills,
                    gaining internships, and improving their real-world work abilities. Where is your competitiveness?
                </div>
                {/* <div style={{ marginTop: "8px" }}>
                    You dedicate so much time to preparing for interviews, all for the sake of maintaining your so-called “integrity” for the company.
                    But what about the company? Will they uphold “integrity” for you? During layoffs, when they realize your skills
                    lag behind those of our users, will they spare you out of respect for your “integrity”?
                </div> */}
                <div style={{ marginTop: "8px" }}>
                    If others use it and you don’t, you’ll already be falling far behind in your career path.
                    So, please choose the most powerful interview assistant to boost your competitiveness.
                    {/* ,enhance your work abilities, and secure your future. */}
                </div>
            </div>
        },
        {
            question: "Can I use your app in school exams?",
            answer: "Only if your school allows it. Please use it responsibly.",
        },
        {
            question: "The app has been unintentionally zoomed in. How can I fix it?",
            answer: "Press F1.",
        }
    ];
    const faqs_fake = [
        {
            question: "Do you have industry-specific models?",
            answer: <div>
                <div>
                    No, we don’t. Because it is a <strong>scam</strong>. While "industry-specific models" do exist,
                    they are only achievable by large-scale companies and are completely unrealistic for any
                    interview assistant company.
                </div>
                <div style={{ marginTop: "8px" }}>
                    Training a model involves collecting and cleaning massive datasets, hiring a team of highly
                    skilled AI experts (with annual salaries of $300K+), and utilizing thousands of A100 GPUs
                    continuously for months. Such an endeavor requires at least millions of dollars for a single
                    industry model. Training models across multiple industries would cost hundreds of millions. A
                    company built on scamming interviewees simply cannot afford such resources.
                </div>
                <div style={{ marginTop: "8px" }}>
                    <strong>How to verify:</strong>
                    <div className="mt-2">
                        Change the model of the request in our app to GPT-4o (it’s
                        defaulted to GPT-4o-mini). We also provide a custom request feature that allows you to create your
                        own prompts and requests tailored to different types of questions. You can refine your prompts by
                        repeatedly testing and modifying them with ChatGPT to get the best possible answers.
                    </div>
                    <div className="mt-2">
                        Then, simply ask an industry-specific question to those products
                        and compare their answers with our app’s answers using your free trial. See for yourself which
                        one performs better.
                    </div>
                </div>
                <div style={{ marginTop: "8px" }}>
                    They lock the feature behind a paywall? It’s because they know it’s a
                    scam and don’t want you to find out.

                </div>
            </div>
            ,
        },
        {
            question: "Would your app help me effortlessly ace the interview?",
            answer: <div>
                We can't. Because 'effortlessly' means relying entirely on AI which is not always accurate.
                <div className="mt-2">
                    However, with preparing your answers in advance by iteratively refining them with ChatGPT and get your orginal answers back with our app, you can achieve 'slight effort ace the interview'.
                </div>
                <div className="mt-2">If someone claims you can effortlessly ace the interview with their AI-generated answers being 100% correct, they are misleading you.
                    Check FAQ-3 to learn the limitations of AI-generated answers, and how to verify.
                </div>
            </div>,
        },
        {
            question: "Some interview tools claim their AI-generated answers are 100% correct, but you say otherwise. How can I trust you?",
            answer: <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.6" }}>
                <div style={{ marginBottom: "8px", fontWeight: "bold", fontSize: "18px" }}>
                    Let’s use two types of interview questions as examples:
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <strong>1. Behavioral Questions:</strong>
                </div>
                <div style={{ marginBottom: "8px" }}>
                    These often involve your work and project experience, which can span years and be too extensive for AI to handle. APIs provided by companies like OpenAI and Anthropic are stateless, meaning they cannot retain your information and cannot process too much information in a single request. If you rely entirely on AI for this type of question, you will ultimately fail your interview as the AI will start fabricating inaccurate details.
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <strong>2. Technical Questions:</strong>
                </div>
                <div style={{ marginBottom: "8px" }}>
                    AI-generated answers can sometimes be overly simplistic and generic, especially for questions that are deceptively simple yet deeply probing.
                </div>
                <div style={{ marginBottom: "8px" }}>
                    The simpler the question, the more likely it is to be aimed at beginners. As a result, there’s an abundance of online resources tailored to beginners, and AI models trained on such data tend to favor beginner-friendly answers.
                </div>
                <div style={{ marginBottom: "8px" }}>
                    For instance, asking for a game project code with OOP design often results in basic, beginner-level code. However, real-world game companies expect far greater complexity.
                </div>

                <div style={{ marginBottom: "8px" }}>
                    It’s difficult to correct GPT’s response tendencies for all questions using a single prompt. When using ChatGPT outside of an interview, you have the flexibility to customize prompts for each question to get answers tailored to your needs. However, during an interview, you don’t have that luxury.
                </div>

                <div style={{ marginBottom: "8px" }}>
                    Therefore, it’s crucial to prepare the best possible answers in advance by iteratively refining them with ChatGPT and let{" "}
                    <strong>Meeting Master</strong> return your polished answers.
                </div>

                <div style={{ marginBottom: "8px" }}>
                    <strong>How to verify:</strong>
                </div>

                <div style={{ marginBottom: "8px" }}>
                    Take a free trial of those products claiming to provide 100% correct answers.
                    Then, ask them a simple yet deep probing question and observe if their answers are overly simplistic.
                </div>

                <div style={{ marginBottom: "8px" }}>
                    If you’re having a hard time coming up with a question, here’s an example of a simple yet deep coding question:
                    "Give me a coding example of a game project using OOP design."
                </div>

                <div style={{ marginBottom: "8px" }}>
                    The answer you’ll likely get will look something like this:
                    classes "Character", "Enemy", and "Player", with properties like "name", "health", "attack_power", and "defense",
                    along with functions such as "attack" and "take_damage".
                    This is a typical, overly simplistic code designed to cater to beginners. No company building a game more complex than Snake would code like this.
                    If you present this kind of code during an interview, you’ve already lost.
                </div>

                <div style={{ marginBottom: "8px" }}>
                    Of course, it’s better to come up with your own test question when evaluating these products.
                    Some interview assistant companies may see this text and fine-tune their prompts accordingly.
                    For example, they could revise the gpt prompt like, "If the interviewer asks for a coding example of a game project with OOP design,
                    respond in this way..."
                </div>

            </div>,
        },
    ]

    return (
        <section className="bg-black text-white ">

            <div className="title-container title-bg-2">
                <h2 className="title">
                    Frequently Asked Questions
                </h2>
                <p 
                className="title-desc-text"
                >
                    Still you have any questions? Contact our Team via meetlingmaster@gmail.com.
                </p>
            </div>
            {/* FAQ 容器 */}
            <C_FAQs faqs={faqs} />
        </section>
    );
}
export function C_FAQs({ faqs }) {
    const [openIndex, setOpenIndex] = useState(null);

    return <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto items-start"
        style={{ marginTop: "10px", maxWidth: '1600px' }}
    >
        {faqs?.map((faq, index) => {
            // index = index + faqs_fake.length
            return (
                <FAQItem
                    key={index}
                    number={index + 1}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    onToggle={() =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
            )
        }
        )}
    </div>
}

