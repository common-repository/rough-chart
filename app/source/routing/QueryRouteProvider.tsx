import React from 'react';
import { getQuery, onPushState } from './routing';
import findUnion from './findUnion';
import LoadingRoute from './LoadingRoute';

type TRoute = {
    component: () => any;
    name?: string;
};

interface IProps {
    routes: {
        [key: string]: TRoute;
    };
}
interface IState {
    Component: any;
    loading: boolean;
}

/**
 * QueryRoutComponent displaying components based on the query params.
 */
class QueryRouteProvider extends React.PureComponent<IProps, IState> {
    private onPushStateUnbind;

    constructor(props) {
        super(props);

        this.state = {
            Component: null,
            loading: false,
        };
    }

    componentDidMount(): void {
        this.onPushStateUnbind = onPushState((data) => {
            const urlSearchRegex = /(\?\S+)$/gm;
            const match = urlSearchRegex.exec(data.url);
            if (match) {
                this.handleQueryChange(match[1]);
            }
        });

        window.addEventListener('popstate', this.onPopState);
        this.onPopState();
    }

    componentWillUnmount(): void {
        this.onPushStateUnbind();
        window.removeEventListener('popstate', this.onPopState);
    }

    onPopState = () => {
        this.handleQueryChange(location.search);
    };

    handleQueryChange(search: string) {
        const union = findUnion(search, this.props.routes);
        if (union) {
            const componentProp = union.component();
            if (componentProp instanceof Promise) {
                this.setState({ loading: true });
                componentProp.then((result) => {
                    this.setState(({
                        Component: result.default,
                        loading: false,
                    }))
                });
            } else {
                this.setState(({
                    Component: componentProp,
                }))
            }
        }
    }

    render() {
        const { Component } = this.state;
        if (this.state.loading) {
            return (
                <LoadingRoute />
            );
        }
        if (Component) {
            return <Component query={getQuery()} />
        }
        return null;
    }
}

export default QueryRouteProvider;
