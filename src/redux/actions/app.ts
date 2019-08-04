import { action } from 'typesafe-actions';
import { APP_LOAD, ROUTE_CHANGE } from './actionTypes';

export const appLoad = () => action(APP_LOAD);
export const routeChange = (route: any) => action(ROUTE_CHANGE, route);
