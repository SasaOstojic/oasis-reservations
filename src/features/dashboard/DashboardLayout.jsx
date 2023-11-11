import React from 'react'
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from './useRecentStays';
import {useCabins} from '../cabins/useCabins'
import TodayActivity from '../check-in-out/TodayActivity';
import styled from "styled-components";
import Spinner from '../../ui/Spinner'
import Stats from './Stats';
import SalesChart from './SalesChart';
import DurationChart from './DurationChart';

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;


export default function DashboardLayout() {

  const {bookings, isLoading: isLoadingBookings, numDays} = useRecentBookings();
  const {isLoading: isLoadingStays, stays, confirmedStays} = useRecentStays();
  const {cabins, isLoading: isCabinsLoading} = useCabins();


  if(isLoadingBookings || isLoadingStays) return <Spinner/>

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length}>Statistics</Stats>
      <TodayActivity/>
      <DurationChart confirmedStays={confirmedStays}/>
      <SalesChart bookings={bookings} numDays={numDays}/>
    </StyledDashboardLayout>
  )
}

