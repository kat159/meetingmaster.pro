import React from 'react';
import { Button, Result } from 'antd';
import { Helmet } from "react-helmet";

export default function P_404() {
    return (
        <div>
            <Helmet>
                <title>404 - Page Not Found</title>
                <meta name="robots" content="noindex, nofollow" />
            </Helmet>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => window.location.href = "/" }>Back Home</Button>}
            />
        </div>
    );
}
