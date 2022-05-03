import { NavLink } from 'react-router-dom'

import './Sidebar.css'
import addIcon from '../assets/add_icon.svg'
import dashboardIcon from '../assets/dashboard_icon.svg'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-content">
        <div className="user">
          {/* avatar and username */}
          <p>Hey user</p>
        </div>
        <nav className="links">
          <ul>
            <li>
              <NavLink to={'/'} exact>
                <img src={dashboardIcon} alt="Dashboard Icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={'/create'}>
                <img src={addIcon} alt="Add project Icon" />
                <span>New Poject</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}