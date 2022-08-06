/*
 * @Author: sifengyuan
 * @Date: 2022-07-27 09:28:52
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-06 16:00:32
 * @FilePath: /vultures-react/src/GraphTree/effect/useBaseConfig.ts
 * @Description: update here
 */
import { useEffect, useState } from 'react';
import type { spTreeGraphProps } from '../index';
import { crossDirection } from './consts';

export default function useBaseConfig(props: spTreeGraphProps) {
  const resetMap = (data: any, key: string, value: any) => {
    const list = data.map((item: any) => {
      if (item?.children) {
        resetMap(item.children, key, value);
      }
      item[key] = value;
      return item;
    });
    return list;
  };

  const baseNode = {
    style: {
      opacity: 0,
    },
  };

  const baseEdge = {
    // type: 'polyline',
    type: 'edge-base-line',
    // style: {
    //   stroke: '#ccc',
    //   polyline: 20,
    //   endArrow: true,
    //   offset: 25,
    //   radius: 10,
    // },
  };

  const baseModes = {
    default: ['drag-canvas', 'activate-node'],
  };

  const setBaseConfig = (propsInfo: spTreeGraphProps) => {
    let baseLayout = {
      type: 'compactBox',
      direction: 'TB',
      getHeight: function getHeight() {
        return 40;
      },
      getWidth: function getWidth() {
        return 200;
      },
      getVGap: function getVGap() {
        return 40;
      },
    };
    if (crossDirection.includes(propsInfo?.layout?.direction)) {
      baseLayout = {
        ...baseLayout,
        getHeight: function getHeight() {
          return 60;
        },
        getWidth: function getWidth() {
          return 280;
        },
        getVGap: function getVGap() {
          return 40;
        },
      };
    }
    return {
      fitView: propsInfo?.autoView ? true : false,
      animate: true,
      animateCfg: {
        duration: 300,
      },
      modes: { ...baseModes, ...propsInfo.baseMode },
      defaultNode: { ...baseNode, ...propsInfo.baseNode },
      defaultEdge: { ...baseEdge, ...propsInfo.baseEdge },
      layout: { ...baseLayout, ...propsInfo.layout },
    };
  };
  const setGraphPropsFun = (propsInfo: spTreeGraphProps) => {
    const { dataSource, uiShaper } = propsInfo;
    let newSource = [{}];
    if (Object.keys(dataSource)?.length !== 0) {
      newSource = resetMap([dataSource], 'uiShaper', uiShaper);
    }
    return {
      data: newSource[0],
      config: {
        padding: [20, 50],
        defaultLevel: 3,
        defaultZoom: 1,
      },
    };
  };

  const [defaultConfig, setDefaultConfig] = useState<any>({
    ...setBaseConfig(props),
    ...props.baseMoreConfig,
  });
  const [graphProps, setGraphProps] = useState<any>(setGraphPropsFun(props));

  useEffect(() => {
    setGraphProps(setGraphPropsFun(props));
    setDefaultConfig({ ...setBaseConfig(props), ...props.baseMoreConfig });
  }, [props]);

  return {
    defaultConfig,
    graphProps,
  };
}
