# 树展示

> 树图

## 基本方法

```tsx
import React from 'react';
import { useRef, useState } from 'react';
import GraphTree from './index.tsx';
import mockData from './effect/Mock.ts';
import { Button, Radio } from 'antd';
import 'antd/dist/antd.min.css';

export default () => {
  const graphRef = useRef();
  const [directionValue, setDirectionValue] = useState('LR');
  const [data, setData] = useState(mockData);

  const getRef = () => {
    const ref = graphRef.current.getGraphRef();
    const findNode = ref.find('node', (node) => {
      return node.hasState('active');
    });
    console.log(findNode);
  };
  const setCtxMenu = (evt: any) => {
    return [
      { value: 'edit', name: '编辑' },
      { value: 'del', name: '删除' },
    ];
  };

  const getMenuClick = (target: any, node: any, item: any) => {
    console.log(target, node, item);
  };
  const getNodeClick = (e: any) => {
    console.log(e);
  };
  const onChange = (e: RadioChangeEvent) => {
    setDirectionValue(e.target.value);
  };

  return (
    <div>
      <Button onClick={getRef}> 获取元素实例 </Button>
      <Button
        onClick={() => {
          setData({});
        }}
      >
        {' '}
        改变元素{' '}
      </Button>
      <Radio.Group onChange={onChange} value={directionValue}>
        <Radio value={'TB'}>TB</Radio>
        <Radio value={'LR'}>LR</Radio>
      </Radio.Group>
      <GraphTree
        renderId="sam666"
        ref={graphRef}
        dataSource={data}
        style={{
          width: '800px',
          height: '400px',
        }}
        layout={{
          direction: directionValue,
        }}
        uiShaper={[
          { bgFillColor: '#dea', type: 'shape-base-ctx', points: directionValue },
          { type: 'shape-simple-icon', points: directionValue },
          { type: 'shape-head-icon', points: directionValue },
        ]}
        tabSwitch={true}
        stepShow={true}
        autoView={true}
        setCtxMenu={setCtxMenu}
        getMenuClick={getMenuClick}
        getNodeClick={getNodeClick}
      />
    </div>
  );
};
```

## 图形 shape-base-ctx

```tsx
import React from 'react';
import GraphTree from './index.tsx';
let mockData = {
  id: '282846721065746997',
  name: 'L4.新产品开发',
  statusLabel: '器身 70%',
  status: 'U',
  type: 'shape-base-ctx',
  children: [],
};

export default () => {
  return (
    <div>
      <GraphTree
        renderId="sam777"
        dataSource={mockData}
        style={{
          width: '500px',
          height: '200px',
        }}
        autoView={true}
      />
    </div>
  );
};
```

## 图形 shape-head-icon

```tsx
import React from 'react';
import GraphTree from './index.tsx';
let mockData = {
  id: '282846721065746997',
  name: 'L4.新产品开发',
  statusLabel: '器身 70%',
  type: 'shape-head-icon',
  children: [],
};

export default () => {
  return (
    <div>
      <GraphTree
        renderId="sam999"
        dataSource={mockData}
        style={{
          width: '500px',
          height: '200px',
        }}
        autoView={true}
      />
    </div>
  );
};
```

## 图形 ips-bom-head-rect

```tsx
import React from 'react';
import GraphTree from './index.tsx';
let mockData = {
  id: '282846721065746997',
  name: 'L4.新产品开发',
  type: 'shape-simple-icon',
  children: [],
};

export default () => {
  return (
    <div>
      <GraphTree
        renderId="sam888"
        dataSource={mockData}
        style={{
          width: '500px',
          height: '200px',
        }}
        autoView={true}
      />
    </div>
  );
};
```

### API

| 参数 | 类型 | 说明 | 详情 |
| :-: | :-: | :-: | :-: |
| dataSource | `object {}` | 树结构的值 |  |
| style | `object {}` | 画布样式 | css 样式 |
| setCtxMenu | `function ` | 设置右键列表 |  |
| getMenuClick | `function ` | 右键点击 |  |
| getNodeClick | `function ` | 点击模型 |  |
| tabSwitch | `boolean ` | 开启 tab 切换模式 | 默认 false |
| stepShow | `boolean ` | 是否逐级展开 | 必须开启 tabswitch 下执行，逐级展开 |
| stepShow | `boolean ` | 是否逐级展开 | 必须开启 tabswitch 下执行，逐级展开 |
| autoView | `boolean ` | 开启自适应 | 默认不开启 |
| moveTo | `Array[] ` | 画布移动 | `[x,y]` 默认自适应 |
| actionBar | `boolean` | 开启操作栏 | 默认为 true |
| baseNode | `object {}` | 初始节点样式 | https://g6.antv.vision/zh/docs/manual/middle/elements/nodes/defaultNode |
| baseEdge | `object {}` | 初始线样式 | https://g6.antv.vision/zh/docs/manual/middle/elements/edges/defaultEdge |
| baseMode | `object {}` | 初始模式 | https://g6.antv.vision/zh/docs/manual/middle/states/defaultBehavior |
| baseMoreConfig | `object {}` | 图的基础其他配置 |  |

actionBar

#### uiShaper 字段

|     参数      |           详情            |
| :-----------: | :-----------------------: |
|     type      |        shape 类型         |
|   iconPath    |         图标地址          |
|  iconBgColor  |       图标背景颜色        |
| bgStorkeColor |      shepe 边框颜色       |
|  bgFillColor  |      shape 填充颜色       |
| txtNameColor  |       name 文字颜色       |
|  corlorGroup  |       status 颜色组       |
|    points     | 节点桩 跟布局方向一样参数 |
