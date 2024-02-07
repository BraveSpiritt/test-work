import { PagesData } from "../../fakeDb";
import CommonTable from "../common/Table";

function Pages() {
  return <div>
    <CommonTable data={PagesData} />
  </div>;
}

export default Pages;
