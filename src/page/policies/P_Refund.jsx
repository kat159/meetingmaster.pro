import { useEffect } from "react";
import ReactGA from "react-ga4";
const htmlContent = `

`;

export default function P_Refund() {
    useEffect(() => {
        ReactGA.send({ hitType: "pageview",  title: 'Page: Refund Policy' });
    }, [])
    return (
        <div style={{ padding: "50px" }}>
            {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
            <h1 style={{ fontSize: "30px" }}
            >Refund Policy</h1>
            <p>Last updated: March 01, 2021</p>
            <br />
            <p>All sales are final and non-refundable.</p>
            <p>For any questions, please contact us at meetlingmaster@gmail.com.</p>
        </div>
    );
}