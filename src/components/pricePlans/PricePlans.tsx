import React from 'react'
import CommonTable from '../common/Table'
import { PricePlansData } from '../../fakeDb'
function PricePlans() {
  return (
    <div>
        <CommonTable data={PricePlansData} />
    </div>
  )
}

export default PricePlans