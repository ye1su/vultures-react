<!--
 * @Author: sifengyuan
 * @Date: 2022-08-06 16:16:53
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-06 16:37:42
 * @FilePath: /vultures-react/src/OrcheScene/index.md
 * @Description: update here
-->

# 组合编排

```tsx
import React, { useRef } from 'react';
import OrcheScene from './index.tsx';
import mockData from './Mock.ts';

export default () => {
  const orchSceneRef = useRef<any>();
  return (
    <div>
      <OrcheScene sortSceneList={mockData} ref={orchSceneRef} />
    </div>
  );
};
```
