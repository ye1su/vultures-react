/*
 * @Author: sifengyuan
 * @Date: 2022-07-26 20:05:50
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-07-27 20:23:45
 * @FilePath: \bui-group\packages\bui-graph\src\tree\tree.type.ts
 * @Description: update here
 */

export interface shapeTypes {
  type?: string;
  iconPath?: string;
  iconBgColor?: string;
  bgStorkeColor?: string;
  bgFillColor?: string;
  txtNameColor?: string;
  corlorGroup?: any;
}

export type shapeSoloType = shapeTypes[];
