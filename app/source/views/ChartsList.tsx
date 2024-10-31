import React from 'react';
import styled from 'styled-components';
import { t } from '../services/i18n';
import { getAllChart, deleteChart } from '../services/ajax';
import Donate from '../containers/Donate/Donate';
import { TChartDB } from '../chartTypes';
import ChartsListItem from '../containers/ChartsListItem/ChartsListItem';
import AddNewChart from '../containers/AddNewChart/AddNewChart';
import Loading from '../components/Loading/Loading';
import Title from '../components/Title/Title';
import Table from '../components/Table/Table';
import Thead from '../components/Table/Thead';
import Tbody from '../components/Table/Tbody';
import Tr from '../components/Table/Tr';
import Th from '../components/Table/Th';
import Td from '../components/Table/Td';
import Modal from '../components/Modal/Modal';
import Button, { BtnAppearance } from '../components/Button/Button';
import { sendNotification } from '../components/Notifications/Notifications';
import jqXHR = JQuery.jqXHR;

const ThType = styled(Th)`
    width: 80px;
`;

interface IProps {}

interface IState {
    // Here `loading` state is specific since entangled with functionality of displaying charts.
    // (and can't be used for displaying loading state of deleting chart)
    loadingChartsList: boolean;
    chartIdToDelete: number;
    charts: TChartDB[];
}

class ChartsList extends React.PureComponent<IProps, IState> {
    public state = {
        loadingChartsList: true,
        chartIdToDelete: -1,
        charts: [],
    };

    private requestRef: jqXHR;

    componentDidMount(): void {
        this.requestRef = getAllChart()
            .done((charts) => {
                this.setState({
                    charts,
                    loadingChartsList: false,
                });
            })
            .fail(() => {
                this.setState({ loadingChartsList: false });
            });
    }

    componentWillUnmount(): void {
        this.requestRef && this.requestRef.abort();
    }

    handelDelete = () => {
        this.requestRef = deleteChart(this.state.chartIdToDelete)
            .done(() => {
                sendNotification(t('chartDeleted'));
                this.setState(prevState => ({
                    charts: this.state.charts.filter((chart: TChartDB) => {
                        return chart.id !== prevState.chartIdToDelete;
                    }),
                    chartIdToDelete: -1,
                }));
            })
            .fail(() => {
                this.setState({ chartIdToDelete: -1 });
            });
    };

    showDeleteWarning = (chartId: number): void => {
        this.setState({
            chartIdToDelete: chartId,
        });
    };

    renderCharts() {
        if (this.state.charts.length > 0) {
            return this.state.charts.map((chart: TChartDB) => (
                <ChartsListItem
                    chart={chart}
                    onDelete={this.showDeleteWarning}
                    key={`chart-table-${chart.id}`}
                />
            ));
        }
        const content = (() => {
            if (this.state.loadingChartsList) {
                return (
                    <Loading show={this.state.loadingChartsList} />
                );
            }
            return t('noCharts');
        })();
        return (
            <Tr>
                <Td colSpan={4}>
                    {content}
                </Td>
            </Tr>
        );
    }

    render() {
        return (
            <React.Fragment>
                <Donate />
                <Title inline>
                    {t('roughCharts')}
                </Title>
                <AddNewChart />
                <hr className='wp-header-end' />
                <h2 className='screen-reader-text'>
                    {t('roughChartsList')}
                </h2>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>{t('title')}</Th>
                            <ThType>{t('type')}</ThType>
                            <Th>{t('created')}</Th>
                            <Th>{t('lastUpdated')}</Th>
                            <Th>{t('shortcode')}</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {this.renderCharts()}
                    </Tbody>
                </Table>
                <Modal
                    title={t('deletingChart')}
                    show={this.state.chartIdToDelete > -1}
                    buttons={() => (
                        <React.Fragment>
                            <Button
                                appearance={BtnAppearance.Primary}
                                onClick={this.handelDelete}
                            >
                                {t('yesDelete')}
                            </Button>
                            {' '}
                            <Button
                                onClick={() => this.setState({
                                    chartIdToDelete: -1,
                                })}
                            >
                                {t('cancel')}
                            </Button>
                        </React.Fragment>
                    )}
                >
                    {t('areYouSureDelete')}
                </Modal>
            </React.Fragment>
        );
    }
}


export default ChartsList
