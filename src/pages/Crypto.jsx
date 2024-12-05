import React from 'react'
import { Outlet } from "react-router-dom"
import Filter from '../Components/Filter'
import TableComponent from '../Components/TableComponent'

export default function Crypto() {
  return (
    <section className=' w-[80%] h-full flex flex-col mt-16 mb-24 relative' >
      <Filter/>
      <TableComponent/>
      <Outlet />
    </section>
  )
}
