import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CWidgetIcon,
  CWidgetBrand
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import axios from '../../services/api'

const Dashboard = () => {
  const token = JSON.parse(localStorage.getItem("token"))
  const [ data, setData ] = useState([])
  const history = useHistory()

  const forceRedirect = () => {
    localStorage.clear()
    history.push("/admin/login")
  }
  async function getData() {
    try {
      let { data } = await axios.get("/dashboard/read", {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      setData(data)
    }
    catch(err) {
      if(err.response.status === 500) {
        forceRedirect()
      }
    }
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <>
    <CRow>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total item" header={data ? data.item : 0} color="primary">
          <CIcon width={24} name="cil-tags"/>
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Total booked" header={data ? data.booked : 0} color="info">
          <CIcon width={24} name="cil-task"/>
        </CWidgetIcon>
      </CCol>
      <CCol xs="12" sm="6" lg="3">
        <CWidgetIcon text="Booking on process" header={data ? data.process : 0} color="warning">
          <CIcon width={24} name="cil-moon"/>
        </CWidgetIcon>
      </CCol>
      
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="twitter"
          rightHeader={data ? data.accept : 0}
          rightFooter="Accept"
          leftHeader={data ? data.reject : 0}
          leftFooter="Reject"
        >
          <CIcon
            name="cil-task"
            height="48"
            className="my-4"
          />
        </CWidgetBrand>
      </CCol>
    </CRow>
    </>
  )
}

export default Dashboard
