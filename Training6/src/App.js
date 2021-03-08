import React, { Component } from 'react';
import {connect} from 'react-redux';
import {saga_changeStatusNetworkAction} from './redux/sagas/actions/networkAction';
import {selectTaskes} from './redux/slices/taskesSlice';
import {saga_changeStatusTaskAction} from './redux/sagas/actions/taskesAction';
import Task from './components/Task';
import AddTask from './components/AddTask';
import networkConst from './constances/network';


class App extends Component {

  componentDidMount() {
    this.handleConnectionChange();
    window.addEventListener('online', this.handleConnectionChange);
    window.addEventListener('offline', this.handleConnectionChange);
  }

  componentWillUnmount() {
    window.removeEventListener('online', this.handleConnectionChange);
    window.removeEventListener('offline', this.handleConnectionChange);
  }

  handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(
        () => {
          fetch('//google.com', {
            mode: 'no-cors',
            })
          .then(() => {
            this.props.changeStatusNetwork(networkConst.CONNECTED);
            clearInterval(webPing);
          }).catch(() => this.props.changeStatusNetwork(networkConst.DISCONNECTED));
        }, 2000);
      return;
    }

    return this.props.changeStatusNetwork(networkConst.DISCONNECTED);
  }

  handleChangeChecked = (id, nextStatus) => {
    this.props.changeStatusTask(id, nextStatus);
  }

  render() {
    return (
      <div>
        <div>
          {this.props.taskes.map(task => <Task
            id={task.id}
            key={task.id}
            label={task.label}
            status={task.status} 
            onChangeChecked={this.handleChangeChecked}
            networkStatus={this.props.networkStatus}
          />)}
        </div>
        <AddTask/>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeStatusNetwork: (networkStatus) => {
      dispatch(saga_changeStatusNetworkAction({status: networkStatus}));
    },
    changeStatusTask: (id, nextStatus) => {
      dispatch(saga_changeStatusTaskAction({id, status: nextStatus}));
    }
  }
}

const mapStateToProps = state => {
  const { network } = state;
  const taskes = selectTaskes(state);
  return { 
    networkStatus: network.status,
    taskes,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
