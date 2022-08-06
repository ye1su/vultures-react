/*
 * @Author: sifengyuan
 * @Date: 2022-07-29 10:56:31
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-02 19:30:13
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\useEvents.ts
 * @Description: update here
 */

import type { spTreeGraphProps } from '../index';

export function createGraphEvent(graphRef: any, props: spTreeGraphProps) {
  const { tabSwitch, stepShow, getNodeClick } = props;

  graphRef.on('collapse-text:click', (e: any) => {
    handleCollapse(e);
  });
  graphRef.on('collapse-back:click', (e: any) => {
    handleCollapse(e);
  });
  graphRef.on('node:click', (e: any) => {
    if (getNodeClick) {
      getNodeClick(e);
    }
  });

  const handleCollapse = (e: any) => {
    const { target } = e;
    const id = target.get('modelId');
    const item = graphRef.findById(id);

    const nodeModel = item.getModel();
    if (tabSwitch) {
      const findNodes = graphRef.findAll('node', (node: any) => {
        return node.get('model').depth === nodeModel.depth;
      });
      if (nodeModel.collapsed) {
        if (stepShow) {
          const newArr = findNodes.map((node: any) => {
            return node.get('model');
          });
          setField(newArr);
        } else {
          findNodes.forEach((node: any) => {
            node.get('model').collapsed = true;
          });
        }
      }
    }
    nodeModel.collapsed = !nodeModel.collapsed;
    graphRef.layout();
    graphRef.setItemState(item, 'collapse', nodeModel.collapsed);
  };
  const setField = (arr: any) => {
    for (const node of arr) {
      if (!node?.children || node?.children?.length === 0) {
        return null;
      }
      node.collapsed = true;
      setField(node.children);
    }
  };
}
