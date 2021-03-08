import { all, call, takeEvery } from 'redux-saga/effects';
import { 
  saga_submitTaskHandler,
  saga_changeStatusTaskHandler,
} from './handlers/taskesHandler';
import {
  saga_submitTaskAction,
  saga_changeStatusTaskAction,
} from './actions/taskesAction';
import {saga_changeStatusNetworkHandler} from './handlers/networkHandler';
import {saga_changeStatusNetworkAction} from './actions/networkAction';

export function* saga_watchSubmitTask() {
  yield takeEvery(saga_submitTaskAction.type, saga_submitTaskHandler);
}

export function* saga_watchChangeStatusTask() {
  yield takeEvery(saga_changeStatusTaskAction.type, saga_changeStatusTaskHandler);
}

export function* saga_watchChangeStatusNetwork() {
  yield takeEvery(saga_changeStatusNetworkAction.type, saga_changeStatusNetworkHandler);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    call(saga_watchSubmitTask),
    call(saga_watchChangeStatusTask),
    call(saga_watchChangeStatusNetwork),
  ])
}