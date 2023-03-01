import React from "react";
import Svg from "../assets/loader.svg";
export interface ISvgProps extends React.SVGProps<SVGSVGElement> {
  xmlns?: string;
  xmlnsXlink?: string;
  xmlSpace?: string;
}

const Loader= () => {
 return (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.0"
  width="64px"
  height="64px"
  viewBox="0 0 128 128"
>
  <rect x="0" y="0" width="100%" height="100%" fill="currentColor" fill-opacity="0"/>
  <g>
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#5b61fd"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#d9d9ec"
      transform="rotate(45 64 64)"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#ececff"
      transform="rotate(90 64 64)"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#ececff"
      transform="rotate(135 64 64)"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#d5d7fe"
      transform="rotate(180 64 64)"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#bcbffe"
      transform="rotate(225 64 64)"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#a2a5fe"
      transform="rotate(270 64 64)"
    />
    <path
      d="M71 39.2V.4a63.6 63.6 0 0 1 33.96 14.57L77.68 42.24a25.53 25.53 0 0 0-6.7-3.03z"
      fill="#8286fd"
      transform="rotate(315 64 64)"
    />
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="0 64 64;45 64 64;90 64 64;135 64 64;180 64 64;225 64 64;270 64 64;315 64 64"
      calcMode="discrete"
      dur="720ms"
      repeatCount="indefinite"
    ></animateTransform>
  </g>
  <g>
    <circle fill="#5b61fd" cx="63.66" cy="63.16" r="12" />
    <animate
      attributeName="opacity"
      dur="720ms"
      begin="0s"
      repeatCount="indefinite"
      keyTimes="0;0.5;1"
      values="1;0;1"
    />
  </g>
</svg>
 )
};

export default Loader;
