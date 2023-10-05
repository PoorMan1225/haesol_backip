import React, { FC, VFC, useCallback, useEffect, useState } from 'react';
import { ContentsWrap, AdminRightContents, NewPages } from './styles';
import LeftMenu from '@components/LeftMenu';
import Tab from '@components/Tab';
import TabPage from '@components/TabPage';
import axios from 'axios';
import DropItems from '@components/DropDown/DropItems';
import { IDropItem } from '@typings/DropItem';
import 'react-toastify/dist/ReactToastify.css';
import NewTap from '@components/Tab/NewTab';
import useFetcher from '@utils/useFetcher';
import useSWR from 'swr';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { Redirect, useLocation } from 'react-router-dom';
import { IUserData } from '@typings/UserData';
import TopBar from '@components/TopBar';
import { IDynamicProps } from '@typings/Props';

export interface pageMethods {
  addMethods: (type: string) => void;
}

const Workspace: FC = () => {
  const location = useLocation();
  const tabLimitSize = 7;
  const user = location.state as IUserData; // 사용자 아이디를 받아옴.
  const [showLeftMenu, setShowLeftMenu] = useState(true);
  const [tabs, setTabs] = useState<JSX.Element[]>([]);
  const [pages, setPages] = useState<JSX.Element[]>([]);
  const [modulePath, setModulePath] = useState('');
  const [dropMenuList, setDropMenuList] = useState<IDropItem[]>([]);
  const [activeMenuItem, setActiveMenuItem] = useState<IDropItem | null>(null);
  const [isNotValidAuth, setIsNotValidAuth] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const { fetcherCallback } = useFetcher();
  const { data, error, mutate } = useSWR(
    '/api/auth/signIn-token',
    (url) =>
      fetcherCallback(url, (res: any) => {
        if (!res.data.response.success) {
          toast.info('인증이 만료되었습니다.', {
            toastId: 'toastId',
            onClose: () => {
              setIsNotValidAuth(true);
            },
          });
        }
      }),
    {
      refreshInterval: 100000,
    },
  );

  useEffect(() => {
    requestMenuList();
  }, []);

  const requestMenuList = () => {
    if (!user) return;
    axios
      .post('/api/menu/menu-list', {
        data: user.ID,
      })
      .then((res) => {
        const _dropMenuList = res.data.response;
        if (!_dropMenuList && _dropMenuList.length > 0) return;
        setDropMenuList(_dropMenuList);
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  /**
   * left 메뉴 확장 콜백
   */
  const onClickLeftMenu = useCallback(() => {
    return setShowLeftMenu((prev) => !prev);
  }, []);

  /**
   * 래프트 메뉴르 클릭시에 동작 하는 이벤트
   * 신규메뉴가 있을 경우 컴포넌트 와 폼을 불러와서 추가하고
   * 기존메뉴가 존재하면 액티브 메뉴를 변경 한다.
   */
  const onClickMenuItem = useCallback(
    (clickMenuItem: IDropItem | null) => {
      if (!clickMenuItem) return;
      const findTab = tabs.find((tab) => tab.props.value === clickMenuItem.C_MENU_ID);
      if (findTab) {
        // 탭이 존재한다면 기존 메뉴를 액티브합니다.
        setActiveMenuItem(clickMenuItem); // 사이드에서 클릭해도 기존에 선택된 activeMenu 와 동일하기 때문에 리랜더링은 발생하지 않음.
        setModulePath(clickMenuItem.PATH);
        updateTabs(clickMenuItem);
        updatePages(clickMenuItem);
      } else {
        if (!isValidTabLength()) {
          return;
        }
        setActiveMenuItem(clickMenuItem); // 사이드에서 클릭해도 기존에 선택된 activeMenu 와 동일하기 때문에 리랜더링은 발생하지 않음.
        setModulePath(clickMenuItem.PATH);
        addTab(clickMenuItem);
        addPage(clickMenuItem);
      }
    },
    [tabs, activeMenuItem, pages],
  );

  const updateTabs = (clickMenuItem: IDropItem) => {
    setTabs((prevTabs) => {
      return prevTabs.map((element) => {
        const isActive = element.props.value === clickMenuItem?.C_MENU_ID;
        return React.cloneElement(element, { active: isActive ? 'actived' : '' });
      });
    });
  };

  const updatePages = (clickMenuItem: IDropItem) => {
    setPages((prevPages) => {
      return prevPages.map((element) => {
        const isActive = element.props.value === clickMenuItem?.C_MENU_ID;
        return React.cloneElement(element, { active: isActive ? 'actived' : '' });
      });
    });
  };

  const addTab = (clickMenuItem: IDropItem) => {
    setTabs((prevTabs) => [
      ...prevTabs.map((element) => React.cloneElement(element, { active: '' })),
      <NewTap
        key={clickMenuItem.C_MENU_ID}
        value={clickMenuItem.C_MENU_ID}
        item={clickMenuItem}
        active={'actived'}
        tabClickEventHandler={tabClickEventHandler}
        tabCloseEventHandler={tabCloseEventHandler}
      />,
    ]);
  };

  /**
   * 동적으로 모듈을 추가해서 페이지 추가하는 함수.
   * @param clickMenuItem
   */
  const addPage = (clickMenuItem: IDropItem) => {
    import(`@pages/${clickMenuItem.PATH}`)
      .then((module) => {
        const DynamicComponent: React.FC<IDynamicProps> = module.default;

        setPages((prevPages) => [
          ...prevPages.map((page) => React.cloneElement(page, { active: '' })),
          <NewPage
            key={clickMenuItem.C_MENU_ID}
            form={<DynamicComponent divCd={'01'} menuId={clickMenuItem.C_MENU_ID} />}
            value={clickMenuItem.C_MENU_ID}
            item={clickMenuItem}
            active={'actived'}
          />,
        ]);
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // 동적 로드 중 오류가 발생할 경우 처리합니다.
        setPages((prevPages) => [
          ...prevPages.map((page) => React.cloneElement(page, { active: '' })),
          <NewPage
            key={clickMenuItem.C_MENU_ID}
            form={null}
            value={clickMenuItem.C_MENU_ID}
            item={clickMenuItem}
            active={'actived'}
          />,
        ]);
      });
  };

  /**
   * 드롭다운 선택시 발생하는 이벤트.
   */
  const sendEventHandler = useCallback(
    (item: IDropItem) => {
      if (!isValidTabLength()) {
        return;
      }
      item && setActiveMenuItem(item);
    },
    [tabs, activeMenuItem],
  );

  /**
   * 탭 개수 제한 체크 함수
   */
  const isValidTabLength = () => {
    if (tabs.length > tabLimitSize) {
      toast.error('탭 개수 제한입니다. 탭을 지우고 다시 시도하여 주십시오.', { toastId: 'toastId' });
      return false;
    }
    return true;
  };

  /**
   * 신규 페이지 추가
   * value 꼭 unique 한 값을 넣어줘야 한다. value 로 컴포넌트를 식별하는 듯 합니다.
   */
  const NewPage: VFC<{ value: string; form: React.JSX.Element | null; item: IDropItem; active: string }> = ({
    form,
    active,
  }) => {
    return <NewPages className={active}>{form}</NewPages>;
  };

  const tabClickEventHandler = useCallback(
    (item: IDropItem) => {
      item && setActiveMenuItem(item);
    },
    [tabs],
  );

  const tabCloseEventHandler = useCallback(
    (menuId: string, active: boolean) => {
      // 리액트에서 변수의 상태를 관리하기 때문에
      // 변수의 상태를 업데이트 하기 위해서는 tabs 로 변경할 경우에는 업데이트가 제대로 안된다.
      // 상태 업데이트가 완료된 후에 tabs 상태를 출력하거나 이용하고 싶다면 이렇게 해야 한다.
      if (!active) {
        setTabs((prevTabs) => prevTabs.filter((tab) => tab.props.value !== menuId));
        setPages((prevPages) => prevPages.filter((page) => page.props.value !== menuId));
        return;
      }

      const updateItems = (prevItems: JSX.Element[], menuId: string, action: ((item: IDropItem) => void) | null) => {
        const removedIndex = prevItems.findIndex((item) => item.props.value === menuId);
        const adjacentIndex = removedIndex > 0 ? removedIndex - 1 : removedIndex + 1;

        const updatedItems = prevItems.map((item, index) => {
          if (index === adjacentIndex) {
            action && action(item.props.item as IDropItem);
            return React.cloneElement(item, { active: 'actived' });
          }
          return item;
        });
        return updatedItems.filter((item, index) => index !== removedIndex);
      };

      setPages((prevPages) => updateItems(prevPages, menuId, null));
      setTabs((prevTabs) =>
        updateItems(prevTabs, menuId, (item) => {
          setActiveMenuItem(item);
        }),
      );
    },
    [tabs, pages, activeMenuItem],
  );

  const onLogout = useCallback(() => {
    axios
      .post('/api/auth/log-out', null, {
        withCredentials: true,
      })
      .then(() => {
        setLogOut(true);
      });
  }, [modulePath]);

  if (!user) {
    return <Redirect to={'/login'} />;
  }

  if (isNotValidAuth) {
    return <Redirect to={'/login'} />;
  }

  if (logOut) {
    mutate(null, false);
    return <Redirect to={'/login'} />;
  }

  return (
    <div>
      <ContentsWrap>
        <TopBar userNm={user.USER_NM} onLogOut={onLogout} modulePath={modulePath} />
        <LeftMenu
          showLeftMenu={showLeftMenu}
          onClickLeftMenu={onClickLeftMenu}
          onClickMenuItem={onClickMenuItem}
          dropMenuList={dropMenuList}
          activeMenuItem={activeMenuItem}
        />
        <AdminRightContents showLeftMenu={showLeftMenu}>
          <DropItems dropMenuList={dropMenuList} setEvent={sendEventHandler} />
          <Tab components={tabs} />
          <TabPage components={pages} />
        </AdminRightContents>
      </ContentsWrap>
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={2000}
        draggable={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default Workspace;
