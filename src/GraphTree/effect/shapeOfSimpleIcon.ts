/*
 * @Author: sifengyuan
 * @Date: 2022-07-26 17:09:35
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-01 13:32:42
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\shapeOfSimpleIcon.ts
 * @Description: update here
 */

/*
  定义ips-bom-head-rect的节点
  {
    "id": "282846721065746997",
    "name": "L4.新产品开发",
    "type": "ips-bom-head-rect",
    "collapse": false,
    "children": [], 
    "uiShaper"：{}
  }
  
*/

import { registerNode } from '@antv/g6';
import chanpin from '../asset/chanpin.svg';
import { collapseSetState, setPoints } from './useDrawShape';
import type { shapeTypes } from '../tree.type';
import { crossDirection } from './consts';

export default function shapeOfSimpleIcon() {
  const SHAPENAME = 'shape-simple-icon';

  registerNode(
    SHAPENAME,
    {
      shapeType: SHAPENAME,
      draw(cfg: any, group: any) {
        const { name = '', collapsed } = cfg;
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
          width: 140,
          height: 40,
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

        group.addShape('text', {
          attrs: {
            ...textConfig,
            x: 8 + nodeOrigin.x + 30,
            y: 3,
            text: name,
            fontSize: 12,
            fill: txtNameColor,
            cursor: 'pointer',
          },
          name: 'name-shape',
        });

        group.addShape('rect', {
          attrs: {
            x: -70,
            y: -23,
            width: 30,
            height: 40,
            opacity: 1,
            fill: iconBgColor,
          },
        });
        group.addShape('image', {
          attrs: {
            x: -63,
            y: -10,
            width: 15,
            height: 15,
            img: iconPath,
          },
          name: 'image-shape',
        });

        // collapse rect
        if (cfg.children && cfg.children.length) {
          let collapseConfig = {
            x: nodeOrigin.x + 70,
            y: 17,
          };
          if (crossDirection.includes(uiShaper?.points)) {
            collapseConfig = {
              x: nodeOrigin.x + 140,
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
