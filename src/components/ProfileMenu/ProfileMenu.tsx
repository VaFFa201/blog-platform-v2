/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'

import styles from './ProfileMenu.module.scss'

interface MenuProps {
  isVisible: boolean
}

const ProfileMenu: React.FC<MenuProps> = ({ isVisible }) => {
  const [visible, setVisible] = useState(isVisible)

  return (
    <Menu>
      <Menu.Item>
        <Button type="link">
          <NavLink to="/edit-profile">Редактировать профиль</NavLink>
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link">Выход</Button>
      </Menu.Item>
    </Menu>
  )
}

export default ProfileMenu
