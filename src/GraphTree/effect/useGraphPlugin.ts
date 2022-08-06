/*
 * @Author: sifengyuan
 * @Date: 2022-07-27 09:46:58
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-03 17:14:46
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\useGraphPlugin.ts
 * @Description: update here
 */
import { Tooltip, Menu } from '@antv/g6';
import type { spTreeGraphProps } from '../index';

export default function useGraphPulgin(props: spTreeGraphProps) {
  const { setCtxMenu, getMenuClick } = props;
  const plugins = [];

  const tooltip = new Tooltip({
    offsetX: 20,
    offsetY: 30,
    itemTypes: ['node'],
    getContent: (e: any) => {
      const outDiv = document.createElement('div');
      const nodeName = e.item.getModel().name;
      outDiv.innerHTML = `${nodeName}`;
      return outDiv;
    },
    shouldBegin: (e: any) => {
      if (e.target.get('name') === 'name-shape' || e.target.get('name') === 'mask-label-shape')
        return true;
      return false;
    },
  });
  plugins.push(tooltip);
  // 右键
  if (setCtxMenu) {
    const contextMenu = new Menu({
      getContent(evt: any): any {
        const items = setCtxMenu(evt);
        const newMenu = items.map((item) => `<li value="${item.value}">${item.name}</li>`);
        let menuList = '<ul>';
        for (const item of newMenu) {
          menuList += item;
        }
        return `${menuList}</ul>`;
      },
      handleMenuClick(target: any, item: any) {
        if (getMenuClick) {
          getMenuClick(target, item);
        }
      },
      shouldBegin: (evt: any) => {
        if (evt.target.cfg.name === 'ctx-menu-shape') {
          return true;
        }
        return false;
      },
      itemTypes: ['node'],
      trigger: 'click',
    });
    plugins.push(contextMenu);
  }

  return {
    plugins,
  };
}
