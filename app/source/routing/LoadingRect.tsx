import styled, { keyframes } from 'styled-components';

const slide = keyframes`
    0% {transform:translateX(-100%);}
    100% {transform:translateX(100%);}
`;

type TLoadingRectProps = {
    width?: number;
    height?: number;
};

const LoadingRect = styled.div<TLoadingRectProps>`
    width: ${props => props.width || 150}px;
    height: ${props => props.height || 30}px;
    background-color: rgba(128,128,128,0.2);
    overflow: hidden;
    position: relative;
    margin-bottom: 25px;
    
    &::after {
        content: '';
        transform:translateX(100%);
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        animation: ${slide} 1s infinite;
        opacity: 0.6;
        background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%);
    }
`;


export default LoadingRect;
