import styled from 'styled-components';
import Color from 'color';
import * as colors from '../../styles/colors';

const ErrorBubble = styled.div`
    display: inline-block;
    border-radius: 3px;
    padding: 5px 8px;
    background-color: ${Color(colors.danger).fade(0.9).rgb().string()};
    border-left: 1px solid ${colors.danger};
    color: ${colors.danger};
`;

export default ErrorBubble;
