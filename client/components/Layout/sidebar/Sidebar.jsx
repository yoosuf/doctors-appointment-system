import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import routes from '@/utils/routes';
import { useRouter } from 'next/router';
import useSidebar from '@/hooks/sidebar/useSidebar';
import { sidebarLogoUrl } from '@/utils/helper';
import { getUser } from '@/utils/localStorage';
import { USER_ROLE_TYPE } from '@/utils/constant';
import EventManage from 'icons/EventManage';
import WaitIcon from 'icons/WaitIcon';
import ManageUser from 'icons/ManageUser';
import StaffIcon from 'icons/StaffIcon';
import SettingIcon from 'icons/SettingIcon';
import MasterIcon from 'icons/MasterIcon';
import HomeIcon from 'icons/HomeIcon';
import RespSide from 'icons/RespSide';

const activeSidebar =
  'sidebar-menu-icon h-10 w-10 mt-3 transition hover:bg-gray-800 flex items-center justify-center rounded-lg active';

const sidebar =
  'sidebar-menu-icon h-10 w-10 mt-3 transition hover:bg-gray-800 flex items-center justify-center rounded-lg';

const menuItems = [
  {
    path: routes.dashboard,
    icon: <HomeIcon />,
    condition: (code) =>
      ![USER_ROLE_TYPE.CHIROPRACTOR, USER_ROLE_TYPE.STAFF, USER_ROLE_TYPE.NURSE].includes(code),
  },
  {
    path: routes.eventAndAppointmentList,
    icon: <EventManage />,
    condition: (code) =>
      ![USER_ROLE_TYPE.CHIROPRACTOR, USER_ROLE_TYPE.STAFF, USER_ROLE_TYPE.NURSE].includes(code),
  },
  {
    path: routes.deskWaitlist,
    icon: <WaitIcon />,
    condition: (code) =>
      [USER_ROLE_TYPE.CHIROPRACTOR, USER_ROLE_TYPE.STAFF, USER_ROLE_TYPE.NURSE].includes(code),
  },

  {
    path: routes.deskCustomers,
    icon: <ManageUser />,
    condition: (code) =>
      [USER_ROLE_TYPE.CHIROPRACTOR, USER_ROLE_TYPE.STAFF, USER_ROLE_TYPE.NURSE].includes(code),
  },

  // 
  {
    path: routes.manageCustomer,
    icon: <ManageUser />,
    condition: (code) =>
    [USER_ROLE_TYPE.SUPER_ADMIN].includes(code),
  },
  {
    path: routes.manageOwner,
    icon: <StaffIcon />,
    condition: (code) =>
      ![USER_ROLE_TYPE.CHIROPRACTOR, USER_ROLE_TYPE.STAFF, USER_ROLE_TYPE.NURSE].includes(code),
  },
  {
    path: routes.setting,
    icon: <SettingIcon />,
  },
  {
    path: routes.masterAdmin,
    icon: <MasterIcon />,
    condition: (code) =>
      [USER_ROLE_TYPE.SUPER_ADMIN].includes(code),
  },
];

const Sidebar = () => {
  const router = useRouter();
  const { userManagementTab } = useSidebar();
  const [code, setCode] = useState();
  const [isRespSidebarActive, setRespSidebarActive] = useState(false);

  useEffect(() => {
    const { roleId = {} } = getUser();
    setCode(roleId.code);
  }, []);

  const toggleRespSidebar = () => {
    setRespSidebarActive(!isRespSidebarActive);
  };

  return (
    <>
      <div
        className={`sidebar p-5 bg-primary border-r border-gray-500 inline-block h-screen overflow-y-auto ${
          isRespSidebarActive ? 'active' : ''
        }`}
      >
        <Link href={routes.dashboard}>
          <a className="sidebar-logo">
            <Image height="42" width="32" src={sidebarLogoUrl} alt="SnapCrack" />
          </a>
        </Link>
        <div className="mt-10 sidebar-menu">
          {menuItems.map((item, index) => {
            if (item.condition && !item.condition(code)) {
              return null;
            }
            return (
              <Link key={index} href={item.path}>
                <a
                  className={router.pathname === item.path ? activeSidebar : sidebar}
                >
                  {item.icon}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <Link href="#">
        <a
          onClick={toggleRespSidebar}
          className="responsive-sidebar-icon shadow bg-yellowBg rounded-r-lg fixed top-44 px-2 py-1.5 sm:hidden block"
        >
          <RespSide />
        </a>
      </Link>
    </>
  );
};

export default React.memo(Sidebar);
