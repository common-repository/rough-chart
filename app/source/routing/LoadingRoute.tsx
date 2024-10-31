import React from 'react';
import LoadingRect from './LoadingRect';

interface IState {}
interface IProps {}

class LoadingRoute extends React.PureComponent<IState, IProps> {
    renderTitle() {
        return (
            <div style={{ margin: '23px 0 30px 0' }}>
                <LoadingRect width={300} />
            </div>
        );
    }

    renderContent() {
        return (
            <>
                <LoadingRect width={100} height={15} />
                <LoadingRect width={100} height={15} />
                <LoadingRect width={100} height={15} />
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderTitle()}
                {this.renderContent()}
            </>
        );
    }
}

export default LoadingRoute;
