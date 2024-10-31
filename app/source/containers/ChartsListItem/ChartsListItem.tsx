import React from 'react';
import styled from 'styled-components';
import Th from '../../components/Table/Th';
import Td from '../../components/Table/Td';
import Tr from '../../components/Table/Tr';
import RowActions from '../../components/Table/RowActions';
import DangerLink from '../../components/Link/DangerLink';
import { sendNotification } from '../../components/Notifications/Notifications';
import Shortcode, { getShortcode } from '../Shortcode/Shortcode';
import { TChartDB, TChartTypes } from '../../chartTypes';
import { t } from '../../services/i18n';
import copyToClipboard from '../../services/copyToClipboard';
import { getUrlToChart } from '../../services/adminAppData';
import { pushState } from '../../routing/routing';

const TdShortcode = styled(Td)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

interface IProps {
    chart: TChartDB;
    onDelete: (chartId: number) => void;
}

interface IState {}

class ChartsListItem extends React.PureComponent<IProps, IState> {
    getEditLink() {
        const { chart } = this.props;
        return getUrlToChart(
            String(chart.id),
            TChartTypes[chart.chart_type],
        );
    }

    handleLinkClick = (e: any): void => {
        e.preventDefault();
        pushState(e.target.getAttribute('href'));
    };

    handleDelete = (e: any): void => {
        e.preventDefault();
        const { chart, onDelete } = this.props;
        onDelete(chart.id)
    };

    handleCopy = (e: any): void => {
        e.preventDefault();
        const { chart } = this.props;
        const copyResult = copyToClipboard(getShortcode(chart.id));
        if (!!copyResult) {
            sendNotification(t('shortcodeCopied'));
        }
    };

    renderTitle() {
        const {chart} = this.props;
        if (!chart.title || chart.title === '') {
            return (
                <i>
                    <a href={this.getEditLink()} onClick={this.handleLinkClick}>
                        {t('noTitle')}
                    </a>
                </i>
            );
        }
        return (
            <strong>
                <a href={this.getEditLink()} onClick={this.handleLinkClick}>
                    {chart.title}
                </a>
            </strong>
        );
    }

    render() {
        const { chart } = this.props;
        return (
            <Tr>
                <Th hasRowActions>
                    {this.renderTitle()}
                    <RowActions>
                        <a href={this.getEditLink()} onClick={this.handleLinkClick}>
                            {t('edit')}
                        </a> |{' '}
                        <DangerLink
                            href='#'
                            onClick={this.handleDelete}
                        >
                            {t('delete')}
                        </DangerLink>
                    </RowActions>
                </Th>
                <Td>{chart.chart_type}</Td>
                <Td>{chart.created}</Td>
                <Td>{chart.last_updated}</Td>
                <TdShortcode hasRowActions>
                    <Shortcode chartId={chart.id} />
                    <RowActions>
                        <a href='#'
                           onClick={this.handleCopy}
                        >
                            {t('copy')}
                        </a>
                    </RowActions>
                </TdShortcode>
            </Tr>
        );
    }
}

export default ChartsListItem;
