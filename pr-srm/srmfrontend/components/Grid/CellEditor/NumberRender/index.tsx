import React, { useEffect } from 'react';
import { INumberCellPrams } from '@typings/Props';
import DecimalFormat from 'decimal-format';

export default (props: INumberCellPrams) => {
  const formatType = (type: string) => {
    switch (type) {
      case '0':
        return '#,###'; // 정수
      case '1':
        return '#,###.0'; // 소수점 첫재
      case '2':
        return '#,###.00'; // 소수점 둘째
      case '3':
        return '#,###.000'; // 소수점 셋재
      case '4':
        return '#,###.0000'; // 소수점 넷째
      case 'D':
        return '#,###.0#';
    }
    return '#,###';
  };

  const df = new DecimalFormat(formatType(props.colDataType));
  return <div>{df.format(props.value)}</div>;
};
