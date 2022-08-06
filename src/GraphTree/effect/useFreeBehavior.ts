/*
 * @Author: sifengyuan
 * @Date: 2022-07-27 18:56:31
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-07-28 16:58:53
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\useFreeBehavior.ts
 * @Description: update here
 */
import { registerBehavior } from '@antv/g6';

export default function useFreeBehavior() {
  registerBehavior('activate-node', {
    getEvents() {
      return {
        'node:click': 'onNodeClick',
        'canvas:click': 'onCanvasClick',
      };
    },
    onNodeClick(e: any) {
      const _this = this as any;
      _this.removeNodesState();
      const graph = this.graph as any;
      const { item } = e;
      if (item.hasState('active')) {
        graph.setItemState(item, 'active', false);
        return;
      }
      graph.setItemState(item, 'active', true);
    },
    onCanvasClick(e: any) {
      const _this = this as any;
      if (_this.shouldUpdate(e)) {
        _this.removeNodesState();
      }
    },
    removeNodesState() {
      const graph = this.graph as any;
      graph.findAllByState('node', 'active').forEach((node: any) => {
        graph.setItemState(node, 'active', false);
      });
    },
  });
}
