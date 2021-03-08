import {store} from '../../configureStore';
import { put } from 'redux-saga/effects';
import { setNetworkStatus } from '../../slices/networkSlice';
import { selectTaskes } from '../../slices/taskesSlice';
import { saga_changeStatusTaskAction } from '../actions/taskesAction';
import taskConst from '../../../constances/task';
import networkConst from '../../../constances/network';

export function* saga_changeStatusNetworkHandler(action) {
  yield put(setNetworkStatus({status: action.payload.status}));
  //connected => submit all ready taskes
  if(action.payload.status === networkConst.CONNECTED) {
    const taskes = selectTaskes(store.getState());
    for(let iTask=0; iTask<taskes.length; iTask++) {
      const task = taskes[iTask];
      if(task.status === taskConst.READY) {
        yield put(saga_changeStatusTaskAction({id: task.id, status: taskConst.READY}));
      }
    }
  }
}
