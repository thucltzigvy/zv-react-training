import {createAction} from '@reduxjs/toolkit';

export const saga_submitTaskAction = createAction('TASK_REQUEST_SUBMIT');
export const saga_changeStatusTaskAction = createAction('TASK_REQUEST_CHANGE_STATUS');