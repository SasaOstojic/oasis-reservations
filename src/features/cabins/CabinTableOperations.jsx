import React from 'react'
import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

export default function CabinTableOperations() {
  return (
    <TableOperations>
        <Filter filterField='discount' options={
            [{
                value: 'all', label: 'All'
            },
            {
                value: 'no-discount', label: 'No discount'
            },
            {
                value: 'with-discount', label: 'With discount'
            },
        ]
        }/>

        <SortBy options={
            [{
                value: 'name-as', label: 'Sort by name from (A-Z)'
            },
            {
                value: 'name-desc', label: 'Sort by name from (Z-A)'
            },
            {
                value: 'regularPrice-asc', label: 'Sort by price (Low First)'
            },
            {
                value: 'regularPrice-desc', label: 'Sort by price (High First)'
            },
            {
                value: 'maxCapacity-asc', label: 'Sort by capacity (Low First)'
            },
            {
                value: 'maxCapacity-desc', label: 'Sort by capacity (High first)'
            },
            ]
        }/>
    </TableOperations>
  )
}
