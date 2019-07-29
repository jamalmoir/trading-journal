import { APP_LOAD, ROUTE_CHANGE } from './actionTypes';
import { action } from 'typesafe-actions';

export const appLoad = () => action(APP_LOAD);
export const routeChange = (route: any) => action(ROUTE_CHANGE, route);
