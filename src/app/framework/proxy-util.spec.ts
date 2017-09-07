import { Food } from '../food';
import { proxify } from './proxy-util';

describe('Proxy Util', () => {

  describe('Proxify', () => {

    it('should create food proxy', () => {
      const food = new Food('Bacon', 1);
      const proxy = proxify<Food>(food);
      proxy.desc = 'Lettuce';
    });
  });
});
