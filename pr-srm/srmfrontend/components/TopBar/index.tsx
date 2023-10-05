import React, { VFC, useEffect, useState } from 'react';
import { AdminContentSize, AdminTopBar, ModuleInfo } from '@components/TopBar/styles';

interface Props {
  userNm: string;
  modulePath: string;
  onLogOut: () => void;
}
const TopBar: VFC<Props> = ({ userNm, modulePath, onLogOut }) => {
  return (
    <>
      <AdminTopBar>
        <ModuleInfo>
          <p>{modulePath.split('/').join(' - ')}</p>
        </ModuleInfo>
        <AdminContentSize>
          <p className="fl">
            <a href="/index.do"></a>
          </p>
          <ul className="fr">
            <li>
              <span>
                <b>{userNm}</b>
              </span>{' '}
              님 환영합니다.
            </li>
            <li>
              <div>HOME</div>
            </li>
            <li>
              <div onClick={onLogOut}>LOGOUT</div>
            </li>
          </ul>
        </AdminContentSize>
      </AdminTopBar>
    </>
  );
};

export default TopBar;
