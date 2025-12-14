import React from 'react'
import Banner from '../Components/Banner'
import RecentScholarships from './../Components/RecentScholarships';
import FAQ from './../Components/FAQ';

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <RecentScholarships></RecentScholarships>
        <FAQ></FAQ>
    </div>
  )
}

export default Home