import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function C_Markdown({
    children,
    fontSize = "17px",
    fontSize_h1 = "28px",
    fontSize_h2 = "25px",
    fontSize_h3 = "22px",
    fontSize_h4 = "19px",
    fontFamily = "Barlow"
}) {
    return (
        <div
            style={{
                lineHeight: "1.6", // 增加行高
                fontSize: "16px", // 可选：统一设置字体大小
                fontFamily,
            }}
        >
            <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]} // 支持 HTML 解析

                components={{
                    p: ({ node, ...props }) => (
                        <p
                            style={{
                                fontSize, // 普通段落字体大小
                                lineHeight: "1.6", // 增加行高
                                margin: "10px 0", // 段落间距
                            }}
                            {...props}
                        />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul
                            style={{
                                fontSize, // 列表字体大小
                                paddingLeft: "20px", // 列表左边距
                                margin: "0px 0", // 列表间距
                                lineHeight: "1.6", // 增加行高
                            }}
                            {...props}
                        />
                    ),
                    li: ({ node, ...props }) => (
                        <li
                            style={{
                                fontSize, // 列表项字体大小
                                marginBottom: "0px", // 列表项间距
                            }}
                            {...props}
                        />
                    ),
                    h1: ({ node, ...props }) => (
                        <h1
                            style={{
                                fontSize: fontSize_h1, // h1 字体大小
                                fontWeight: "bold", // 加粗标题
                                margin: "12px 0", // 标题间距
                            }}
                            {...props}
                        />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2
                            style={{
                                fontSize: fontSize_h2, // h2 字体大小
                                fontWeight: "bold",
                                margin: "9px 0",
                            }}
                            {...props}
                        />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3
                            style={{
                                fontSize: fontSize_h3, // h3 字体大小
                                fontWeight: "bold",
                                margin: "7px 0",
                            }}
                            {...props}
                        />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4
                            style={{
                                fontSize: fontSize_h4, // h4 字体大小
                                fontWeight: "bold",
                                margin: "5px 0",
                            }}
                            {...props}
                        />
                    ),
                }}
            >
                {children}
            </Markdown>
        </div>
    );
}
