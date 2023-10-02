import type { SVGIconProps } from "./types";

const ArrowDown = (props: SVGIconProps) => {
    return (
        <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7.29289 15.7071C7.68342 16.0976 8.31658 16.0976 8.70711 15.7071L15.0711 9.34315C15.4616 8.95262 15.4616 8.31946 15.0711 7.92893C14.6805 7.53841 14.0474 7.53841 13.6569 7.92893L8 13.5858L2.34315 7.92893C1.95262 7.53841 1.31946 7.53841 0.928933 7.92893C0.538408 8.31946 0.538408 8.95262 0.928933 9.34315L7.29289 15.7071ZM7 6.70242e-08L7 15L9 15L9 -6.70242e-08L7 6.70242e-08Z"
                fill="black"
            />
            <path stroke="currentColor" strokeWidth={2} d="M0 17h15" />
        </svg>
    );
};

export default ArrowDown;
