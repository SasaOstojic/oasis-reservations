import React from 'react'
import Stat from './Stat'
import {HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar} from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers';

export default function Stats({bookings, confirmedStays, numDays, cabinCount}) {
    //1. Number of bookings
    const numBookings = bookings.length;
    //2. Number of sales
    const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice,0 )
    //3. Check ins
    const checkins = confirmedStays.length;
    //4.Occupation rate
    const occupation = confirmedStays.reduce((acc,curr) => acc + curr.numNights, 0) / numDays * cabinCount;


  return <>
    <Stat value={numBookings} title="Bookings" icon={<HiOutlineBriefcase/>} color='blue'></Stat>
    <Stat value={formatCurrency(sales)} title="Sales" icon={<HiOutlineBanknotes/>} color='green'></Stat>
    <Stat value={checkins} title="Check ins" icon={<HiOutlineCalendarDays/>} color='indigo'></Stat>
    <Stat value={Math.round(occupation * 100) + '%'} title="Occupancy rate" icon={<HiOutlineChartBar/>} color='yellow'></Stat>
  </>
    
  
}
