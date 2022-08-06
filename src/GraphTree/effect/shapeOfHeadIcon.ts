/*
 * @Author: sifengyuan
 * @Date: 2022-07-26 16:26:28
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-01 13:10:03
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\shapeOfHeadIcon.ts
 * @Description: update here
 */

/*
  定义shape-head-icon的节点
  {
    "id": "282846721065746997",
    "name": "L4.新产品开发",
    "statusLabel": "器身 70%"
    "type": "shape-head-icon",
    "collapse": false,
    "children": [], 
    "uiShaper"：{}
  }
  
*/

import { registerNode } from '@antv/g6';
import chanpin from '../asset/chanpin.svg';
import { collapseSetState, ctxMenuGroup, setPoints } from './useDrawShape';
import type { shapeTypes } from '../tree.type';
import { crossDirection } from './consts';

export default function shapeOfHeadIcon() {
  const SHAPENAME = 'shape-head-icon';

  registerNode(
    SHAPENAME,
    {
      shapeType: SHAPENAME,
      draw(cfg: any, group: any) {
        const { name = '', collapsed, statusLabel } = cfg;
        const uiShaper = cfg?.uiShaper?.find((i: any) => i.type === SHAPENAME) || {};
        let shepeDefaultConfig: shapeTypes = {
          iconPath: chanpin,
          iconBgColor: '#f0f7ff',
          bgStorkeColor: '#E6E6E6',
          bgFillColor: '#fff',
          txtNameColor: '#333333',
        };

        if (uiShaper) {
          shepeDefaultConfig = { ...shepeDefaultConfig, ...uiShaper };
        }
        const { iconPath, iconBgColor, bgStorkeColor, bgFillColor, txtNameColor } =
          shepeDefaultConfig;

        const rectConfig = {
          width: 210,
          height: 60,
          lineWidth: 1,
          fontSize: 12,
          stroke: bgStorkeColor,
          fill: bgFillColor,
          opacity: 1,
        };

        const nodeOrigin = {
          x: -rectConfig.width / 2,
          y: -rectConfig.height / 2,
        };

        const rect = group.addShape('rect', {
          attrs: {
            x: nodeOrigin.x,
            y: nodeOrigin.y - 3,
            ...rectConfig,
          },
          name: 'main-rect',
        });

        group.addShape('text', {
          attrs: {
            textAlign: 'left',
            textBaseline: 'bottom',
            x: 8 + nodeOrigin.x + 40,
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
            x: -105,
            y: -33,
            width: 40,
            height: 60,
            opacity: 1,
            fill: iconBgColor,
          },
        });
        group.addShape('text', {
          attrs: {
            textAlign: 'left',
            textBaseline: 'bottom',
            x: nodeOrigin.x + 48,
            y: 12,
            text: statusLabel,
            fontSize: 10,
            fill: '#848484',
          },
          name: 'statusLabel-shape',
        });
        group.addShape('image', {
          attrs: {
            x: -95,
            y: -15,
            width: 20,
            height: 20,
            img: iconPath,
          },
          name: 'image-shape',
        });

        ctxMenuGroup(rectConfig, group);

        // collapse rect
        if (cfg.children && cfg.children.length) {
          let collapseConfig = {
            x: nodeOrigin.x + 105,
            y: 27,
          };
          if (crossDirection.includes(uiShaper?.points)) {
            collapseConfig = {
              x: nodeOrigin.x + 210,
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
        (this as any).drawLinkPoints(cfg, group);
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
