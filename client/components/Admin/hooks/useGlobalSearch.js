import commonApi from '@/api/common'
import { USER_ROLE_TYPE } from '@/utils/constant'
import { useEffect, useState } from 'react'
const useGlobalSearch = () => {
  const [data, setData] = useState([])
  const [inputForm, setInputForm] = useState('')

  const getInitialSideBarData = async searchVal => {
    if (!searchVal) {
      setData()
      return
    }
    const data = {
      roles: [
        USER_ROLE_TYPE.OWNER,
        USER_ROLE_TYPE.SUB_OWNER,
        USER_ROLE_TYPE.CHIROPRACTOR,
        USER_ROLE_TYPE.STAFF,
        USER_ROLE_TYPE.NURSE,
        USER_ROLE_TYPE.PATIENT,
      ],
      search: searchVal,
    }
    await commonApi({
      action: 'globalSearch',
      data,
    }).then(async ({ DATA = {} }) => {
      setData(DATA)
    })
  }
  useEffect(() => {
    getInitialSideBarData(inputForm)
  }, [inputForm])

  return {
    data,
    setInputForm,
    inputForm,
  }
}

export default useGlobalSearch
