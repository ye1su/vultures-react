/*
 * @Author: sifengyuan
 * @Date: 2022-08-06 16:20:03
 * @LastEditors: sifengyuan
 * @LastEditTime: 2022-08-08 13:10:11
 * @FilePath: \vultures-react\src\OrcheScene\Mock.ts
 * @Description: update here
 */

const mockData: any = [
  {
    fieldLabel: '合同注册类型',
    fieldName: 'contract_register_type_code',
    moduleName: '合同基本信息',
    packageName: '合同',
    sceneFieldKey: 'CD0044',
    sceneFieldName: '合同注册类型',
    values:
      '[{"name":"01","value":" 销售合同-框架合同"},{"name":"02","value":" 销售合同-框架下订单"},{"name":"03","value":"销售合同-标准销售合同"},{"name":"04","value":"预销售合同"},{"name":"05","value":"内部合同"}]',
    key: 0,
  },
  {
    fieldLabel: '运输类型',
    fieldName: 'logistic_type',
    moduleName: '合同基本信息',
    packageName: '合同',
    sceneFieldKey: 'CD0056',
    sceneFieldName: '运输方式',
    values:
      '[{"name":"01","value":"空运"},{"name":"02","value":"海运"},{"name":"03","value":"河运"},{"name":"04","value":"陆运"},{"name":"05","value":"联程运输"}]',
    key: 1,
  },
  {
    fieldLabel: '交货方式',
    fieldName: 'delivery_way_code',
    moduleName: '合同基本信息',
    packageName: '合同',
    sceneFieldKey: 'CD0055',
    sceneFieldName: '交货方式',
    values:
      '[{"name":"01","value":" 车板交货"},{"name":"02","value":"地面交货"},{"name":"03","value":"买方自提"},{"name":"04","value":"代办托运"}]',
    key: 2,
  },
  {
    fieldLabel: '标的物类型',
    fieldName: 'subject_matter',
    moduleName: '合同基本信息',
    packageName: '合同',
    sceneFieldKey: 'CD0105',
    sceneFieldName: ' 标的物类型',
    values:
      '[{"name":"01","value":" 硬件"},{"name":"02","value":"软件"},{"name":"03","value":" 服务"},{"name":"04","value":"综合"}]',
    key: 3,
  },
];

export default mockData;
