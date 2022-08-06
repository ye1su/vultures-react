/*
 * @Author       : sifengyuan
 * @Date         : 2022-07-15 13:43:11
 * @FilePath: /vultures-react/src/GraphTree/index.tsx
 * @LastEditTime: 2022-08-06 16:08:57
 */
import * as React from 'react';
import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import { TreeGraph } from '@antv/g6';
import { FullscreenOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useSize } from 'ahooks';
import useRegister from './effect/useRegister';
import useBaseConfig from './effect/useBaseConfig';
import useGraphPulgin from './effect/useGraphPlugin';
import useFreeBehavior from './effect/useFreeBehavior';
import { createGraphEvent } from './effect/useEvents';
import './index.css';

export interface MenuItem {
  value: string;
  name: string;
}
export interface spTreeGraphProps {
  renderId: string;
  dataSource: any;
  style?: any;
  tabSwitch?: boolean;
  stepShow?: boolean;
  actionBar?: boolean;
  moveTo?: [number, number];
  autoView?: boolean;
  layout?: any;
  uiShaper?: any;
  baseNode?: any;
  baseEdge?: any;
  baseMode?: any;
  baseMoreConfig?: any;
  setCtxMenu?: (evt: any) => MenuItem[];
  getMenuClick?: (target: any, node: any) => void;
  getNodeClick?: (event: any) => void;
}

export const GraphTree: React.FC<spTreeGraphProps> = forwardRef((props, ref) => {
  const [zoomRatio, setZoomRatio] = useState(1);
  const [zoomType, setZoomType] = useState({
    leftType: '',
    nowType: '',
  });

  const { defaultConfig, graphProps } = useBaseConfig(props);
  const { plugins } = useGraphPulgin(props);
  useFreeBehavior();
  useRegister();
  const conBox = useRef<any>();
  const treeGraphRef = useRef<any>();
  const graphRef = useRef<any>();
  const GraphSize = useSize(treeGraphRef);
  const { renderId, actionBar = true } = props;

  useImperativeHandle(ref, () => ({
    getGraphRef,
  }));
  const init = async () => {
    const { data } = graphProps;
    if (!data) {
      return;
    }
    const { onInit, config } = graphProps;
    graphRef.current = new TreeGraph({
      container: renderId,
      ...defaultConfig,
      ...config,
      plugins,
    });
    if (typeof onInit === 'function') {
      onInit(graphRef.current);
    }
    if (Object.keys(data)?.length === 0) {
      graphRef.current.changeData({ id: 'reset' });
    } else {
      graphRef.current.data(data);
    }
    graphRef.current.render();
    createGraphEvent(graphRef.current, props);
    loadPositon();
  };

  useEffect(() => {
    if (GraphSize?.width && GraphSize?.height) {
      graphRef.current.changeSize(GraphSize?.width, GraphSize?.height);
      graphRef.current.changeData(graphProps.data);
      loadPositon();
      graphRef.current.refresh();
    }
  }, [GraphSize]);

  useEffect(() => {
    if (graphRef.current) {
      if (props?.layout?.direction) {
        graphRef.current.updateLayout(defaultConfig.layout);
        graphRef.current.changeData(graphProps.data);
        loadPositon();
        graphRef.current.refresh();
      }
    }
  }, [defaultConfig?.layout?.direction]);

  useEffect(() => {
    if (graphRef.current) {
      if (Object.keys(graphProps.data)?.length === 0) {
        graphRef.current.changeData({ id: 'reset' });
      } else {
        graphRef.current.changeData(graphProps.data);
      }
      loadPositon();
      graphRef.current.refresh();
    }
  }, [graphProps.data]);

  const getGraphRef = () => {
    return graphRef.current;
  };
  const openFull = () => {
    if (!document.fullscreenElement) {
      conBox.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };
  const reSizeZoon = (type: string) => {
    let newZoom = zoomRatio;
    zoomType.leftType = zoomType.nowType;
    zoomType.nowType = type;
    if (zoomType.leftType !== zoomType.nowType) {
      newZoom = 1;
      setZoomRatio(1);
    }

    if (zoomRatio >= 2 || zoomRatio <= 0) {
      return;
    }
    if (type === 'add') {
      newZoom += 0.1;
    } else {
      newZoom -= 0.1;
    }
    graphRef.current.zoom(Number(newZoom.toFixed(1)));
    setZoomRatio(Number(newZoom.toFixed(1)));
    setZoomType(zoomType);
  };

  const loadPositon = () => {
    if (props?.autoView) {
      graphRef.current.fitView(30);
    }
    if (props?.moveTo) {
      const [x, y] = props?.moveTo;
      resetMoveTo(graphRef.current, x, y);
    }
  };

  const resetMoveTo = (graph: any, x: number, y: number) => {
    graph.moveTo(x, y);
  };

  useEffect(() => {
    init();
    return () => {
      graphRef.current = null;
    };
  }, []);

  return (
    <div
      ref={conBox}
      style={{
        width: '100%',
        height: '100%',
        background: '#FAFAFA',
        paddingBottom: '32px',
        ...props.style,
      }}
    >
      {actionBar && (
        <div className="graphBtn">
          <Button icon={<PlusOutlined />} onClick={() => reSizeZoon('add')} />
          <Button icon={<MinusOutlined />} onClick={() => reSizeZoon('minus')} />
          <Button icon={<FullscreenOutlined />} onClick={openFull} />
        </div>
      )}

      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        id={renderId}
        ref={treeGraphRef}
      />
    </div>
  );
});

export default GraphTree;
