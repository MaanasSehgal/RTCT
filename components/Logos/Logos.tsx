import React from "react";

export const RTCTLogo = ({size}: any) => (
    <svg fill="none" height={size | 30} viewBox="0 0 32 32" width={size | 30}>
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

export const SearchIcon = ({size = 24, strokeWidth = 1.5, width = 30, height = 30, ...props}) => (
    <svg aria-hidden="true" fill="none" focusable="false" height={height || size} role="presentation" viewBox="0 0 24 24" width={width || size} {...props}>
        <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={strokeWidth}
        />
        <path d="M22 22L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} />
    </svg>
);
