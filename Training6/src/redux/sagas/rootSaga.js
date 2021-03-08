import { all, call, takeEvery } from 'redux-saga/effects';
import { 
  saga_submitTaskHandler,
  saga_changeStatusTaskHandler,
} from './handlers/taskesHandler';
import {
  saga_submitTaskAction,
  saga_changeStatusTaskAction,
} from './actions/taskesAction';

export function* saga_watchSubmitTask() {
  yield takeEvery(saga_submitTaskAction.type, saga_submitTaskHandler);
}

export function* saga_watchChangeStatusTask() {
  yield takeEvery(saga_changeStatusTaskAction.type, saga_changeStatusTaskHandler);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    call(saga_watchSubmitTask),
    call(saga_watchChangeStatusTask),
  ])
}