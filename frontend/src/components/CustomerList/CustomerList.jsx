import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getCustomerList } from "../../redux/customers-reducer"
import { Input } from "../common/FormsControls/FormsControls";

const CustomerList = ({ customers }) => {
  if(!customers)
    return <h3>No customers available</h3>

  return <div>
      {customers && customers.map(c => <CustomersListItem key={"customer_" + c.id} customer={c} />)}
    </div>
}

const CustomersListItem = ({ customer }) => {
  return <div className="customerListRow">
    {customer.name}
  </div>
}

const CustomerListContainer = ({ list, getCustomerList }) => {
  let [newCustomerFormEnabled, setNewCustomerFormEnabled] = useState(false)
  useEffect(() => {
    getCustomerList()
  }, [])

  return <div>
      {!newCustomerFormEnabled && 
        <button onClick={() => setNewCustomerFormEnabled(true)}>Add new Customer</button>
      }
      {newCustomerFormEnabled && <NewCustomerForm />}
      <CustomerList customers={list} />
    </div>
}

const NewCustomerForm = ({ formik, saveCustomer }) => {
  return <form onSubmit={formik.handleSubmit}>
      <Input type="text" name="name"/>

    </form>
}

let mapStateToProps = (state) => ({ list: state.customers.list })

export default compose(
  connect(mapStateToProps, { getCustomerList })
)(CustomerListContainer)