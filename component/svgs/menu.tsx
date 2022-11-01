import * as React from "react";
const SVGComponent = (props: any) => (
    <svg
        id="Layer_2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 33.33 29.54"
        {...props}
    >
        <defs>
            <style>{".cls-1{stroke:#000;stroke-miterlimit:10;}"}</style>
        </defs>
        <g id="Layer_1-2">
            <path
                className="cls-1"
                d="M32.21,11.13c-2.06-3.5-8.22-6.56-8.22-6.56v15.28h0c-1.03-.88-2.42-1.43-3.94-1.43-3.19,0-5.77,2.38-5.77,5.31s2.58,5.31,5.77,5.31,5.77-2.38,5.77-5.31c0-.15-.01-.3-.02-.45l.04-.07V8.07c5.5,3.17,4.69,4.18,4.5,4.83-.2,.68-3.39,3.17-1.5,4.22,1.89,1.06,5.44-2.5,3.39-6Z"
            />
            <rect className="cls-1" x={0.5} y={0.5} width={32.33} height={1.5} />
            <rect className="cls-1" x={0.5} y={8.5} width={20.83} height={1.5} />
            <rect className="cls-1" x={0.5} y={16.5} width={14.5} height={1.5} />
            <rect className="cls-1" x={0.5} y={24.5} width={10.67} height={1.5} />
        </g>
    </svg>
);
export default SVGComponent;