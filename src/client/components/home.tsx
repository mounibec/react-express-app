import * as React from "react";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface HomeProps extends RouteComponentProps<any> {
}

interface HomeState {
}

class Home extends React.Component<HomeProps, HomeState> {
  render() {
    return (
      <div className={'home'}>
        Welcome home !
      </div>
    )
  }
}

export default withRouter(connect(
  null,
  null
)(Home));
