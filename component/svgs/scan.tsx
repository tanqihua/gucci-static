import * as React from "react";
const SVGComponent = (props: any) => (
    <svg
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 28.89 27.5"
        {...props}
    >
        <g id="Layer_1-2">
            <polygon points="2.27 8.75 .77 8.75 .77 0 10.37 0 10.37 1.5 2.27 1.5 2.27 8.75" />
            <polygon points="28.12 8.75 26.62 8.75 26.62 1.5 18.52 1.5 18.52 0 28.12 0 28.12 8.75" />
            <polygon points="10.37 27.5 .77 27.5 .77 18.75 2.27 18.75 2.27 26 10.37 26 10.37 27.5" />
            <polygon points="28.12 27.5 18.52 27.5 18.52 26 26.62 26 26.62 18.75 28.12 18.75 28.12 27.5" />
            <rect y={12.44} width={28.89} height={1.5} />
        </g>
    </svg>
);
export default SVGComponent;
