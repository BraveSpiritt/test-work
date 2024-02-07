import CommonTable from '../common/Table'
import { ProductsData } from '../../fakeDb'

function Products() {
  return (
    <div>
        <CommonTable data={ProductsData} />
    </div>
  )
}

export default Products