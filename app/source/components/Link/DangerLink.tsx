import styled from 'styled-components';

/**
 * This component could be used in RowActions of the table.
 * For example, when you want to add danger action, like "Delete".
 */
const DangerLink = styled.a`
    color: #E64A19;
    
    &:hover {
        color: #FF5722
    }
    
    &:focus, &:active {
        color: #BF360C;
    }
`;

export default DangerLink;
