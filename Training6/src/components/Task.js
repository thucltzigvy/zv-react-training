import React from 'react';
import taskConstances from '../constances/task';
import networkConst from '../constances/network';


const getStatusContent = (currentStatus, networkStatus) => {
  if(currentStatus === taskConstances.READY && networkStatus === networkConst.DISCONNECTED) {
    return 'Ready. Waiting network for submitting...';
  }
  if(currentStatus === taskConstances.PENDING) {
    return 'Pending';
  }
  if(currentStatus === taskConstances.READY) {
    return 'Ready';
  }
  if(currentStatus === taskConstances.SUBMITTING) {
    return 'Submitting...';
  }
  if(currentStatus === taskConstances.SUBMITTED) {
    return 'Submitted!';
  }
  if(currentStatus === taskConstances.ERROR) {
    return 'Error occurred';
  }
}

function Task(props) {
  const {id, label, status, onChangeChecked, networkStatus} = props;
  const handleChangeChecked = (event) => {
    onChangeChecked(id, status === taskConstances.READY ? taskConstances.PENDING : taskConstances.READY);
  }
  return (
    <div style={{display: 'flex'}}>
      {label}
      <input 
        label="Ready?" 
        type="checkbox" 
        checked={
          status === taskConstances.READY ||
          status === taskConstances.SUBMITTING ||
          status === taskConstances.SUBMITTED
        }
        disabled={
          (status === taskConstances.SUBMITTING) ||
          (status === taskConstances.SUBMITTED)
        }
        onChange={handleChangeChecked}
      />
      <span style={{color: status === taskConstances.ERROR ? 'red' : 'black'}}>
        {getStatusContent(status, networkStatus)}
      </span>
    </div>
  )
}

export default Task
