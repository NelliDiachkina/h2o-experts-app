import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import css from './UserBarPopover.module.css';
import LogOutModal from '../../components/LogOutModal/LogOutModal.jsx';
import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal.jsx';
import { CiSettings } from 'react-icons/ci';
import { IoIosLogOut } from 'react-icons/io';

const UserBarPopover = React.forwardRef(({ onClose }, popoverRef) => {
  const { t } = useTranslation();
  const [isOpenLogOut, setIsOpenLogOut] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(false);

  const handleLogoutClick = e => {
    e.stopPropagation();
    setIsOpenLogOut(true);
  };

  const handleSettingsClick = e => {
    e.stopPropagation();
    setIsOpenSettings(true);
  };

  return (
    <div className={css.userBarPopover} ref={popoverRef}>
      <button
        className={css.popoverButton}
        onClick={handleSettingsClick}
        aria-haspopup="dialog"
        aria-label={t('userBarPopover.setting')}
      >
        <CiSettings />
        <span>{t('userBarPopover.setting')}</span>{' '}
      </button>
      <button
        className={css.popoverButton}
        onClick={handleLogoutClick}
        aria-haspopup="dialog"
        aria-label={t('userBarPopover.logout')}
      >
        <IoIosLogOut />
        <span>{t('userBarPopover.logout')}</span>{' '}
      </button>

      {isOpenSettings && (
        <UserSettingsModal
          modalIsOpen={isOpenSettings}
          onClose={() => {
            setIsOpenSettings(false);
            onClose();
          }}
        />
      )}
      {isOpenLogOut && (
        <LogOutModal
          modalIsOpen={isOpenLogOut}
          closeModal={() => {
            setIsOpenLogOut(false);
            onClose();
          }}
        />
      )}
    </div>
  );
});

UserBarPopover.displayName = 'UserBarPopover';

export default UserBarPopover;
