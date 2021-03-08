import React, { Component } from 'react';
import {connect} from 'react-redux';
import {setNetworkStatus} from './redux/slices/networkSlice';
import {selectTaskes} from './redux/slices/taskesSlice';
import {saga_changeStatusTaskAction} from './redux/sagas/actions/taskesAction';
import Task from './components/Task';
import AddTask from './components/AddTask';
import taskConst from './constances/task';
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
            this.props.setNetworkStatus(networkConst.CONNECTED);
            clearInterval(webPing);
            //try to summit ready task
            this.props.taskes.forEach(task => {
              if(task.status === taskConst.READY) {
                this.props.changeStatusTask(
                  task.id, 
                  taskConst.READY, 
                  networkConst.CONNECTED, //network auto set to connected
                )
              }
            });
          }).catch(() => this.props.setNetworkStatus(networkConst.DISCONNECTED));
        }, 2000);
      return;
    }

    return this.props.setNetworkStatus(networkConst.DISCONNECTED);
  }

  handleChangeChecked = (id, nextStatus) => {
    this.props.changeStatusTask(id, nextStatus, this.props.networkStatus);
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
    setNetworkStatus: (networkStatus) => {
      dispatch(setNetworkStatus({status: networkStatus}));
    },
    changeStatusTask: (id, nextStatus, networkStatus) => {
      dispatch(saga_changeStatusTaskAction({id, status: nextStatus, networkStatus}));
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
