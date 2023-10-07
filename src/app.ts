// noinspection RedundantIfStatementJS

import {test} from './test.js';

window.addEventListener('DOMContentLoaded', () => {
  //

  test('Simple value. Unchangeable', 'string value');

  //

  test('Object', {a: 5, b: {}, c: 'ci'}, cloned => {
    cloned.c = 'MODIFIED';
  });

  //

  test('Array', [5, [], 'ci'], cloned => {
    cloned[2] = 'MODIFIED';
  });

  //

  let ref: any;

  const complex: any = [{}, 4, [[[{}, 'value', {val: 'fn val', fn: function () {
    console.log('Watch this', this);
  }}], {v: {a: {l: [45, [], '12']}}}, 33,], {}]];
  test('Complex object', complex, cloned => {
    cloned[0]['NEW KEY'] = 'MODIFIED';
    cloned[2][0][1].v.a.l[0] = 'MODIFIED';
    cloned[2][0][1].v.a.l[1].push('MODIFIED');
    cloned[2][0][0][2].val = 'MODIFIED';

    ref = cloned[2][0][0][2];
  });

  complex[2][0][0][2].fn();
  ref.fn();

  //
});