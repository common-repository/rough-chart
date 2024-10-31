declare var __webpack_public_path__;
import React from 'react';
import { getAppData } from '../services/adminAppData';
import RouteProvider from '../routing/QueryRouteProvider';
import Notifications from '../components/Notifications/Notifications';

// I'm setting public path on the fly.
// This way I can be sure that I have the right url to the build folder.
// (because I don't know the site path of the user)
// @docs https://webpack.js.org/guides/public-path/#on-the-fly
__webpack_public_path__ = getAppData().build_folder;

interface IProps {}

interface IState {}

class App extends React.PureComponent<IProps, IState> {
    render() {
        return (
            <>
                <RouteProvider
                    routes={{
                        'chart_id=new&type=*': {
                            component: () => import(
                                /* webpackChunkName: "EditChart" */
                                './EditChart'
                            ),
                            name: 'Edit Chart #1',
                        },
                        'chart_id=*': {
                            component: () => import(
                                /* webpackChunkName: "EditChart" */
                                './EditChart'
                            ),
                            name: 'Edit Chart #2',
                        },
                        '*': {
                            component: () => import(
                                /* webpackChunkName: "ChartsList" */
                                './ChartsList'
                            ),
                            name: 'Charts List',
                        },
                    }}
                />
                <Notifications />
            </>
        );
    }
}


export default App
