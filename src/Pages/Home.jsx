import React from 'react'
import Banner from '../Components/Banner'
import TopScholarships from './../Components/TopScholarships';
import FAQ from './../Components/FAQ';
import TestimonialSection from "../Components/TestimonialSection"


const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <TopScholarships></TopScholarships>
        <TestimonialSection></TestimonialSection>
        <FAQ></FAQ>
    </div>
  )
}

export default Home