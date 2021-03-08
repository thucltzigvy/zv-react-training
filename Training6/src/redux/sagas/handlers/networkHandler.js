import { store } from "../../configureStore";
import { put } from "redux-saga/effects";
import { selectTaskes, setTaskStatus } from "../../slices/taskesSlice";
import taskConst from "../../../constances/task";

export function* saga_networkConnectedHandler(action) {
  //connected => submit all ready taskes
  const taskes = selectTaskes(store.getState());
  for (let iTask = 0; iTask < taskes.length; iTask++) {
    const task = taskes[iTask];
    if (task.status === taskConst.READY) {
      yield put(
        setTaskStatus({ id: task.id, status: taskConst.SUBMITTING })
      );
    }
  }
}
