import {store} from '../../configureStore';
import { put, call } from 'redux-saga/effects';
import { setTaskStatus, removeTask } from '../../slices/taskesSlice';
import { requestSubmitTask } from '../requests/taskesRequest';
import taskConst from '../../../constances/task';
import networkConst from '../../../constances/network';
import delay from 'delay'

export function* saga_submitTaskHandler(action) {
  const {payload: {id}} = action;
  const networkStatus = store.getState().network.status;
  if(networkStatus === networkConst.CONNECTED) {
    const successed = yield call(requestSubmitTask, id);
    if(successed) {
      yield put(setTaskStatus({id, status: taskConst.SUBMITTED}));
      yield call(delay,700);
      yield put(removeTask({id}))
    } else {
      yield put(setTaskStatus({id, status: taskConst.ERROR}))
    }
  } else {
    yield put(setTaskStatus({id, status: taskConst.READY}));
  }
}

