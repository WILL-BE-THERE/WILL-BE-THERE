import React from 'react'
import {
  BrandSection,
  HeroSection,
  OurFeatures,
  Testimonial,
  Title,
  WhoWeAreSection,
} from '../pages/landing page components/main'
import { featureData, testmonialData, whoWeAreData } from '../utils/local-data'
import downloadMobileVersionImage from '../assets/download-icons.png'
import iphonImage from '../assets/iphone-pic.png'
import GetStartedButton from '../components/Buttons/GetStartedButton'

const Home = () => {
  return (
    <div className="bg-[#f6f8fe]">
      <HeroSection />
      <BrandSection />
      <section className="w-[90%] mx-auto flex flex-col gap-8 pb-32 lg:w-[68%]">
        <Title text="Who We Are" />
        <p className="w-full mx-auto text-sm font-medium text-neutral-200 text-center sm:w-[70%]">
          At Will Be There, we're dedicated to revolutionizing the way events
          are planned, managed, and attended. Join us in creating memorable and
          successful events, every step of the way.
        </p>
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
          {whoWeAreData.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <WhoWeAreSection {...item} />
              </React.Fragment>
            )
          })}
        </div>
      </section>

      <section className="bg-white">
        <div className="w-[90%] mx-auto flex flex-col gap-8 pb-32 lg:w-[80%]">
          <Title text="Testimonials" />
          <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {testmonialData.map((item, i) => {
              return (
                <React.Fragment key={i}>
                  <Testimonial {...item} />
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white pb-32">
        <article className="w-[90%] mx-auto flex flex-col gap-8 lg:w-[68%]">
          <Title text="Stay in the loop with our mobile app" />
          <p className="w-full mx-auto text-sm font-medium text-neutral-200 text-center sm:w-[70%]">
            At Will Be There, we're dedicated to revolutionizing the way events
            are planned, managed, and attended. Join us in creating memorable
            and successful events, every step of the way.
          </p>
          <div className="w-full flex justify-center">
            <img
              src={downloadMobileVersionImage}
              alt="google play and apple store images"
            />
          </div>
          <div className="">
            <img src={iphonImage} alt="Iphone image" />
          </div>
        </article>
      </section>

      <section className="w-[90%] mx-auto flex flex-col gap-8 pb-32 lg:w-[68%]">
        <Title text="Our Features" />
        <p className="w-full mx-auto text-sm font-medium text-neutral-200 text-center sm:w-1/2">
          Discover the powerful features that makes Will Be There the ultimate
          solution for event organizers and attendees
        </p>
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2">
          {featureData.map((item, i) => {
            return (
              <React.Fragment key={i}>
                <OurFeatures {...item} />
              </React.Fragment>
            )
          })}
        </div>
      </section>

      <section className="h-[30rem] bg-white flex items-center justify-center sm:h-[25rem]">
        <div className="w-[90%] mx-auto flex flex-col text-center lg:w-[60%]">
          <h1 className="text-2xl font-semibold">
            Ready to take your <br />
            events to the next level?
          </h1>
          <p className="text-sm text-neutral-200 font-medium w-full mx-auto mt-5 sm:w-4/5">
            Join thousands of event organizers and attendees who trust us for
            seamless event management an unforgettable experiences. Whether you
            are planning an event or looking for your next great gathering,
            we've got you covered.
          </p>
          <div className="mt-10">
            <GetStartedButton />
          </div>
        </div>
      </section>
    </div>
  )
}
export default Home
