/*
 * @Author: sifengyuan
 * @Date: 2022-08-04 13:51:20
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-06 16:19:03
 * @FilePath: /vultures-react/src/OrcheScene/index.tsx
 * @Description: update here
 */
import * as React from 'react';
import { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { PlusCircleFilled, CloseOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { differenceWith, isEqual, keysIn } from 'lodash';
import type { MenuProps } from 'antd';
import style from './index.module.less';

interface OrcheSceneProps {
  sortSceneList: any[];
  ref?: any;
}

const OrcheScene: React.FC<OrcheSceneProps> = forwardRef((props, ref) => {
  const { sortSceneList = [] } = props;
  const [trasVal, setTrasVal] = useState<any>([]);
  const [menuList, setMenuList] = useState<any>([]);
  const [addNow, setAddNow] = useState<any>({ block: {}, Lmap: {} });

  useImperativeHandle(ref, () => ({
    trasVal,
  }));

  useEffect(() => {
    console.log(sortSceneList);

    const newList = sortSceneList.map((scene: any) => {
      let newVal = JSON.parse(scene.values) || [];
      const showListVal = newVal?.map((val: any) => {
        return [val];
      });
      return { ...scene, values: newVal, showListVal };
    });
    setTrasVal(newList);
  }, [sortSceneList]);

  const addTagClick = (visible: boolean, block: any, lmap: any) => {
    if (visible) {
      setAddNow({ block, lmap });
      const lengthOneList = block.showListVal
        .map((b: any, index: number) => {
          if (b.length === 1) {
            return b[0];
          }
        })
        .filter((i: any) => i !== undefined);
      const diff = lengthOneList.filter((len: any) => len.name !== lmap[0].name);
      const menuContent = diff.map((d: any) => {
        return { key: d.name, label: d.value };
      });
      setMenuList(menuContent);
    }
  };
  const menuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'none') {
      return;
    }
    const { block, lmap } = addNow;
    let delIndex = -1;
    block.showListVal.forEach((b: any, index: number) => {
      if (b.length === 1) {
        if (b[0].name === e.key) {
          delIndex = index;
          return;
        }
      }
    });
    if (delIndex > 0) {
      block.showListVal.splice(delIndex, 1);
    }
    const addItem = block.values?.find((f: any) => f.name === e.key);
    lmap.push(addItem);
    setAddNow({ block, lmap });
    setTrasVal(trasVal);
  };
  const delItem = (block: any, lmap: any, base: any) => {
    if (lmap.length < 2) {
      const delIndex = block.showListVal.findIndex((f: any) => f[0].name == lmap[0].name);
      block.showListVal.splice(delIndex, 1);
    } else {
      const delIndex = lmap.findIndex((f: any) => f.name == base.name);
      lmap.splice(delIndex, 1);
      block.showListVal.push([base]);
    }
    setAddNow({ block, lmap });
    setTrasVal(trasVal);
  };

  const menu = (
    <Menu
      items={menuList.length !== 0 ? menuList : [{ key: 'none', label: '无' }]}
      onClick={menuClick}
    />
  );

  return (
    <div className={style.orcBox}>
      {trasVal.map((val: any, index: number) => {
        return (
          <div className={style.everyBlock} key={val.sceneFieldKey + index}>
            <span className={style.orhTitle}>{val.sceneFieldName}</span>
            <div>
              {val.showListVal.map((lmap: any, index: number) => {
                return (
                  <div className={style.everyValue} key={index}>
                    {lmap.map((base: any, index: number) => {
                      return (
                        <div className={style.baseData} key={base.name + index}>
                          <div className={style.tag}></div>
                          <div className={style.tagTitle}>{base.value}</div>
                          <div className={style.tagClose}>
                            {' '}
                            <CloseOutlined onClick={() => delItem(val, lmap, base)} />{' '}
                          </div>
                        </div>
                      );
                    })}
                    <div className={style.addTag}>
                      <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        onVisibleChange={(visible: boolean) => addTagClick(visible, val, lmap)}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <PlusCircleFilled />
                          </Space>
                        </a>
                      </Dropdown>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default OrcheScene;
