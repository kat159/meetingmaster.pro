/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Typography, Popconfirm, Alert, message, List, Popover, Divider } from "antd";
import { Table } from 'antd';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    getRedirectResult,
    RecaptchaVerifier,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import Markdown from "react-markdown";
import config from "../config";
import { C_FAQs } from "./P_FAQ_V2";
import { C_List } from "./P_GetStarted_V2";
import { GiftOutlined, ShareAltOutlined, TrophyOutlined } from '@ant-design/icons';
import "./P_Pricing.css";
import ReactGA from "react-ga4";
import { f_gaevent } from "../util";
const wordToTokens = 1.33


export let credit_screenshot = NaN
export let credit_transcribe_per_second = NaN
export let credit_OA_per_second = NaN
export let credit_per_question = NaN
export let credit_per_question_search = NaN
export let modelCreditsCost = {
    'gpt-4o': {
        input: NaN,
        output: NaN,
    },
    'gpt-4o-mini': {
        input: NaN,
        output: NaN,
    },
    'search-question': {
        input: NaN,
        output: NaN,
    },
    'convert-markdown': {
        input: NaN,
        output: NaN,
    },
    'o1': {
        input: NaN,
        output: NaN,
    },
    'o1-mini': {
        input: NaN,
        output: NaN,
    },
};
export let payOptions = [];
export let freeTrialData = {};
export let new_user_referral_times = NaN;
export function C_CreditCost() {

    const creditData = [
        {
            key: '0',
            model: 'Interview Duration',
            inputCost: `${2 * credit_transcribe_per_second} credits per second`,
            outputCost: `-`,
            rateLimit: `-`,
            minInputTokens: `-`,
            minOutputTokens: `-`,
        },
        {
            key: '1',
            model: 'Online Assessment Duration',
            inputCost: <span>
                <s style={{ color: 'gray', fontSize: '1em', }}>1.0</s> {' '}
                {credit_OA_per_second} credits per second
                <br />
                <span style={{ color: 'gray', fontSize: '0.8em', fontStyle: 'italic' }}>Hiring season discount until April 1, 2025</span>
            </span>,
            outputCost: `-`,
            rateLimit: `-`,
            minInputTokens: `-`,
            minOutputTokens: `-`,
        },
        {
            key: '2',
            model: 'gpt-4o-mini',
            inputCost: `${modelCreditsCost?.['gpt-4o-mini']?.input * 1000} credits per 1000 tokens.`,
            outputCost: `${modelCreditsCost?.["gpt-4o-mini"]?.output * 1000} credits per 1000 tokens.`,
            rateLimit: `${modelCreditsCost?.["gpt-4o-mini"]?.rateLimit} requests per minute.`,
            minInputTokens: `${modelCreditsCost?.["gpt-4o-mini"]?.minInputTokens} tokens.`,
            minOutputTokens: `${modelCreditsCost?.["gpt-4o-mini"]?.minOutputTokens} tokens.`
        },
        {
            key: '3',
            model: 'gpt-4o',
            inputCost: `${modelCreditsCost?.['gpt-4o']?.input * 1000} credits per 1000 tokens.`,
            outputCost: `${modelCreditsCost?.["gpt-4o"]?.output * 1000} credits per 1000 tokens.`,
            rateLimit: `${modelCreditsCost?.["gpt-4o"]?.rateLimit} requests per minute.`,
            minInputTokens: `${modelCreditsCost?.["gpt-4o"]?.minInputTokens} tokens.`,
            minOutputTokens: `${modelCreditsCost?.["gpt-4o"]?.minOutputTokens} tokens.`
        },
        {
            key: '4',
            model: 'gpt-o1-mini',
            inputCost: `${modelCreditsCost?.['o1-mini']?.input * 1000} credits per 1000 tokens.`,
            outputCost: `${modelCreditsCost?.["o1-mini"]?.output * 1000} credits per 1000 tokens.`,
            rateLimit: `${modelCreditsCost?.["o1-mini"]?.rateLimit} requests per minute.`,
            minInputTokens: `${modelCreditsCost?.["o1-mini"]?.minInputTokens} tokens.`,
            minOutputTokens: `${modelCreditsCost?.["o1-mini"]?.minOutputTokens} tokens.`
        },
        {
            key: '5',
            model: 'gpt-o1',
            inputCost: `${modelCreditsCost?.['o1']?.input * 1000} credits per 1000 tokens.`,
            outputCost: `${modelCreditsCost?.["o1"]?.output * 1000} credits per 1000 tokens.`,
            rateLimit: `${modelCreditsCost?.["o1"]?.rateLimit} requests per minute.`,
            minInputTokens: `${modelCreditsCost?.["o1"]?.minInputTokens} tokens.`,
            minOutputTokens: `${modelCreditsCost?.["o1"]?.minOutputTokens} tokens.`
        },
        {
            key: 'claude-3-5-haiku',
            model: 'claude-3-5-haiku',
            inputCost: `${modelCreditsCost?.['claude-3-5-haiku-latest']?.input * 1000} credits per 1000 tokens.`,
            outputCost: `${modelCreditsCost?.["claude-3-5-haiku-latest"]?.output * 1000} credits per 1000 tokens.`,
            rateLimit: `${modelCreditsCost?.["claude-3-5-haiku-latest"]?.rateLimit} requests per minute.`,
            minInputTokens: `${modelCreditsCost?.["claude-3-5-haiku-latest"]?.minInputTokens} tokens.`,
            minOutputTokens: `${modelCreditsCost?.["claude-3-5-haiku-latest"]?.minOutputTokens} tokens.`
        },
        {
            key: 'claude-3-5-sonnet',
            model: 'claude-3-5-sonnet',
            inputCost: `${modelCreditsCost?.['claude-3-5-sonnet-latest']?.input * 1000} credits per 1000 tokens.`,
            outputCost: `${modelCreditsCost?.["claude-3-5-sonnet-latest"]?.output * 1000} credits per 1000 tokens.`,
            rateLimit: `${modelCreditsCost?.["claude-3-5-sonnet-latest"]?.rateLimit} requests per minute.`,
            minInputTokens: `${modelCreditsCost?.["claude-3-5-sonnet-latest"]?.minInputTokens} tokens.`,
            minOutputTokens: `${modelCreditsCost?.["claude-3-5-sonnet-latest"]?.minOutputTokens} tokens.`
        },
        // {
        //     key: 'deepseek-chat',
        //     model: 'deepseek-chat',
        //     inputCost: `${modelCreditsCost?.['deepseek-chat']?.input * 1000} credits per 1000 tokens.`,
        //     outputCost: `${modelCreditsCost?.["deepseek-chat"]?.output * 1000} credits per 1000 tokens.`,
        //     rateLimit: `${modelCreditsCost?.["deepseek-chat"]?.rateLimit} requests per minute.`,
        //     minInputTokens: `${modelCreditsCost?.["deepseek-chat"]?.minInputTokens} tokens.`,
        //     minOutputTokens: `${modelCreditsCost?.["deepseek-chat"]?.minOutputTokens} tokens.`
        // },
        // {
        //     key: 'deepseek-reasoner',
        //     model: 'deepseek-reasoner',
        //     inputCost: `${modelCreditsCost?.['deepseek-reasoner']?.input * 1000} credits per 1000 tokens.`,
        //     outputCost: `${modelCreditsCost?.["deepseek-reasoner"]?.output * 1000} credits per 1000 tokens.`,
        //     rateLimit: `${modelCreditsCost?.["deepseek-reasoner"]?.rateLimit} requests per minute.`,
        //     minInputTokens: `${modelCreditsCost?.["deepseek-reasoner"]?.minInputTokens} tokens.`,
        //     minOutputTokens: `${modelCreditsCost?.["deepseek-reasoner"]?.minOutputTokens} tokens.`
        // },
        {
            key: '6',
            model: 'Search Question',
            inputCost: <div>
                <div>
                    {credit_per_question_search} + {credit_per_question} credits per 1 question.
                </div>
                <div style={{ color: 'gray', fontSize: '0.8em', fontStyle: 'italic' }}>
                    e.g. searching with 100 questions would cost {credit_per_question_search + credit_per_question * 100}({credit_per_question_search} + {credit_per_question * 100}) credits.
                </div>
            </div>,
            // For example, searching answers with 100 questions would cost ${credit_per_question * 100} credits.`,
            outputCost: `-`,
            rateLimit: `-`,
            minInputTokens: `-`,
            minOutputTokens: `-`,
        },
        {
            key: '7',
            model: 'Screenshot',
            inputCost: `${credit_screenshot} credits per screenshot`,
            outputCost: '-',
            rateLimit: `-`,
            minInputTokens: `-`,
            minOutputTokens: `-`,
        },
        {
            key: '8',
            model: 'Convert question answers to markdown format.',
            inputCost: `${modelCreditsCost?.['convert-markdown']?.input * 1000} credits per 1000 tokens`,
            outputCost: `${modelCreditsCost?.['convert-markdown']?.output * 1000} credits per 1000 tokens`,
            rateLimit: `${modelCreditsCost?.['convert-markdown']?.rateLimit} requests per minute`,
            minInputTokens: `${modelCreditsCost?.['convert-markdown']?.minInputTokens} tokens`,
            minOutputTokens: `${modelCreditsCost?.['convert-markdown']?.minOutputTokens} tokens`
        }
    ];

    const columns = [
        {
            title: 'Model / Feature',
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Input Cost',
            dataIndex: 'inputCost',
            key: 'inputCost',
        },
        {
            title: 'Output Cost',
            dataIndex: 'outputCost',
            key: 'outputCost',
        },
        {
            title: 'Rate Limit',
            dataIndex: 'rateLimit',
            key: 'rateLimit',
        },
        {
            title: 'Minimum Input Tokens',
            dataIndex: 'minInputTokens',
            key: 'minInputTokens',
        },
        {
            title: 'Minimum Output Tokens',
            dataIndex: 'minOutputTokens',
            key: 'minOutputTokens',
        }
    ];

    return (
        <Table
            style={{ marginTop: 50, maxWidth: 1600, margin: 'auto' }}
            dataSource={creditData}
            columns={columns}
            pagination={false}
            bordered
            title={() => <span>
                {/* <span style={{ fontSize: 25, fontWeight: 'bold' }}>
                    Credit Cost Calculation Table
                </span> */}
                <span >
                    We use {' '}
                    {/* <a className="link" href="https://platform.openai.com/tokenizer" target="_blank" rel="noreferrer"> */}
                    OpenAI's GPT-4o token algorithm
                    {/* </a> */}
                    , 100 tokens ~= 75 English words.
                </span>
            </span>}
        />
    );
}
const backendUrl = config.env === 'dev' ? config.dev_backend_url : config.prod_backend_url;


// const backendUrl = "http://localhost:3673"

const firebaseConfig = {
    apiKey: "AIzaSyB571O4WS0HgHX8T_5__A1poDloxNInw7o",
    authDomain: "meeting-master-2c406.firebaseapp.com",
    projectId: "meeting-master-2c406",
    storageBucket: "meeting-master-2c406.firebasestorage.app",
    messagingSenderId: "83449680726",
    appId: "1:83449680726:web:449a1d092ee83fbe597cf7",
    measurementId: "G-Z38QJW5FYM",
};
const PAYMENT_STOP = {
    isStop: false,
    title: `The payment policy is being revised, and the payment channel is tentatively scheduled to open by 12/24.`,
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const v_desc = `
**PLEASE NOTE**: Make sure to use the free trial and test the app thoroughly before making a payment.
- No refunds will be accepted after payment.
- Meeting Master has certain system requirements. If your computer is underpowered, the app may lag. For detailed information, please visit the Download page.
`

const { Title, Text } = Typography;
export const C_FreeTrialPolicy_Popover = () => {
    useEffect(() => {
        f_gaevent({ category: "Free Trial Policy", action: "Click Free Trial Policy" });
    }, [])
    return <Popover
        overlayStyle={{
            maxWidth: "80vw",
            maxHeight: "80vh",
            overflow: "auto",
        }}

        content={<C_FreeTrialPolicy />}
        trigger="click"
    >
        <span className="link"><GiftOutlined /> {' '}Free Trial Policy</span>
    </Popover>
}
export const C_FreeTrialPolicy = () => {
    const {
        v_credits = 0,
        v_maxCredits = 0,
        v_resetPeriod = 0,
        v_OA_Cap = 0,
    } = freeTrialData ?? {};
    return (
        <div style={{ fontFamily: 'Barlow' }} className="lg:px-6 lg:py-4 lg:space-y-6 ">
            <div className="font-bold">Free Trial Policy</div>
            <section className="">
                <Divider orientation="left" orientationMargin={0}>
                    General Rules
                </Divider>
                <ul className="list-disc pl-6 space-y-1">
                    <li>New users will receive {v_maxCredits.toLocaleString()} Trial Credit Stock.</li>
                    <li>After exiting an interview, Trial Credits will be refilled from the Trial Credit Stock after {(v_resetPeriod ?? 0) / 1000} seconds.</li>
                    <li>A maximum of {v_credits.toLocaleString()} Trial Credits can be used per interview. This can be increased by purchasing credits.</li>
                    <li>A maximum of {v_OA_Cap.toLocaleString()} Trial Credits can be used per online assessment.</li>
                    {/* <li><C_AccountSharingPolicy /></li> */}
                </ul>
            </section>
        </div>
    )
}
export const C_CreditGainExample = () => {
    const free_trial = freeTrialData
    const ed = {
        po0: {
            price: payOptions?.[0]?.price / 100,
            credits: payOptions?.[0]?.credits.toLocaleString(),
            ref_credits: payOptions?.[0]?.referral_credits.toLocaleString(),
            ref_elig_credits: payOptions?.[0]?.referrer_eligiblity_credits.toLocaleString(),
            free_trial_cap: payOptions?.[0]?.free_trial_cap.toLocaleString(),
            trial_per_session_cap: payOptions?.[0]?.trial_per_session_cap.toLocaleString(),
            buy_times: 1,
        },
        po3: {
            price: payOptions?.[3]?.price / 100,
            credits: payOptions?.[3]?.credits.toLocaleString(),
            ref_credits: payOptions?.[3]?.referral_credits.toLocaleString(),
            ref_elig_credits: payOptions?.[3]?.referrer_eligiblity_credits.toLocaleString(),
            free_trial_cap: payOptions?.[3]?.free_trial_cap.toLocaleString(),
            trial_per_session_cap: payOptions?.[3]?.trial_per_session_cap.toLocaleString(),
            buy_times: new_user_referral_times,
        },
        get total_trial_per_session_cap() {
            return (free_trial.v_credits + payOptions?.[0]?.trial_per_session_cap * this.po0.buy_times + payOptions?.[3]?.trial_per_session_cap * this.po3.buy_times).toLocaleString();
        },
        get total_trial_per_session_cap_desc() {
            return `(${free_trial.v_credits.toLocaleString()}(default) + ${this.po0.trial_per_session_cap} * ${this.po0.buy_times} + ${this.po3.trial_per_session_cap} * ${this.po3.buy_times})`;
        },
        get total_cost() {
            return ((payOptions?.[0]?.price * this.po0.buy_times + payOptions?.[3]?.price * this.po3.buy_times) / 100).toFixed(2);
        },
        get total_cost_desc() {
            return `(${this.po0.price} * ${this.po0.buy_times} + ${this.po3.price} * ${this.po3.buy_times})`;
        },
        get total_permanent_credits() {
            // return this.po0.credits * this.po0.buy_times + this.po3.credits * this.po3.buy_times;
            return (payOptions?.[0]?.credits * this.po0.buy_times + payOptions?.[3]?.credits * this.po3.buy_times).toLocaleString();;
        },
        get total_permanent_credits_desc() {
            return `(${this.po0.credits} * ${this.po0.buy_times} + ${this.po3.credits} * ${this.po3.buy_times})`;
        },
        get total_ref_credits() {
            // return this.po3.ref_credits * this.po3.buy_times;
            return (payOptions?.[3]?.referral_credits * this.po3.buy_times).toLocaleString();
        },
        get total_ref_credits_desc() {
            return `(${this.po3.ref_credits} * ${this.po3.buy_times})`;
        },
        get total_ref_elig_credits() {
            // return this.po0.ref_elig_credits * this.po0.buy_times + this.po3.ref_elig_credits * this.po3.buy_times;
            return (payOptions?.[0]?.referrer_eligiblity_credits * this.po0.buy_times + payOptions?.[3]?.referrer_eligiblity_credits * this.po3.buy_times).toLocaleString();;
        },
        get total_ref_elig_credits_desc() {
            return `(${this.po0.ref_elig_credits} * ${this.po0.buy_times} + ${this.po3.ref_elig_credits} * ${this.po3.buy_times})`;
        },
        get total_free_trial_cap() {
            return (payOptions?.[0]?.free_trial_cap * this.po0.buy_times + payOptions?.[3]?.free_trial_cap * this.po3.buy_times).toLocaleString();;
        },
        get total_free_trial_cap_desc() {
            return `(${this.po0.free_trial_cap} * ${this.po0.buy_times} + ${this.po3.free_trial_cap} * ${this.po3.buy_times})`;
        },
        get total_available_credits() {
            return (
                payOptions?.[0]?.credits * this.po0.buy_times + payOptions?.[3]?.credits * this.po3.buy_times +
                payOptions?.[3]?.referral_credits * this.po3.buy_times +
                payOptions?.[0]?.referrer_eligiblity_credits * this.po0.buy_times + payOptions?.[3]?.referrer_eligiblity_credits * this.po3.buy_times +
                payOptions?.[0]?.free_trial_cap * this.po0.buy_times + payOptions?.[3]?.free_trial_cap * this.po3.buy_times
            ).toLocaleString();
        },
        get total_available_credits_desc() {
            return `(${this.total_permanent_credits} + ${this.total_ref_credits} + ${this.total_ref_elig_credits} + ${this.total_free_trial_cap})`;
        },
    }
    return <div><section section className="" >
        <Divider orientation="left" orientationMargin={0}>
            Example Scenario <C_FreeTrialPolicy_Popover /> <C_ReferralProgram_Popover />
        </Divider>
        <ul className="list-disc pl-6 space-y-1">
            <li>
                You are a new user. You purchase {ed.po0.credits} credits once {' '}
                and {ed.po3.credits} credits {new_user_referral_times} times. {' '}
            </li>
            <li>
                <strong>Referral credits gained from setting referrers: </strong>
                You can set a maximum of  {new_user_referral_times} referrers each for the {new_user_referral_times} {' '}
                {ed.po3.credits} purchases. As long as the referrers' Referrer {' '}
                Eligibility Credits are sufficient, you will receive a total of {ed.total_ref_credits} referral credits.
            </li>
            <li>
                <strong>Referral credits gained from inviting new users: </strong>
                You can invite unlimited new users to purchase credits and earn referral credits until your Referrer Eligibility Credits reach 0.
                You will gain another {ed.total_ref_elig_credits} Referral Credits in this case.
            </li>
        </ul>
    </section >
        <div style={{ marginTop: 10 }}>
            <div className="font-bold">Summary</div>
            <ul className="list-disc pl-6 space-y-1">
                <li>Total cost = ${ed.total_cost} {ed.total_cost_desc}</li>
                <li>Gained premium credits = {ed.total_permanent_credits} {ed.total_permanent_credits_desc}</li>
                <li>Gained referral credits from setting referrers = {ed.total_ref_credits} {ed.total_ref_credits_desc}</li>
                <li>
                    Gained referral credits from inviting new users = {ed.total_ref_elig_credits} {ed.total_ref_elig_credits_desc}
                </li>
                <li>Gained trial credit stock = {ed.total_free_trial_cap} {ed.total_free_trial_cap_desc}</li>
                <li>
                    <strong>Total usable credits gained</strong> = {ed.total_available_credits} {ed.total_available_credits_desc}
                </li>
                <li>
                    Additionally, You can now use up to {ed.total_trial_per_session_cap} trial credits per interview {ed.total_trial_per_session_cap_desc}.
                </li>
            </ul>
        </div>
    </div>
}
export const C_ReferralProgram_Popover = () => {
    useEffect(() => {
        f_gaevent({ category: "Referral Program", action: "Click Referral Program" });
    }, [])
    return <Popover
        overlayStyle={{
            maxWidth: "min(1200px, 80vw)",
            maxHeight: "80vh",
            overflow: "auto",
        }}
        content={<C_ReferralProgram />}
        trigger="click"
    >
        <span className="link"><ShareAltOutlined /> {' '}Referral Program</span>
    </Popover>
}
export const C_ReferralProgram = () => {
    return (
        <div className="lg:px-6 lg:py-4 lg:space-y-6 " style={{ fontFamily: 'Barlow' }}>
            <h2 className="font-bold">Referral Program</h2>
            <section className="">
                <Divider orientation="left" orientationMargin={0}>
                    General Rules
                </Divider>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Each user can only refer a specific user once. </li>
                    <li>Each user can be referred up to {new_user_referral_times} times.</li>
                    <li>Each user can refer unlimited new users.</li>
                    <li>Each payment can only set one referrer.</li>
                    {/* <li><C_AccountSharingPolicy /></li> */}
                </ul>
            </section>

            <section className="space-y-2">
                <Divider orientation="left" orientationMargin={0}>
                    Referee Eligibility Credits
                </Divider>
                <p>
                    When you purchase credits as a new user, you can set a referrer for that transaction.
                </p>
                <p>
                    If you set a referrer, both you and the referrer will receive referral credits equal to
                    the lesser of the referrer’s Referrer Eligibility Credits
                    and the referral credits associated with the purchase option.
                </p>
                <p>
                    You can set a referrer for a payments up to {new_user_referral_times} times. For each payment, only one referrer can be set.
                </p>
                <p>
                    You don’t have to set a referrer immediately when making a payment.
                    You can select the {new_user_referral_times} largest payments and assign a referrer to those transactions at any time. This option does not expire.
                </p>
                <p>
                    When you set a referrer and the referrer's Referrer Eligibility Credits are insufficient, the app will display a warning and inform you of the actual referral credits you can receive.
                    Once you confirm the operation, it will count as one usage of the referral opportunity, and this action cannot be changed.
                    Even if the referrer's Referrer Eligibility Credits are insufficient to grant you the full referral credits, you cannot change or add another referrer for that payment.
                </p>

            </section>

            <section className="space-y-2">
                <Divider orientation="left" orientationMargin={0}>
                    Referrer Eligibility Credits
                </Divider>
                <p>
                    Each time you purchase credits, you will receive Referrer Eligibility Credits based on the selected purchase option.
                    When a new user purchases credits and sets your email as the referrer, you receive referral credits
                    corresponding to the user's purchase option.
                </p>
                <p>
                    The maximum amount you can receive is the lesser of your current
                    Referrer Eligibility Credits and the referral credits associated
                    with the user's purchase option. There is no limit to the number
                    of times you can act as a referrer. You can continue to invite
                    new users to purchase credits and earn referral credits until
                    your Referrer Eligibility Credits reach 0.
                </p>
                <p>
                    Referrer Eligibility Credits does not expire.
                </p>
            </section>
        </div>
    );
};

export const C_AccountSharingPolicy = () => {
    // return null
    return <div>
        Creating Multiple Accounts and Account Sharing are <strong>strictly prohibited</strong>.
    </div>
    return (
        <Popover
            overlayStyle={{
                maxWidth: "1400px",
                overflowY: "auto",
                border: "1px solid #000",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
            // placement="right"
            trigger="click"
            content={
                <div>
                    <Divider orientation="left" orientationMargin={0}>
                        Unintentional and Malicious Behavior:
                    </Divider>
                    <p>
                        <strong>Unintentional:</strong> If multiple accounts or account sharing
                        are detected before gaining benefits, it is considered unintentional.
                    </p>
                    <div className="ml-4">
                        <div className="">
                            For example:
                        </div>
                        <ol className="list-disc pl-6 space-y-1">
                            <li>
                                Logging into multiple accounts unintentionally. If detected at login,
                                only the free trial credits of the second account will be cleared,
                                and the primary account remains unaffected.
                            </li>
                            <li>
                                Referring your own account unintentionally. The referral will be stopped
                                from proceeding.
                            </li>
                        </ol>
                    </div>
                    <p className="mt-2">
                        <strong>Malicious:</strong> If multiple accounts or account sharing are detected
                        after gaining benefits, it is considered malicious. Depending on the severity,
                        related credits, all types of credits, or the account itself may be suspended.
                    </p>

                    <Divider orientation="left" orientationMargin={0}>
                        How to Avoid Being Flagged for Multiple Accounts or Account Sharing:
                    </Divider>
                    <ol className="list-disc pl-6 space-y-1">
                        <li>Protect your Google account from unauthorized use.</li>
                        <li>Do not use multiple accounts on the same device.</li>
                        <li>Do not use your account on someone else's device.</li>
                        <li>Do not use your account on public devices.</li>
                        <li>Do not use someone else's account on your device.</li>
                        {/* <li>Do not use personal commercial VPNs (examples: ExpressVPN, NordVPN). Non-commercial VPNs (e.g., campus VPNs, corporate VPNs) are acceptable.</li> */}
                        <li>Do not use virtual machines or similar tools (e.g., VMware, Sandbox, Parallels, VirtualBox).</li>
                        <li>Do not intentionally modify device information using third-party tools.</li>
                    </ol>
                </div>
            }
        >
            {/* <div className="link">
                Creating Multiple Accounts and Account Sharing are strictly prohibited.
            </div> */}
        </Popover>

        // <Popover
        //     overlayStyle={{
        //         maxWidth: "1200px",
        //         scrollY: "auto",
        //     }}
        //     trigger="click"
        //     content={<div>
        //         <br />
        //         <Divider orientation="left" orientationMargin={0}>
        //             无意和恶意:
        //         </Divider>
        //         无意: 如果multiple account和account sharing在获取收益之前被提前检测到, 会被视为无意. 只会对额外获取的credit进行扣除. 比如: 1. 无意中登录多个账号, 在登录时检测到, 只会扣除第二个账号的free trial credits. 但不影响主账号使用. 2. 无意中refer自己的账号, refer会被停止proceed, 不会扣除相关积分或referee次数.
        //         恶意: 如果multiple account和account sharing在获取收益之后被检测到, 会被视为恶意. 视严重程度, 会扣除相关积分, 扣除所有类型的积分, 封号.

        //         <Divider orientation="left" orientationMargin={0}>
        //             如何防止被判定为Creating Multiple Accounts and Account Sharing:
        //         </Divider>
        //         0. 保护你的Google账号, 设置双重验证, 防止被盗用.
        //         1. 不要在同一台设备上使用多个账号.
        //         2. 不要在在其他人的设备上使用自己的账号.
        //         3. 不要在公共设备上使用自己的账号.
        //         4. 不要在自己的设备上使用其他人的账号.
        //         5. 不要使用个人商用VPN(个人商用VPN例子: 如ExpressVPN, NordVPN等. 非个人商用VPN例子: 校园VPN, 公司VPN等).
        //         6. 不要用虚拟机或者其他方式来登录账号(vmware, sandbox, parallels, virtualbox等).
        //         7. 不要通过第三方工具故意修改设备信息.
        //     </div>}
        // >
        //     <div className="link">
        //         Creating Multiple Accounts and Account Sharing are strictly prohibited.
        //     </div>
        // </Popover>
    )
}

export default function P_Pricing_V2({
    isDesktop = true,
}) {
    const [isLogining, setIsLogining] = useState(false);
    const [options, setOptions] = useState([]);
    const [paymentData, setPaymentData] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => { // GA4
        ReactGA.send({ hitType: "pageview",  title: 'Page: Pricing'});
    }, [])
    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                // const response = await fetch("http://localhost:3673/pricing");
                const response = await fetch(`${backendUrl}/payment-options`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({}),
                });
                const data = await response.json();
                setOptions(data.payOptions);
                setPaymentData(data);
                new_user_referral_times = data.new_user_referral_times;
                payOptions = data.payOptions;
                freeTrialData = data.free_trial;
                credit_screenshot = data.credit_screenshot;
                credit_transcribe_per_second = data.credit_transcribe_per_second;
                credit_OA_per_second = data.credit_OA_per_second;
                credit_per_question = data.credit_per_question;
                modelCreditsCost = data.modelCreditsCost;
                credit_per_question_search = data.credit_per_question_search;
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    const f_handleAuth = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();

            provider.setCustomParameters({
                prompt: "consent", // 确保每次都提示用户授权
                terms_of_service: "www.meeting-master.pro/terms", // 替换为您的 Terms 链接
                privacy_policy: "www.meeting-master.pro/privacy", // 替换为您的 Privacy Policy 链接
                refund_policy: "www.meeting-master.pro/refund", // 替换为您的 Refund Policy 链接
            });
            const result = await signInWithPopup(auth, provider)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            const idToken = await user.getIdToken();
            setIsLogining(true);
            // await fetch("http://localhost:3673/auth/login", {
            await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idToken }),
            })
            return { idToken };
        } catch (error) {
            console.error(error);
        }
    };

    const f_handleCardClick = async (credits) => {
        f_gaevent({ action: `Click Payment Card ${credits} Credits` });
        const { idToken } = (await f_handleAuth()) || {};
        if (!idToken) return;
        f_gaevent({ action: `Proceed Payment ${credits} Credits` });
        // 创建一个隐藏表单并提交
        const form = document.createElement("form");
        // form.action = "http://localhost:3673/create-checkout-session";
        form.action = `${backendUrl}/create-checkout-session`;
        form.method = "POST";

        // 添加隐藏的 credits 字段
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "credits";
        input.value = credits;
        form.appendChild(input);

        // 添加隐藏的 idToken 字段
        const input1 = document.createElement("input");
        input1.type = "hidden";
        input1.name = "idToken";
        input1.value = idToken;
        form.appendChild(input1);

        document.body.appendChild(form);
        form.submit();
    };

    return (
        isLogining ? <Spin
            size="large"
            style={{ position: "fixed", top: "50%", left: "50%", }}
            title="Wait a second, loading payment page..."
        />
            :
            <Spin
                className="loading-spin"
                size="large"
                // style={{ position: "fixed", top: "50%", left: "50%" }}
                // title="Wait a second, loading payment page..."
                spinning={loading}
            >
                <div style={{}}>
                    <div className="title-container title-bg-1">
                        <h2 className="title">
                            Pay as You Go
                        </h2>
                        <div className="justify-center mb-0 space-x-8" style={{ marginBottom: "0px" }}>
                            <C_FreeTrialPolicy_Popover />
                            <C_ReferralProgram_Popover />
                        </div>
                        <p className="title-desc justify-center">
                            Select your Google account, and proceed with the payment. Then, simply log in to the app using the same Google account, and you're all set.
                        </p>
                    </div>
                    {
                        isDesktop ? <Cards_DeskTop options={options} f_handleCardClick={f_handleCardClick} /> : <Cards_Mobile options={options} f_handleCardClick={f_handleCardClick} />
                    }
                    <div className="mb-8">
                        <C_FAQs faqs={faqs.map((faq, index) => ({ question: faq.Q, answer: faq.A, key: index }))} />
                    </div>
                    <C_CreditCost />
                </div >
            </Spin>
    );
}
function Cards_DeskTop({
    options,
    f_handleCardClick,
}) {
    return (
        <Row
            gutter={[16, 16]} // 设置卡片之间的间距
            justify="center"
            style={{ margin: "50px 0px" }} // 两侧留边距
        >
            {options.map((option, index) => (
                <Col key={option.credits}>
                    <Card className="purchase-card"
                        onClick={() => {
                            if (PAYMENT_STOP.isStop) return message.error(PAYMENT_STOP.title);
                            f_handleCardClick(option.credits)
                        }}
                        hoverable
                        style={{
                            cursor: PAYMENT_STOP.isStop ? "not-allowed" : "pointer",
                        }}
                        styles={{

                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.border = `1px solid ${config.color_primary}`; // 鼠标悬停变蓝
                            e.currentTarget.style.transform = "scale(1.05)"; // 放大效果
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.border = "1px solid #272727"; // 恢复默认边框
                            e.currentTarget.style.transform = "scale(1)"; // 恢复原大小
                        }}
                    >
                        <h1 className="option-header">
                            {option.credits.toLocaleString()}{' '}
                            <span>Premium Credits</span>
                        </h1>

                        <p className="option-price">
                            ${(option.price / 100).toFixed(2)}
                            <span className="original-price">
                                {index === 0 ? '' : `$${(options[0]?.price / 100 * (option.credits / options[0]?.credits)).toFixed(2)}`}
                            </span>
                        </p>

                        <ul className="option-features">
                            <li>{option.credits.toLocaleString()} premium credits</li>
                            <li>Earn up to {option.referrer_eligiblity_credits.toLocaleString()} referral credits from referring new users.</li>
                            <li>New users can earn up to {option.referral_credits.toLocaleString()} referral credits by setting a referrer.</li>
                            <li>{option.free_trial_cap.toLocaleString()} trial credit stock</li>
                            <li>+{option.trial_per_session_cap.toLocaleString()} trial credit limit per interview.</li>
                            <li>Full access to all app features.</li>
                        </ul>

                    </Card>
                </Col>
            ))}
        </Row>
    )
}
function Cards_Mobile({ options, f_handleCardClick }) {
    return (
        <Row
            gutter={[16, 16]} // 卡片间距
            justify="start" // 左对齐
            style={{
                margin: "50px 0px", // 上下边距
                overflowX: "auto", // 启用水平滚动
                whiteSpace: "nowrap", // 防止换行
                display: "flex", // 使用flex布局
                flexWrap: "nowrap", // 禁止换行
                WebkitOverflowScrolling: "touch", // 提高移动端滚动体验
                overflowY: "hidden", // 禁止垂直滚动
                scrollbarWidth: "auto", // 强制显示滚动条（Firefox）
                msOverflowStyle: "auto", // 强制显示滚动条（IE/Edge） 
            }}
        >
            {options.map((option, index) => (
                <Col key={option.credits} >
                    <Card
                        className="purchase-card"
                        onClick={() => {
                            if (PAYMENT_STOP.isStop) return message.error(PAYMENT_STOP.title);
                            f_handleCardClick(option.credits);
                        }}
                        hoverable
                        style={{
                            cursor: PAYMENT_STOP.isStop ? "not-allowed" : "pointer",
                            whiteSpace: "normal",
                        }}
                    >
                        <h1 className="option-header">
                            {option.credits.toLocaleString()} <span>Premium Credits</span>
                        </h1>

                        <p className="option-price">
                            ${(option.price / 100).toFixed(2)}
                            <span className="original-price">
                                {index === 0 ? '' : `$${(options[0]?.price / 100 * (option.credits / options[0]?.credits)).toFixed(2)}`}
                            </span>
                        </p>

                        <ul className="option-features">
                            <li>{option.credits.toLocaleString()} premium credits</li>
                            <li>{option.free_trial_cap.toLocaleString()} trial credit stock</li>
                            <li>Earn up to {option.referrer_eligiblity_credits.toLocaleString()} referral credits from referring new users.</li>
                            <li>New users can earn up to {option.referral_credits.toLocaleString()} referral credits by setting a referrer.</li>
                            <li>+{option.trial_per_session_cap.toLocaleString()} trial credit limit per interview.</li>
                            <li>Full access to all app features.</li>
                        </ul>
                    </Card>
                </Col>
            ))}
        </Row>

    )
}
export function P_Payment_Success() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', marginTop: '50px' }}>
            <Card
                style={{ width: 800, textAlign: 'center', borderRadius: 10, boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
                bordered={false}
            >
                <Title level={1}>Thank You! 🎉</Title>
                {/* <Title level={2}>Dear CEO/CTO/CFO!</Title> */}
                <div style={{ marginTop: '20px' }}>
                    <Text style={{ fontSize: '25px', }}>
                        Please restart the app to apply the changes.
                    </Text>
                </div>
            </Card>
        </div >
    );
}

const benifitsOfCreditPricing = `
            The credit pricing system allows you to use the service with peace of mind, without worrying about any internal logic affecting your request results.
            `

export function f_getGPTCreditCost({
    model,
    inputTokens = 0,
    outputTokens = 0,
}) {
    const input_cost = modelCreditsCost?.[model]?.input || 10 * 1000 / 1000000;
    const output_cost = modelCreditsCost?.[model]?.output || 40 * 1000 / 1000000;
    let credits = (inputTokens * input_cost) + (outputTokens * output_cost);
    return credits;
}

function f_getTokensFromLength(length) {
    return Math.round(length * wordToTokens);
}

const interviewSeconds = 3600
const verbalInterview = {
    resumeWords: 600,
    dialogWords: 500,
    requestNum: 60,
    promptWords: 100,
    responseWords: 200,
    get requestCost() {
        return Math.round(f_getGPTCreditCost({
            model: 'gpt-4o',
            inputTokens: f_getTokensFromLength(this.resumeWords + this.dialogWords + this.responseWords + this.promptWords),
            outputTokens: f_getTokensFromLength(this.responseWords),
        }));
    },
    get credit_transcribe_per_second() { return credit_transcribe_per_second * 2 },
    get transcribe_cost() {
        return Math.round(interviewSeconds * credit_transcribe_per_second * 2)
    },
    get total_credit() {
        return this.requestCost * this.requestNum + this.transcribe_cost;
    },
    get total_cost() {
        return Math.round(this.total_credit / 1000);
    }
}
const searchQuestion = {
    questions: 100,
    requestNum: 30,
    get request_credits() {
        return Math.round(this.questions * credit_per_question + credit_per_question_search);
    },
    get request_cost() {
        return Math.round(this.total_credits / 1000);
    },
    get total_credits() {
        return this.request_credits * this.requestNum;
    },
    get total_cost() {
        return Math.round(this.total_credits / 1000);
    }
}
const screenshots = {
    num: 40,
    get total_credits() {
        return this.num * credit_screenshot;
    },
    get total_cost() {
        return Math.round(this.total_credits / 1000);
    }
}
const whyChargeAlot = {
    lastResponseWords: 500,
    get total_credits() {
        return Math.round(f_getGPTCreditCost({
            model: 'gpt-4o',
            inputTokens: 0,
            outputTokens: f_getTokensFromLength(this.lastResponseWords),
        }));
    }
}
const InterviewCostDetails = () => {
    const examples = [
        {
            title: `1. Using only the common functions of interview assistant apps for a purely verbal interview. `,
            details: [
                `You upload a resume of approximately ${verbalInterview.resumeWords} words, roughly ${f_getTokensFromLength(verbalInterview.resumeWords)} tokens in English.`,
                `Each request includes a roughly ${verbalInterview.dialogWords}-word dialog, roughly ${f_getTokensFromLength(verbalInterview.dialogWords)} tokens in English.`,
                `Each request includes a simple ${verbalInterview.promptWords}-word prompt, roughly ${f_getTokensFromLength(verbalInterview.promptWords)} tokens in English.`,
                `Each response contains an average of ${verbalInterview.responseWords} words, roughly ${f_getTokensFromLength(verbalInterview.responseWords)} tokens in English.`,
                `Using GPT-4o, it costs about ${verbalInterview.requestCost} credits per request. If you make ${verbalInterview.requestNum} requests in an hour, it costs about ${verbalInterview.requestCost * verbalInterview.requestNum} credits.`,
                `Adding ${verbalInterview.credit_transcribe_per_second} credits per second, which costs about ${verbalInterview.transcribe_cost} credits per hour.`,
                <div>
                    <strong>Interview Cost Per Hour:</strong> {verbalInterview.total_credit} credits.
                    {/* , ${verbalInterview.total_cost} if you purchase 200,000 credits at once. */}
                </div>,
            ],
        },
        {
            title: `2. Using only the common functions of interview assistant apps for a Coding Technical Interview`,
            details: [
                `Similar to the above, but you'll take a few screenshots while reducing the number of requests since most time is spent writing code.`,
                <div>
                    <strong>Interview Cost Per Hour:</strong> {verbalInterview.total_credit} credits.
                    {/* , ${verbalInterview.total_cost} if you purchase 200,000 credits at once. */}
                </div>
            ],
        },
        {
            title: `3. Adding Question-Search with ${searchQuestion.questions} Prepared Quesitons.`,
            details: [
                `Each request costs around ${searchQuestion.request_credits} credits.`,
                `If you perform ${searchQuestion.requestNum} searches, the credit consumption would be around ${searchQuestion.total_credits} credits.`,
                // , costing $${searchQuestion.total_cost}.,
                // `Interview Cost Per Hour: ${searchQuestion.total_credits + verbalInterview.total_credit} credits (${verbalInterview.total_credit} + ${searchQuestion.total_credits}), $${searchQuestion.total_cost + verbalInterview.total_cost}.`,
                <div>
                    <strong>Interview Cost Per Hour:</strong> {searchQuestion.total_credits + verbalInterview.total_credit} credits ({verbalInterview.total_credit} + {searchQuestion.total_credits}).
                    {/* , ${searchQuestion.total_cost + verbalInterview.total_cost}. */}
                </div>,
            ],
        },
        {
            title: `4. Frequent Screenshots for Handling Coding Follow-Up Questions`,
            details: [
                `Assume you take ${screenshots.num} screenshots, consuming around ${screenshots.total_credits} credits.`,
                // , costing $${screenshots.total_cost}.,
                // `Interview Cost Per Hour: ${verbalInterview.total_credit + screenshots.total_credits + searchQuestion.total_credits} credits (${verbalInterview.total_credit} + ${screenshots.total_credits} + ${searchQuestion.total_credits}), $${verbalInterview.total_cost + screenshots.total_cost + searchQuestion.total_cost}.`,
                <div>
                    <strong>Interview Cost Per Hour:</strong> {verbalInterview.total_credit + screenshots.total_credits + searchQuestion.total_credits} credits ({verbalInterview.total_credit} + {searchQuestion.total_credits} + {screenshots.total_credits}).
                    {/* , ${verbalInterview.total_cost + screenshots.total_cost + searchQuestion.total_cost}. */}
                </div>,
            ],
        },
    ];

    return (
        <div>
            <div className="list-head">
                This depends on your interview needs and how powerful you want the app to be. We cannot predict it precisely. However, here are some common examples for one-hour interviews:
            </div>
            <List
                itemLayout="vertical"
                dataSource={examples}
                renderItem={(item) => (
                    <List.Item>
                        <div className='list-title'>{item.title}</div>
                        <C_List
                            items={item.details}
                        // dataSource={item.details}
                        // renderItem={(detail) => <List.Item>{detail}</List.Item>}
                        />
                    </List.Item>
                )}
            />
            <div className="list-head">
                We impose no restrictions on your usage. If you have the budget, you can upload a 10,000-word experience along with a powerhouse of 1,000 questions.
                {/* This would be sufficient to ACE 99.9999% of interviews.. */}
            </div>
        </div>
    );
};
const OA_CostDetails = () => {
    const ed = {
        coding: {
            question_num: 4,
            expect_duration: 60, // 分钟
            finish_duration: 30, // 分钟
            request_input_toens: 1000,
            request_output_tokens: 1000,
            screenshot_num: 8,
            get request_cost_4o() {
                return f_getGPTCreditCost({ model: 'gpt-4o', inputTokens: this.request_input_toens, outputTokens: this.request_output_tokens });
            },
            get total_request_cost_4o() {
                return Math.round(this.request_cost_4o * this.question_num);
            },
            get total_screen_cost() {
                return Math.round(credit_screenshot * this.screenshot_num);
            },
            get duration_cost() {
                return Math.round(this.finish_duration * 60 * credit_OA_per_second);
            },
            get total_cost() {
                return Math.round(this.total_request_cost_4o + this.total_screen_cost + this.duration_cost);
            }
        },
        exam: {
            expect_duration: 60, // 分钟
            finish_duration: 40, // 分钟
            get duration_cost() {
                return Math.round(this.finish_duration * 60 * credit_OA_per_second);
            },
            select_num: 30,
            short_num: 10,
            select_num_per_screenshot: 3, // 一张截图包含的选择题数
            select_num_per_request: 3, // 一次请求包含的选择题数
            request_input_tokens_select: 1000,
            request_output_tokens_select: 100,
            get request_cost_4o_select() {
                return f_getGPTCreditCost({ model: 'gpt-4o', inputTokens: this.request_input_tokens_select, outputTokens: this.request_output_tokens_select });
            },
            get total_request_num_select() {
                return Math.round(this.select_num / this.select_num_per_request);
            },
            get total_screenshot_num_select() {
                return Math.round(this.select_num / this.select_num_per_screenshot);
            },
            get total_request_cost_4o_select() {
                return Math.round(this.request_cost_4o_select * this.total_request_num_select);
            },
            get total_screenshot_cost_select() {
                return Math.round(credit_screenshot * this.total_screenshot_num_select);
            },
            get total_cost_select() {
                return Math.round(this.total_request_cost_4o_select + this.total_screenshot_cost_select);
            },

            short_num_per_screenshot: 1,
            short_num_per_request: 1,
            request_input_tokens_short: 1000,
            request_output_tokens_short: 500,
            get request_cost_4o_short() {
                return f_getGPTCreditCost({ model: 'gpt-4o', inputTokens: this.request_input_tokens_short, outputTokens: this.request_output_tokens_short });
            },
            get total_request_cost_4o_short() {
                return Math.round(this.request_cost_4o_short * this.short_num);
            },
            get total_screen_cost_short() {
                return Math.round(credit_screenshot * this.short_num);
            },
            get total_cost_short() {
                return Math.round(this.total_request_cost_4o_short + this.total_screen_cost_short);
            },

            get total_cost() {
                return this.total_cost_select + this.total_cost_short + this.duration_cost;
            }
        }
    }
    const examples = [
        {
            title: `1. Coding OA`,
            details: [
                `Assume we have an coding OA lasting ${ed.coding.expect_duration} minutes with ${ed.coding.question_num} questions,`,
                `Sending ${ed.coding.question_num} requests using the built-in coding request with the GPT-4o model. This would involve approximately ${ed.coding.request_input_toens} input tokens and ${ed.coding.request_output_tokens} output tokens. Each request costs about ${ed.coding.request_cost_4o} credits, totaling ${ed.coding.total_request_cost_4o} credits.`,
                `Assuming the problems are lengthy and require ${ed.coding.screenshot_num} screenshots in total, with each screenshot costing ${credit_screenshot} credits, the total screenshot cost is ${ed.coding.total_screen_cost} credits.`,
                `For an OA expected to last ${ed.coding.expect_duration} minutes, completing it in ${ed.coding.finish_duration} minutes (avoiding finishing too quickly, like under 10 minutes, as it might raise suspicion) incurs a duration cost of ${ed.coding.duration_cost}.`,
                `Overall: ${ed.coding.total_cost} credits.`,
            ],

            // details: [
            // `coding OA应该是最便宜的OA类型. 假设我们有${ed.coding.expect_duration}分钟的OA, 包含${ed.coding.question_num}道题目`,
            // `发送4个request, 使用built-in coding request, 并且用GPT-4o模型的话, 大概input ${ed.coding.request_input_toens} tokens, output ${ed.coding.request_output_tokens} tokens, 每个request大概${ed.coding.request_cost_4o} credits, 总共${ed.coding.total_request_cost_4o} credits`,
            // `我们就假设每道题目都很长, 总共需要${ed.coding.screenshot_num}个screenshots, 每个screenshots ${credit_screenshot} credits, 总共${ed.coding.total_screen_cost} credits`,
            // `${ed.coding.expect_duration}分钟的OA, 只需要${ed.coding.finish_duration}分钟完成(不要完成太快, 比如10分钟不到就写完了, 容易引起怀疑), duration cost=${ed.coding.duration_cost}`,
            // `总共: ${ed.coding.total_cost} credits`,
            // ],
        },
        {
            title: `2. Exam`,
            details: [
                `Assume we have an exam lasting ${ed.exam.expect_duration} minutes, containing ${ed.exam.select_num} multiple-choice questions and ${ed.exam.short_num} short-answer questions. Let's assume you're using the GPT-4o model throughout.`,
                `${ed.exam.select_num} multiple-choice questions:`,
                <C_List
                    items={[
                        `Each screenshot and request can include ${ed.exam.select_num_per_screenshot} multiple-choice questions.`,
                        `A single request generates ${ed.exam.request_input_tokens_select} input tokens and ${ed.exam.request_output_tokens_select} output tokens (configure your custom request to make GPT provide direct answers without unnecessary comments).`,
                        `Each request costs about ${ed.exam.request_cost_4o_select} credits. With a total of ${ed.exam.total_request_num_select} requests, the total cost is ${ed.exam.total_request_cost_4o_select} credits.`,
                        `${ed.exam.total_screenshot_num_select} screenshots in total, costing ${ed.exam.total_screenshot_cost_select} credits.`,
                        `Total cost: ${ed.exam.total_cost_select} credits.`,
                    ]} />,
                `${ed.exam.short_num} short-answer questions:`,
                <C_List
                    items={[
                        `A single request generates ${ed.exam.request_input_tokens_short} input tokens and ${ed.exam.request_output_tokens_short} output tokens.`,
                        `Each request costs about ${ed.exam.request_cost_4o_short} credits. With a total of ${ed.exam.short_num} requests, the total cost is ${ed.exam.total_request_cost_4o_short} credits.`,
                        `${ed.exam.short_num} screenshots in total, costing ${ed.exam.total_screen_cost_short} credits.`,
                        `Total cost: ${ed.exam.total_cost_short} credits.`,
                    ]} />,
                `Duration:`,
                <C_List
                    items={[
                        `An exam expected to last ${ed.exam.expect_duration} minutes can be completed in ${ed.exam.finish_duration} minutes, with a duration cost of ${ed.exam.duration_cost}.`,
                    ]} />,
                `Overall: ${ed.exam.total_cost} credits.`,
            ],

            // details: [
            //     `假设我们有${ed.exam.expect_duration}分钟的OA, 包含${ed.exam.select_num}道选择题和${ed.exam.short_num}道简答题. 假设你全程使用GPT-4o模型`,
            //     `${ed.exam.select_num}道选择题: `,
            //     `每张截图和request可以包含${ed.exam.select_num_per_screenshot}道选择题. `,
            //     `一次request 产生input ${ed.exam.request_input_tokens_select} tokens, output ${ed.exam.request_output_tokens_select} tokens (在你的custom request中让GPT不要废话, 直接告诉你答案). `,
            //     `一次request大概${ed.exam.request_cost_4o_select} credits, 总共${ed.exam.total_request_num_select}次request, 总共${ed.exam.total_request_cost_4o_select} credits`,
            //     `${ed.exam.total_screenshot_num_select}个screenshots, 总共${ed.exam.total_screenshot_cost_select} credits`,
            //     `总共${ed.exam.total_cost_select} credits`,

            //     `${ed.exam.short_num}道简答题: `,
            //     `一次request 产生input ${ed.exam.request_input_tokens_short} tokens, output ${ed.exam.request_output_tokens_short} tokens. `,
            //     `一次request大概${ed.exam.request_cost_4o_short} credits, 总共${ed.exam.short_num}次request, 总共${ed.exam.total_request_cost_4o_short} credits`,
            //     `${ed.exam.short_num}个screenshots, 总共${ed.exam.total_screen_cost_short} credits`,
            //     `总共${ed.exam.total_cost_short} credits`,

            //     `${ed.exam.expect_duration}分钟的OA, 只需要${ed.exam.finish_duration}分钟完成, duration cost=${ed.exam.duration_cost}`,

            //     `总共${ed.exam.total_cost} credits`,
            // ],
        },
    ];

    return (
        <div>
            <div className="list-head">
                The differences between various OA types can be significant, making it difficult to provide accurate estimates. However, here are some common examples:
                <div className="note">
                    The following credit calculation includes the current hiring season OA discount. Credit Cost will increase after the discount period ends. Please refer to the pricing table at the bottom of the page for more details.
                </div>
            </div>
            <List
                itemLayout="vertical"
                dataSource={examples}
                renderItem={(item) => (
                    <List.Item>
                        <div className='list-title'>{item.title}</div>
                        <C_List
                            items={item.details}
                        // dataSource={item.details}
                        // renderItem={(detail) => <List.Item>{detail}</List.Item>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};
const faqs = [
    {
        Q: "How many usable credits can I actually gain after making a payment?",
        A: <C_CreditGainExample />
    },
    {
        Q: "How many credits does an interview cost?",
        A: <InterviewCostDetails />,
    },
    {
        Q: "How many credits does an online assessment cost?",
        A: <OA_CostDetails />,
    },
    // {
    //     Q: `Will you change the credit cost for features?`,
    //     A: <>
    //         <C_List
    //             items={[
    //                 `1. If balancing the credit cost of different features is necessary, we will only do so by reducing the credit cost for certain features.`,
    //                 `2. If a price adjustment is needed, we will only adjust the price of purchasing credits.`,
    //             ]}
    //         />
    //         <strong>In summary {': '}</strong>
    //         the credits you purchase will never, under any circumstances, compared to the time of purchase, result in a reduced number of uses for the features that already existed at the time of purchase.
    //         {/* <br />
    //         <br />
    //         <div ><strong>However, what we will not guarantee includes but not limited to:</strong></div>
    //         <C_List
    //             items={[
    //                 <div><strong>1. Credits relative to monetary value:</strong> We do not guarantee that the value of your credits relative to monetary cost will remain unchanged during promotional discounts or when the cost to purchase credits is reduced.</div>,
    //                 <div><strong>2. Credits and new features:</strong> We do not guarantee that the introduction of new features or functionalities won't lead to higher credit consumption for interviews conducted within the same time frame <strong>if you use the new features</strong>.</div>,
    //             ]}
    //         /> */}
    //     </>
    // },
    {
        Q: `How are input tokens and output tokens calculated for my custom request?`,
        A: <div className="title-desc space-y-2 text-left">
            <C_List
                items={[
                    `Input tokens refer to the number of tokens used in the final request sent to the OpenAI API. This includes:`,
                    <C_List
                        items={[
                            `the prompt written in your custom request.`,
                            `the length of the variable data you used in your custom request (e.g., screenshot recognition results, a dialog with about 500 words being approximately 650 tokens, text entered in the input box, and any uploaded experiences.). If your custom request doesn’t involve some of these variables, their token counts won’t be included in the input tokens.`,
                        ]}
                    />,
                    `The calculation of output tokens varies depending on the model:`,
                    <C_List
                        items={[
                            `gpt-4o, gpt-4o-mini, claude-3-5-sonnet, claude-3-5-haiku:`,
                            <C_List
                                items={[
                                    `visible: Output tokens are equal to tokens converted from the number of words you see on screen using an algorithm.`,
                                    // `interruptible: If you frequently send requests in a short time, triggering another request while the previous one is still outputting, the output of the previous request will be interrupted. Only the tokens actually generated will be counted (depending on your network conditions, the count might be slightly higher than what you see on screen, as some tokens may already be in transmission but not yet displayed).`,
                                ]}
                            />,
                            `gpt-o1, gpt-o1-mini:`,
                            <C_List
                                items={[
                                    `invisible: The number of output tokens will be significantly higher than the words you see on screen. This is because O1 is a reasoning model that produces additional invisible output tokens, which depend on the extent of internal "reasoning," involving multiple unseen model calls, hidden instructions, and internal dialogue.`,
                                    // `non-interruptible: If you frequently send requests in a short time, the system will wait for the o1 model to complete its reasoning and generate a full response. The credit cost will be based on the final token usage generated by OpenAI.`,
                                ]}
                            />,
                        ]}

                    />
                ]}
            />
        </div>,
    },
    {
        Q: "Some of my requests don't require a dialog. How can I exclude the dialog from the input tokens?",
        A: `Disable the 'GPT As Interviewee' option in your Custom Request. This will exclude the dialog from being counted in the input tokens as long as you don't use the dialog as a variable in the request.`
    },
    // {
    //     Q: "Why is it credit-based only? Is there an option for unlimited usage within a fixed period?",
    //     A: C_Paragraphs({
    //         paragraphs:[
    //             `The reason lies in the trade-off between high customizability and "unlimited usage." These two cannot coexist effectively. Once an "unlimited usage" model is adopted, it inevitably requires either explicit or implicit restrictions on your custom requests.`,
    //             `For example, suppose you want to input a highly detailed 100,000-word experience to ensure the AI provides accurate responses without fabricating details about your background. If you trigger 60 requests in one hour, just processing this 100,000-word input would cost us $20 for OpenAI's API, excluding output generation, screenshots, or transcription costs.`,
    //             `If a product claims "unlimited usage" but limits the input for your experience, at least they are honest about their constraints, letting you know upfront that you can’t create the requests you truly need. However, if a product claims "unlimited usage" and offers a highly customizable request, they cannot sustainably provide the service without incurring losses. In such cases, they are likely to resort to one of the following:`,
    //             <C_List
    //                 items={[
    //                     `1. Secretly truncating your input on the backend.`,
    //                     `2. Downgrading all your requests to a cheaper, less capable model like GPT-4o-mini.`,
    //                 ]}
    //             />,
    //             `Both approaches would significantly compromise the accuracy of the returned results, potentially costing you your dream job.`,
    //             `After careful consideration, we determined that a credit-based model is the only approach that allows us to offer highly customizable requests while maintaining transparency. While this more complex pricing model might discourage some users, we prefer honesty over misleading marketing. If your interview is critical enough to require a 100,000-word experience and 1,000 prepared questions, it’s too important for us to cut corners and risk your success by secretly imposing restrictions.`,
    //             `This is why we chose credit-based pricing: it’s the only model that aligns with our commitment to transparency and customization.`
    //         ]
    //     }),
    // },
    // {
    //     Q: "Why was I charged a large amount for a very small request?",
    //     A: <div className="space-y-2">
    //         <div>
    //             There is a delay in deducting credits for returned results, which will be charged during your next request. You can review the details of your credit usage under 'Account' → 'Credit Usage' in the app. For instance, if you used the 4o model in your last request and it returned a result of {whyChargeAlot.lastResponseWords} words, costing {whyChargeAlot.total_credits} credits, the charge will be applied with your next request.
    //         </div>
    //         <div>
    //             Additionally, if you send frequent requests in a short period, the output of previous requests will be interrupted and charged based only on the actual tokens generated (which might be a few tokens higher than what you see). However, if you exit the interview session during the output process, the system will not interrupt the output. Instead, it will complete the entire output and charge credits accordingly.
    //         </div>
    //     </div>
    // },
    {
        Q: "Do credits expire?",
        // A: "No, currently the credits you purchase is permanent and never expire even if our policy changes.",
        A: "No, currently, all types of credits you gain are permanent and never expire. We will not change any existing credits to become expirable in the future. However, we may introduce new types of expirable credits later.",
    },
    // {
    //     Q: "Can I share my account?",
    //     A: <div>
    //         <div className="title-desc" style={{ marginBottom: '5px', fontWeight: '400', fontSize: '22px' }}>
    //             While we do not explicitly prohibit account sharing for current permanent credits,
    //             we cannot be held responsible for any consequences arising from account sharing. This includes, but is not limited to:
    //         </div>
    //         <C_List
    //             items={[
    //                 `1. You are sharing your Google account. If malicious parties gain access to your account, they could potentially exploit sensitive information, such as linked credit cards, leading to significant financial loss.`,
    //                 `2. The person you share your account with may claim to use only a small amount of credits but could end up depleting a substantial portion of your account's credits.`,
    //                 `3. The person you share your account with might misuse it to maliciously attack our servers, resulting in your account being banned.`,
    //                 `4. If you purchase someone else's account, and their account is banned for exploiting vulnerabilities to obtain credits, you may lose access to the account and any associated credits.`,
    //             ]} />
    //         <div className="title-desc" style={{ marginBottom: '5px', fontWeight: '400', fontSize: '22px' }}>
    //             Additionally, we reserve the right to introduce stricter rules in the future to limit account sharing.
    //             For example, we may introduce time-limited credits with big discount in the future which may have restrictions to prevent account sharing, while current permanent credits will remain unaffected.
    //         </div>
    //     </div>
    //     // A: "Currently, yes, feel free to share it with anyone. However, note that we plan to introduce time-limited credits in the future, at which point account sharing for time-limited credits may be restricted (but this won't affect permanent credits. You will still be able to purchase permanent credits and share them with others).",
    // }
]


export function C_Paragraphs({ paragraphs }) {
    return <div className="space-y-2 title-desc">
        {paragraphs.map((paragraph, index) => <div key={index}>{paragraph}</div>)}
    </div>
}