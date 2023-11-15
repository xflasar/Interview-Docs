import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from './components/table.tsx'
import './App.css'

// TODO:
// - Flatten data
// - Format data to fit easily into divs and table rows
// - Add sorting
// - Add searching (useMemo/useDebouncer -> basically make a delay in search)

interface UserData {
  location: {
    street: {
      number: number;
      name: string;
    }
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    }
    timezone: {
      offset: string;
      description: string;
    }
  }
}

interface FormattedData {
  city: string;
  state: string;
  number: number;
  name: string;
  country: string;
  postcode: number;
  latitude: string;
  longitude: string;
}

function FormatData(data: UserData[]): FormattedData[]{
  return data.map((person) => {
    const { city, state, street, country, postcode, coordinates} = person.location
    const { latitude, longitude } = coordinates
    const {number, name} = street
    
    return {
      city,
      state,
      number,
      name,
      country,
      postcode,
      latitude,
      longitude
    }
  })
}

function App() {
  const [data, setData] = useState<FormattedData[]>([])
  const fetchData = async () => {
    return await axios.get('https://randomuser.me/api/?results=20')
    .then((res) => {
      if (res.data) {
        setData(FormatData(res.data.results))
      }
    })
    .catch((err) => {
      console.error(err)
      return null
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Table data={data} />
    </>
  )
}

export default App
