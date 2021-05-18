/**
 * 通过信息类型获取Tag颜色
 * @param type 信息类型
 * @returns Tag颜色字符串
 */
export const getTagColorFromType = (type: string) => {
  switch (type) {
    case 'information':
      return 'blue';
    case 'success':
      return 'green';
    case 'alter':
      return 'yellow';
    case 'error':
      return 'red';
    default:
      return 'gray';
  }
};
