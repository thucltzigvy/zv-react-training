import { all, call, takeEvery } from 'redux-saga/effects';
import taskConst from '../../constances/task';
import networkConst from '../../constances/network';
import {
  saga_submitTaskHandler,
} from './handlers/taskesHandler';
import {
  setTaskStatus,
} from '../slices/taskesSlice';
import {
  saga_networkConnectedHandler
} from './handlers/networkHandler';
import {
  setNetworkStatus
} from '../slices/networkSlice';

export function* saga_watchSubmitTask() {
  yield takeEvery(
    ac => (ac.type === setTaskStatus.type && ac.payload.status === taskConst.SUBMITTING), 
    saga_submitTaskHandler
  );
}

export function* saga_watchNetworkConnected() {
  yield takeEvery(
    ac => (ac.type === setNetworkStatus.type && ac.payload.status === networkConst.CONNECTED), 
    saga_networkConnectedHandler
  );
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    call(saga_watchSubmitTask),
    call(saga_watchNetworkConnected),
  ])
}