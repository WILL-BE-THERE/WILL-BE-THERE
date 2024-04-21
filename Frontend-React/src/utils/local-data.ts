import whoWeAreImage1 from '../assets/who-we-are-icon1.png'
import whoWeAreImage2 from '../assets/who-we-are-icon2.png'
import whoWeAreImage3 from '../assets/who-we-are-icon3.png'
import whoWeAreImage4 from '../assets/who-we-are-icon4.png'

import testmonialImage1 from '../assets/testmonial-icon1.png'
import testmonialImage2 from '../assets/testmonial-icon2.png'
import testmonialImage3 from '../assets/testmonial-icon3.png'
import testmonialImage4 from '../assets/testmonial-icon4.png'
import testmonialImage5 from '../assets/testmonial-icon5.png'
import testmonialImage6 from '../assets/testmonial-icon6.png'

import featureImage1 from '../assets/features-icon1.png'
import featureImage2 from '../assets/features-icon2.png'
import featureImage3 from '../assets/features-icon3.png'
import featureImage4 from '../assets/features-icon4.png'

export const menuData = [
  { title: 'Home', link: '/' },
  { title: 'Events', link: '/events' },
  // { title: 'About', link: '/about' },
  // { title: 'Contact', link: '/contact' },
  // { title: 'FAQs', link: '/faqs' },
] as const

export const whoWeAreData = [
  {
    title: 'Simplifying event planning',
    img: whoWeAreImage1,
    text: 'We are passionate about simplifying event management for organizers and enhancing the experience for attendees. We understand the challenges of planning and executing successful events, which is why we have developed a comprehensive platform to streamline the entire process',
  },
  {
    title: 'Dedicated professionals',
    img: whoWeAreImage2,
    text: 'Our team is comprised of dedicated professionals with extensive experience in event planning, technology, and user experience design. We are committed to providing innovative solutions that empower organizers to create, track, and manage their events efficiently, while ensuring a seamless RSVP experience for attendees.',
  },
  {
    title: 'Intuitive tools and features',
    img: whoWeAreImage3,
    text: 'With Will Be There, event organizers have access to intuitive tools and features that enables them to customize event details, track RSVPs, manage guest lists, and communicate effectively with attendees. Our user friendly interface and robust functionality make event planning effortless and enjoyable.',
  },
  {
    title: 'Easy RSVP process',
    img: whoWeAreImage4,
    text: 'For attendees, Will Be There offers a hassle-free RSVP process, allowing them to easily discover events. RSVP with just a few clicks, and stay updated on event details and notifications. We strive to enhance the event experience for all attendees, whether they are attending a small gathering or a large-scale conference.',
  },
] as const

export const testmonialData = [
  {
    desc: 'Will Be There has transformed the way we plan and manage events. It is intuitive, effecient, and has all the features we need to ensure our events are a success.',
    img: testmonialImage1,
    name: 'Sarah Johnson',
    occupation: 'Event manager, YM Capital',
  },
  {
    desc: 'I love how easy it is to RSVP for events using Wil Be There. The process is seamless, and I always know exactly what to expect when attending an event.',
    img: testmonialImage2,
    name: 'John Yuri',
    occupation: 'Attendee',
  },
  {
    desc: 'Thanks to Will Be There, we have been able to increase attendance at our events and improve engagement with our attendees. It has become an invaluable tool for our organization.',
    img: testmonialImage3,
    name: 'Jessica',
    occupation: 'Event coordinator, Mana Nomads',
  },
  {
    desc: 'The analytics and insights provided by Will Be There have been instrumental in helping us understand attendee behavior and optimize our events strategy.',
    img: testmonialImage4,
    name: 'Micheal Ibrahimovic',
    occupation: 'Marketing director, Yala',
  },
  {
    desc: 'I appreciate the attention to detail and security measures implemented by Will Be There. Knowing that our event data is safe and secure gives us peace of mind',
    img: testmonialImage5,
    name: 'David',
    occupation: 'Events organizer',
  },
  {
    desc: 'It is user-friendly, feature-rich, and has simplified every aspect of event planning for me. I highly recommend it to anyone looking to take their events to the next level',
    img: testmonialImage6,
    name: 'Emily',
    occupation: 'Event organizer, IMB securities',
  },
] as const

export const featureData = [
  {
    title: 'Events creation',
    img: featureImage1,
    desc: 'Effortlessly create and customize events with our intuitive event creation tool. Add event details, dates, locations, and more in just a few clicks.',
  },
  {
    title: 'RSVP management',
    img: featureImage2,
    desc: 'Track RSVPs and manage guest lists seamlessly with our comprehensive RSVP management system. Stay organized and informed at every stage of your event.',
  },
  {
    title: 'Discover events',
    img: featureImage3,
    desc: 'Explore a wide rage of events tailored to your interests and preferences. From local meetups to global conferences, find the perfect events to attend with ease.',
  },
  {
    title: 'Communication tools',
    img: featureImage4,
    desc: 'Engage with attenddees effectively using our built-in communication tools. Send event updates, reminders, and notifications to keep everyone in the loop.',
  },
] as const
