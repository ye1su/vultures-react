/*
 * @Author: sifengyuan
 * @Date: 2022-07-27 09:04:31
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-07-29 16:01:39
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\useDrawshape.ts
 * @Description: update here
 */
import { crossDirection } from './consts';

const collapseSetState = (name: any, value: any, item: any) => {
  const group = item.getContainer();

  const nowRect = group.find((e: any) => e.get('name') === 'main-rect');

  if (name === 'active') {
    if (item.hasState('active')) {
      item.timeFill = nowRect.attrs.fill;
      nowRect.attr({ fill: ' #F0F7FF' });
    } else {
      nowRect.attr({ fill: item.timeFill });
    }
  }

  if (name === 'collapse') {
    const collapseText = group.find((e: any) => e.get('name') === 'collapse-text');

    if (collapseText) {
      if (!value) {
        collapseText.attr({
          text: '-',
        });
      } else {
        collapseText.attr({
          text: '+',
        });
      }
    }
  }
};
const setPoints = (cfg: any, name: string) => {
  const uiShaper = cfg?.uiShaper?.find((i: any) => i.type === name) || {};
  if (crossDirection.includes(uiShaper?.points)) {
    return [
      [0, 0.5],
      [1, 0.5],
    ];
  }
  return [
    [0.5, 0],
    [0.5, 1],
  ];
};

const ctxMenuGroup = (rectConfig: any, group: any) => {
  group.addShape('text', {
    attrs: {
      x: rectConfig.width / 2 - 30,
      y: -8,
      text: '...',
      fontSize: 30,
      fill: '#999',
      cursor: 'pointer',
    },
    name: 'ctx-menu-shape',
  });
};

export { collapseSetState, ctxMenuGroup, setPoints };
