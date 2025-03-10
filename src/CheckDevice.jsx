import { useEffect, useState, startTransition } from 'react';
import App_Moble from './App_Moble';
import App_V2 from './App_V2';


export default function GA4() {

    return <CheckDevice />;
}
export function CheckDevice() {
    const [isMobile, setIsMobile] = useState(window.screen.width < 1024);
    
    
    useEffect(() => {
        const handleResize = () => {
            const newIsMobileDevice = window.screen.width < 1024; // 手机要用screen.width判断
            const newIsDesktopSmallWindow = window.innerWidth < 1024; // 电脑innerWidth很小也用手机版的布局
            // const newIsMobile = newIsMobileDevice || newIsDesktopSmallWindow;
            const newIsMobile = newIsMobileDevice;
            if (newIsMobile === isMobile) return;
            startTransition(() => {
                setIsMobile(newIsMobile);
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    return (
        <div>
            {isMobile ? <App_Moble /> : <App_V2 />}
        </div>
    );
}
