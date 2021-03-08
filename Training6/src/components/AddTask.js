import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTask} from '../redux/slices/taskesSlice';
import taskConst from '../constances/task';
import {nanoid} from '@reduxjs/toolkit';

function AddTask() {
  const dispatch = useDispatch();

  const [label, setLabel] = useState('');
  const [error, setError] = useState('')

  const onChangeLabel = (event) => {
    setLabel(event.target.value);
    setError('');
  }

  const onSubmitClicked = () => {
    var labelSubmit = label.trim();
    if(labelSubmit.length === 0) {
      setError('Empty is not allowed');
    } else {
      const id=nanoid();
      dispatch(addTask({id, label: labelSubmit, status: taskConst.PENDING}));
      setLabel('');
    }
  }

  return (
    <div style={{display: 'flex', marginTop: 30}}>
      <input type="text" placeholder="What is your task?" onChange={onChangeLabel} value={label}/>
      <input type="submit" value="Add" onClick={onSubmitClicked}/>
      <span style={{color: 'red'}}>{error}</span>
    </div>
  )
}

export default AddTask
