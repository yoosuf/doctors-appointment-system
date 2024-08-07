import commonApi from '@/api/common'
import { MASTER_CODE } from '@/utils/constant'
import { useState } from 'react'
import { getTempToken } from '@/utils/localStorage'

const allData = {
  query: {
    // isDeleted: false,
  },
  options: {
    select: [],
    sort: {
      createdAt: -1,
    },
  },
}

const useDropdown = () => {
  // DropDown State
  const [prefixOptionsData, setPrefixOptionsData] = useState([])
  const [prefixData, setPrefixData] = useState()

  const [genderOptionsData, setGenderOptionsData] = useState([])
  const [genderData, setGenderData] = useState()


  const [cityOptionsData, setCityOptionsData] = useState([])

  const [stateOptionsData, setStateOptionsData] = useState([])

  const [postalOptionsData, setPostalOptionsData] = useState([])

  const [locationOptionsData, setLocationOptionsData] = useState([])

  const [countryOptionsData, setCountryOptionsData] = useState([])
  // const [genderData, setGenderData] = useState()


  const [selectedPrefixValue, setSelectedPrefixValue] = useState({})
  const [selectedGenderValue, setSelectedGenderValue] = useState({})
  const [selectedCityValue, setSelectedCityValue] = useState({})
  const [selectedStateValue, setSelectedStateValue] = useState({})
  const [selectedPostalValue, setSelectedPostalValue] = useState({})
  const [membershipOptionsData, setMembershipOptionsData] = useState([])
  const [selectedMembershipValue, setSelectedMembershipValue] = useState([])

  const getAllMasterData = async () => {
    const data = {
      query: {
        parentId: {
          $exists: false,
        },
        $or: [
          {
            code: MASTER_CODE.PREFIX,
          },
          {
            code: MASTER_CODE.GENDER,
          },
        ],
        isActive: true,
      },
      options: {
        select: [],
      },
    }
    const temp = getTempToken()
    await commonApi({
      action: 'findMaster',
      data,
      config: { tempToken: temp },
    }).then(async ({ DATA = {} }) => {
      const { data = [] } = DATA
      const prefixData =
        data && data.find((d = {}) => d.code === MASTER_CODE.PREFIX)
      setPrefixData(prefixData?.id)
      const genderData =
        data && data.find((d = {}) => d.code === MASTER_CODE.GENDER)

      setGenderData(genderData?.id)
    })
  }

  const loadOptionsPrefix = async (inputValue, callback) => {
    const data = {
      query: {
        parentId: prefixData,
        parentCode: MASTER_CODE.PREFIX,
      },
      options: {
        select: [],
        sort: {
          createdAt: -1,
        },
      },
    }

    const searchData = {
      query: {
        parentId: prefixData,
        parentCode: MASTER_CODE.PREFIX,
        $or: [
          {
            name: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }

    const sendData = inputValue === undefined ? data : searchData

    await commonApi({
      action: 'findMaster',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const prefix = DATA.data
      const prefixData = prefix?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setPrefixOptionsData(prefixData)
      callback?.(prefixData)
    })
  }

  const loadOptionsMembership = async (inputValue, callback) => {
    await commonApi({
      action: 'findMembership',
      data: {
        query: {
          isDeleted: false,
        },
        options: {
          select: [],
          sort: {
            createdAt: -1,
          },
        },
      },
    }).then(({ DATA = {} }) => {
      const gender = DATA.data
      const genderData = gender?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setMembershipOptionsData(genderData)
      callback?.(genderData)
    })
  }

  const loadOptionsGender = async (inputValue, callback) => {
    const data = {
      query: {
        parentId: genderData,
        parentCode: MASTER_CODE.GENDER,
      },
      options: {
        select: [],
      },
    }

    const searchData = {
      query: {
        parentId: genderData,
        parentCode: MASTER_CODE.GENDER,
        $or: [
          {
            name: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }

    const sendData = inputValue === undefined ? data : searchData
    const temp = getTempToken()

    await commonApi({
      action: 'findMaster',
      data: sendData,
      config: { tempToken: temp },
    }).then(({ DATA = {} }) => {
      const gender = DATA.data
      const genderData = gender?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))

      if (inputValue) {
        callback?.(genderData)
      } else {
        setGenderOptionsData(genderData)
      }
    })
  }

  // City, State and Postal Dropdown API Function
  const loadOptionsCity = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        $or: [
          {
            name: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }

    const sendData = inputValue === undefined ? allData : data
    const temp = getTempToken()
    await commonApi({
      action: 'findCity',
      data: sendData,
      config: { tempToken: temp },
    }).then(({ DATA = {} }) => {
      const city = DATA.data
      const cityData = city?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setCityOptionsData(cityData)
      callback?.(cityData)
    })
  }

  const loadOptionsState = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        $or: [
          {
            name: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }
    const sendData = inputValue === undefined ? allData : data
    const temp = getTempToken()
    await commonApi({
      action: 'findState',
      data: sendData,
      config: { tempToken: temp },
    }).then(({ DATA = {} }) => {
      const state = DATA.data
      const stateData = state?.map((data = {}) => ({
        value: data.id,
        label: data.name,
      }))
      setStateOptionsData(stateData)
      callback?.(stateData)
    })
  }

  const loadOptionsPostal = async (inputValue, callback) => {
    const data = {
      query: {
        isDeleted: false,
        $or: [
          {
            postalCode: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }
    const sendData = inputValue === undefined ? allData : data
    const temp = getTempToken()
    await commonApi({
      action: 'findPostal',
      data: sendData,
      config: { tempToken: temp },
    }).then(({ DATA = {} }) => {
      const postal = DATA.data
      const postalData = postal?.map((data = {}) => ({
        value: data.id,
        label: data.postalCode,
      }))
      setPostalOptionsData(postalData)

      callback?.(postalData)
    })
  }


 


  const loadOptionsLocation = async (inputValue, callback = () => {}) => {
    const data = {
      query: {
        // isDeleted: false,
        $or: [
          {
            locationName: {
              $regex: inputValue,
              $options: 'i',
            },
          },
        ],
      },
      options: {
        select: [],
        pagination: false,
      },
    }
    const sendData = inputValue === undefined ? allData : data
    await commonApi({
      action: 'findLocation',
      data: sendData,
    }).then(({ DATA = {} }) => {
      const location = DATA.data

      const locationData = location?.map((data = {}) => ({
        value: data.id,
        label: data.locationName,
      }))
      setLocationOptionsData(locationData)
      callback(locationData)
    })
  }

  return {
    genderOptionsData,
    membershipOptionsData,
    genderData,
    locationOptionsData,
    // Set State
    setLocationOptionsData,
    setGenderOptionsData,
    setMembershipOptionsData,
    // Dropdown Method
    getAllMasterData,
    loadOptionsGender,
    loadOptionsMembership,
    // Dropdown Value
    selectedGenderValue,
    selectedMembershipValue,
    setSelectedGenderValue,
    setSelectedMembershipValue,
  }
}

export default useDropdown
