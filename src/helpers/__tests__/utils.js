/**
 * @format
 */
import { createRoutes } from '../utils';

describe('utils', () => {
  // toBe: address or shallow compare
  // toEqual: value and deep compare

  test('createRoutes', () => {
    expect(createRoutes({ screen1: 'screen1', screen2: 'screen2' })).toEqual({
      screen1: {
        screen: 'screen1',
      },
      screen2: {
        screen: 'screen2',
      },
    });
  });
});
