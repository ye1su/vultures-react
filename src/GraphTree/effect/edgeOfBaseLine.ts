/*
 * @Author: sifengyuan
 * @Date: 2022-07-29 17:39:06
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-02 10:26:23
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\edgeOfBaseLine.ts
 * @Description: update here
 */
import { registerEdge } from '@antv/g6';
import { crossDirection } from './consts';

export default function shapeOfBaseCtx() {
  const EDGENAME = 'edge-base-line';
  registerEdge(EDGENAME, {
    itemType: 'edge',
    options: {
      style: {
        stroke: '#ccc',
      },
    },
    draw(cfg: any, group: any) {
      const { startPoint } = cfg;
      const { endPoint } = cfg;
      const Xdiff = endPoint.x - startPoint.x;
      const Ydiff = endPoint.y - startPoint.y;
      const model = cfg?.sourceNode.getModel();
      const { uiShaper } = model;
      let path = [];
      if (uiShaper && crossDirection.includes(uiShaper[0].points)) {
        const offset = Xdiff / 3;
        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x + offset, startPoint.y],
          ['L', startPoint.x + offset, endPoint.y],
          ['L', endPoint.x, endPoint.y],
        ];

        if (Math.abs(Ydiff) <= 5) {
          path = [
            ['M', startPoint.x, startPoint.y],
            ['L', endPoint.x, endPoint.y],
          ];
        }
      } else {
        const offset = Ydiff / 3;
        path = [
          ['M', startPoint.x, startPoint.y],
          ['L', startPoint.x, startPoint.y + offset],
          ['L', endPoint.x, endPoint.y - offset * 2],
          ['L', endPoint.x, endPoint.y],
        ];
        if (Math.abs(Xdiff) <= 5) {
          path = [
            ['M', startPoint.x, startPoint.y],
            ['L', endPoint.x, endPoint.y],
          ];
        }
      }
      const moreAttrs: any = {};
      if (model?.type === 'circle') {
        moreAttrs.opacity = 0;
      }
      const line = group.addShape('path', {
        attrs: {
          path,
          stroke: '#999',
          lineWidth: 1.2,
          endArrow: true,
          ...moreAttrs,
        },
        name: 'path-shape',
      });
      return line;
    },
  });
}
