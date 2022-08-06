/*
 * @Author: sifengyuan
 * @Date: 2022-07-25 15:54:27
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-07-29 17:51:52
 * @FilePath: \bui-group\packages\bui-graph\src\tree\effect\useRegister.ts
 * @Description: update here
 */

import shpeOfBaseCtx from './shapeOfBaseCtx';
import shapeOfHeadIcon from './shapeOfHeadIcon';
import shpeOfSimpleIcon from './shapeOfSimpleIcon';
import edgeOfBaseLine from './edgeOfBaseLine';

// 自定义节点、边
export default function useRegister() {
  shpeOfBaseCtx();
  shapeOfHeadIcon();
  shpeOfSimpleIcon();
  edgeOfBaseLine();
}
