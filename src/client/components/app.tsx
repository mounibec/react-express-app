import * as React from "react";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from "react-router";

import * as actions from '../actions/app';

interface AppProps extends RouteComponentProps<any> {
  connect: () => void
}

interface AppState {
}

class App extends React.Component<AppProps, AppState> {

  componentDidMount() {
    const {connect} = this.props;
    connect();
  }

  render() {
    const {children} = this.props;

    return (
      <div className={`app`}>
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state: { app: any }) => ({...state.app});

export default withRouter<RouteComponentProps<any>>(
  connect(mapStateToProps, actions)(App)
);
