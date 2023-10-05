import React, { VFC, useEffect, useState } from 'react';
import { TabMenu } from './styles';
import DropWrapper from '@components/DropDown/DropWrapper';
import DropItem from '@components/DropDown/DropItem';
import { DropMenus } from '@components/DropDown/DropWrapper/styles';

interface Props {
  components: JSX.Element[];
}

const Tab: VFC<Props> = ({ components }) => {
  return (
    <div>
      <TabMenu>
        <ul>{components}</ul>
        {/*<DropMenus className={'tabOption'}>*/}
        {/*  <DropItem*/}
        {/*    depthLevel={0}*/}
        {/*    items={{*/}
        {/*      DIV_CD: '01',*/}
        {/*      P_MENU_ID: 'ddd',*/}
        {/*      P_MENU_TYPE: 'ddd',*/}
        {/*      C_MENU_ID: 'dddd',*/}
        {/*      C_MENU_TYPE: 'dddd',*/}
        {/*      C_MENU_NM: '',*/}
        {/*      MENU_LVL: '1',*/}
        {/*      MENU_SEQ: '1',*/}
        {/*      USE_YN: 'y',*/}
        {/*      ICON_NO: 'ddd',*/}
        {/*      PATH: 'ddd',*/}
        {/*      PATH_STRING: 'dd',*/}
        {/*      SUB_MENUS: [*/}
        {/*        {*/}
        {/*          DIV_CD: '01',*/}
        {/*          P_MENU_ID: 'ddd',*/}
        {/*          P_MENU_TYPE: 'ddd',*/}
        {/*          C_MENU_ID: 'dddd',*/}
        {/*          C_MENU_TYPE: 'dddd',*/}
        {/*          C_MENU_NM: '',*/}
        {/*          MENU_LVL: '1',*/}
        {/*          MENU_SEQ: '1',*/}
        {/*          USE_YN: 'y',*/}
        {/*          ICON_NO: 'ddd',*/}
        {/*          PATH: 'ddd',*/}
        {/*          PATH_STRING: 'dd',*/}
        {/*          SUB_MENUS: [],*/}
        {/*        },*/}
        {/*        {*/}
        {/*          DIV_CD: '01',*/}
        {/*          P_MENU_ID: 'ddd',*/}
        {/*          P_MENU_TYPE: 'ddd',*/}
        {/*          C_MENU_ID: 'dddd',*/}
        {/*          C_MENU_TYPE: 'dddd',*/}
        {/*          C_MENU_NM: '',*/}
        {/*          MENU_LVL: '1',*/}
        {/*          MENU_SEQ: '1',*/}
        {/*          USE_YN: 'y',*/}
        {/*          ICON_NO: 'ddd',*/}
        {/*          PATH: 'ddd',*/}
        {/*          PATH_STRING: 'dd',*/}
        {/*          SUB_MENUS: [],*/}
        {/*        },*/}
        {/*        {*/}
        {/*          DIV_CD: '01',*/}
        {/*          P_MENU_ID: 'ddd',*/}
        {/*          P_MENU_TYPE: 'ddd',*/}
        {/*          C_MENU_ID: 'dddd',*/}
        {/*          C_MENU_TYPE: 'dddd',*/}
        {/*          C_MENU_NM: '',*/}
        {/*          MENU_LVL: '1',*/}
        {/*          MENU_SEQ: '1',*/}
        {/*          USE_YN: 'y',*/}
        {/*          ICON_NO: 'ddd',*/}
        {/*          PATH: 'ddd',*/}
        {/*          PATH_STRING: 'dd',*/}
        {/*          SUB_MENUS: [],*/}
        {/*        },*/}
        {/*        {*/}
        {/*          DIV_CD: '01',*/}
        {/*          P_MENU_ID: 'ddd',*/}
        {/*          P_MENU_TYPE: 'ddd',*/}
        {/*          C_MENU_ID: 'dddd',*/}
        {/*          C_MENU_TYPE: 'dddd',*/}
        {/*          C_MENU_NM: '',*/}
        {/*          MENU_LVL: '1',*/}
        {/*          MENU_SEQ: '1',*/}
        {/*          USE_YN: 'y',*/}
        {/*          ICON_NO: 'ddd',*/}
        {/*          PATH: 'ddd',*/}
        {/*          PATH_STRING: 'dd',*/}
        {/*          SUB_MENUS: [],*/}
        {/*        },*/}
        {/*      ],*/}
        {/*    }}*/}
        {/*    setEvent={() => {}}*/}
        {/*  />*/}
        {/*</DropMenus>*/}
      </TabMenu>
    </div>
  );
};

export default Tab;
