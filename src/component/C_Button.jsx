import { Button } from "antd";
import ReactGA from "react-ga4";
ReactGA.initialize("GTM-5RMJJL6X");

export function C_Button_Ant({ ...params }) {
    return (
        <Button
            {...params}
        />
    )
}
export function C_Button_Normal({ gaEvent, ...params }) {
    return (
        <button
            {...params}
            onClick={(...args) => {
                if (params.onClick) {
                    params.onClick(...args)
                    if (gaEvent) {
                        ReactGA.event(gaEvent);
                    }
                }
            }}
        />
    )
}