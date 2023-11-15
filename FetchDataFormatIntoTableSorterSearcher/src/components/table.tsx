import { useEffect, useState, useRef } from 'react';
import '../assets/css/table.css'

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

interface TableProps {
  data: FormattedData[]
}

const Table: React.FC<TableProps> = ({data}) => {
  const [filteredData, setFilteredData] = useState<FormattedData[]>()

  const timer: any = useRef()

  const searchDebounce = (handleSearch: any, delay: number) => {
    return function (s: string) {
      clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        handleSearch(s)
      }, delay)
    }
  }

  function search(s: string) {
    if(s) {
      setFilteredData(data?.filter((row: any) => JSON.stringify(row).includes(s)))
    } else {
      setFilteredData(data)
    }
  }
  const debouncedSearch = searchDebounce((s: string) => search(s), 500)
  
  const handleSearchTermOnChange = (e: any) => {
    debouncedSearch(e.target.value)
  }

  useEffect(() => {
    setFilteredData(data)
  }, [data])

  return (
      <>
        <div>
          <input type="text" placeholder="Search" onChange={(e) => handleSearchTermOnChange(e)} />
        </div>
        <div className="table">
          <div className="header">
            <div className="header-item">City</div>
            <div className="header-item">State</div>
            <div className="header-item">Country</div>
            <div className="header-item">Postcode</div>
            <div className="header-item">Number</div>
            <div className="header-item">Name</div>
            <div className="header-item">Latitude</div>
            <div className="header-item">Longitude</div>
          </div>

          {filteredData && (filteredData.map((person, personIndex) => {
            return (
              <div key={personIndex} className="row">
              <div className="location-item">{person.city}</div>
              <div className="location-item">{person.state}</div>
              <div className="location-item">{person.country}</div>
              <div className="location-item">{person.postcode}</div>
              <div className="location-item">{person.number}</div>
              <div className="location-item">{person.name}</div>
              <div className="location-item">{person.latitude}</div>
              <div className="location-item">{person.longitude}</div>
            </div>)
          }))}
        </div>
    </>
  )
}

export default Table