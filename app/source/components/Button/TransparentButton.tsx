import styled from 'styled-components';

/**
 * Button with resetted style.
 * @source https://gist.github.com/MoOx/9137295
 */
const TransparentButton = styled.button`
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    cursor: pointer;

    background: transparent;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize \`line-height\`. Cannot be changed from \`normal\` in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable \`input\` types in iOS */
    -webkit-appearance: none;
`;

export default TransparentButton;
