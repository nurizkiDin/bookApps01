import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
  // CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import swal from 'sweetalert'
import axios from '../services/api'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const TheHeaderDropdown = () => {
  const history = useHistory()
  const user_info = JSON.parse(localStorage.getItem("user_info"))
  const token = JSON.parse(localStorage.getItem("token"))

  if(!user_info || !token) {
    localStorage.clear()
    history.push("/admin/login")
    
    return <></>
  }

  async function logout() {
    try {
      const response = await axios.post("/user/logout", null, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      swal(response.data.message)
      localStorage.clear()
      history.push("/admin/login")
    }
    catch(err) {
      localStorage.clear()
    }
  }

  async function logoutAll() {
    try {
      const response = await axios.post("/user/logout2", null, {
        headers: {
          Authorization: "Bearer " + token
        }
      })

      swal(response.data.message)
      localStorage.clear()
      history.push("/admin/login")
    }
    catch(err) {
      localStorage.clear()
    }
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CIcon name="cil-user" className="mfe-2" size='xl' />
          {/* <CImg
            src={'avatars/6.jpg'}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          /> */}
        </div>
        {user_info.userName}
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
        <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem onClick={logout}>
          <CIcon name="cil-bell" className="mfe-2" />
          Log Out
        </CDropdownItem>
        <CDropdownItem onClick={logoutAll}>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Log Out All Devices
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
