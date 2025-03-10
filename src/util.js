import ReactGA from "react-ga4";
const clickCounts = {}
export function f_gaevent({
    category,
    label,
    action,
    recordFirst=true,
}) {
    if (!clickCounts[action]) {
        ReactGA.event({
            category: category,
            action: `1st ${action}`,
            label: label,
            value: 1
        });
        clickCounts[action] = 1;
    } else {
        clickCounts[action]++;
        ReactGA.event({
            category: category,
            action: `${action}`,
            label: label,
            value: clickCounts[action]
        });
    }
}