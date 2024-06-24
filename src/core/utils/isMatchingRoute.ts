import { matchPath } from 'react-router-dom';

export const isMatchingRoute = (pattern: string, pathname: string) => {
  return matchPath(pattern, pathname) !== null;
};