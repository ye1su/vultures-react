/*
 * @Author: sifengyuan
 * @Date: 2022-07-26 16:17:23
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-07-29 16:01:22
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\shapeOfBaseCtx.ts
 * @Description: update here
 */

/*
  定义ips-bom-head-rect的节点
  {
    "id": "282846721065746997",
    "name": "L4.新产品开发",
    "statusLabel": "器身 70%"
    "status": "U", 
    "type": "shape-base-ctx",
    "collapse": false,
    "children": [], 
    "uiShaper"：{}
  }
  
*/

import { registerNode } from '@antv/g6';
import { collapseSetState, setPoints } from './useDrawShape';
import type { shapeTypes } from '../tree.type';
import { crossDirection } from './consts';

export default function shapeOfBaseCtx() {
  const SHAPENAME = 'shape-base-ctx';

  registerNode(
    SHAPENAME,
    {
      shapeType: SHAPENAME,
      draw(cfg: any, group: any) {
        const { name = '', collapsed, status, statusLabel } = cfg;
        const uiShaper = cfg?.uiShaper?.find((i: any) => i.type === SHAPENAME) || {};
        let shepeDefaultConfig: shapeTypes = {
          bgStorkeColor: '#E6E6E6',
          bgFillColor: '#fff',
          txtNameColor: '#333333',
          corlorGroup: {
            U: '#23B066',
            D: '#F98E1B',
          },
        };
        if (uiShaper) {
          shepeDefaultConfig = { ...shepeDefaultConfig, ...uiShaper };
        }
        const { bgStorkeColor, bgFillColor, txtNameColor, corlorGroup } = shepeDefaultConfig;

        const rectConfig = {
          width: 132,
          height: 60,
          lineWidth: 1,
          fontSize: 12,
          stroke: bgStorkeColor,
          fill: bgFillColor,
          radius: 4,
          opacity: 1,
        };

        const nodeOrigin = {
          x: -rectConfig.width / 2,
          y: -rectConfig.height / 2,
        };

        const textConfig = {
          textAlign: 'left',
          textBaseline: 'bottom',
        };

        const rect = group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x,
            y: nodeOrigin.y - 3,
            ...rectConfig,
          },
          name: 'main-rect',
        });

        const rectBBox = rect.getBBox();

        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 8 + nodeOrigin.x,
            y: -8,
            text: name,
            fontSize: 12,
            fill: txtNameColor,
            cursor: 'pointer',
          },
          name: 'name-shape',
        });

        group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x + 8,
            y: rectBBox.maxY - 30,
            width: 54,
            height: 18,
            radius: 2,
            opacity: 0.1,
            fill: corlorGroup[status],
            stroke: corlorGroup[status],
          },
        });
        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: nodeOrigin.x + 12,
            y: 12,
            text: statusLabel,
            fontSize: 10,
            fill: corlorGroup[status],
          },
          name: 'statusLabel-shape',
        });

        // collapse rect
        if (cfg.children && cfg.children.length) {
          let collapseConfig = {
            x: nodeOrigin.x + 66,
            y: 27,
          };
          if (crossDirection.includes(uiShaper?.points)) {
            collapseConfig = {
              x: nodeOrigin.x + 132,
              y: -3,
            };
          }
          group.addShape('circle', {
            attrs: {
              r: 5,
              stroke: '#999',
              cursor: 'pointer',
              fill: '#fff',
              ...collapseConfig,
            },
            name: 'collapse-back',
            modelId: cfg.id,
          });

          // collpase text
          group.addShape('text', {
            attrs: {
              textAlign: 'center',
              textBaseline: 'middle',
              text: collapsed ? '+' : '-',
              fontSize: 11,
              cursor: 'pointer',
              fill: ' #999',
              ...collapseConfig,
            },
            name: 'collapse-text',
            modelId: cfg.id,
          });
        }
        const _this = this as any;
        _this.drawLinkPoints(cfg, group);
        return rect;
      },
      setState(name, value, item: any) {
        collapseSetState(name, value, item);
      },
      getAnchorPoints(cfg: any) {
        return setPoints(cfg, SHAPENAME);
      },
    },
    'rect',
  );
}
