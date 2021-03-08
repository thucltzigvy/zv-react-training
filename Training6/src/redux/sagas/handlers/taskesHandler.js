import {store} from '../../configureStore';
import { put, call } from 'redux-saga/effects';
import { setStatus, removeTask } from '../../slices/taskesSlice';
import { requestSubmitTask } from '../requests/taskesRequest';
import { saga_submitTaskAction } from '../actions/taskesAction';
import taskConst from '../../../constances/task';
import networkConst from '../../../constances/network';
import delay from 'delay'

export function* saga_submitTaskHandler(action) {
  yield put(setStatus({id: action.payload.id, status: taskConst.SUBMITTING}));
  const successed = yield call(requestSubmitTask, action.payload.id);
  if(successed) {
    yield put(setStatus({id: action.payload.id, status: taskConst.SUBMITTED}));
    yield call(delay,700);
    yield put(removeTask({id: action.payload.id}))
  } else {
    yield put(setStatus({id: action.payload.id, status: taskConst.ERROR}))
  }
}

export function* saga_changeStatusTaskHandler(action) {
  const {payload: {id, status}} = action;
  const networkStatus = store.getState().network.status;
  if(networkStatus === networkConst.CONNECTED) {
    if(status === taskConst.READY) {
      //trigger submit
      yield put(saga_submitTaskAction({id, status}));
    }
  } else {
    yield put(setStatus({id, status}));
  }
}

