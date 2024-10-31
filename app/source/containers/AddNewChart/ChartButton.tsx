import React from 'react';
import styled from 'styled-components';
import TransparentButton from '../../components/Button/TransparentButton';
import { getUrlToChart } from '../../services/adminAppData';
import { pushState } from '../../routing/routing';
import { TChartTypes } from '../../chartTypes';

const Wrapper = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 5px;
`;

const Container = styled(TransparentButton)`
    width: 100%;
    height: 100%;
    border: 1px solid gray;
    border-radius: 3px;
    box-sizing: border-box;
    padding: 5px;
`;

interface IProps {
    type: TChartTypes;
    name: string;
}

const ChartButton = (props: IProps) => {
    return (
        <Wrapper>
            <Container
                onClick={() => {
                    pushState(getUrlToChart('new', props.type));
                }}
            >
                {props.name}
            </Container>
        </Wrapper>
    );
};

export default ChartButton;
