import React from 'react';
import styled from 'styled-components';
import { t } from '../../services/i18n';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import { TChartTypes } from '../../chartTypes';
import ChartButton from './ChartButton';

const Popup = styled(Modal)`
    min-width: 300px;
`;

const ChartButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0 -5px;
`;

interface IProps {}
interface IState {}

class AddNewChart extends React.PureComponent<IProps, IState> {
    state = {
        showSelectChartModal: false,
    };

    private chartButtons = [
        {
            type: TChartTypes.pie,
            name: t('pie'),
        },
        {
            type: TChartTypes.columns,
            name: t('columns'),
        },
        {
            type: TChartTypes.bars,
            name: t('bars'),
        },
        {
            type: TChartTypes.lines,
            name: t('lines'),
        },
    ];

    clickAddChart = (e) => {
        e.preventDefault();
        this.setState({
            showSelectChartModal: true,
        });
    };

    render() {
        return (
            <React.Fragment>
                <a onClick={this.clickAddChart}
                   className='page-title-action'
                >
                    {t('addNew')}
                </a>
                <Popup
                    title='Select chart'
                    show={this.state.showSelectChartModal}
                    buttons={() => (
                        <React.Fragment>
                            <Button
                                onClick={() => this.setState({
                                    showSelectChartModal: false,
                                })}
                            >
                                {t('cancel')}
                            </Button>
                        </React.Fragment>
                    )}
                >
                    <ChartButtonsWrapper>
                        {this.chartButtons.map(item => (
                            <ChartButton
                                name={item.name}
                                type={item.type}
                                key={item.name}
                            />
                        ))}
                    </ChartButtonsWrapper>
                </Popup>
            </React.Fragment>
        );
    }
}

export default AddNewChart;
