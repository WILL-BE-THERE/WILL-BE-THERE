import { FaArrowRight } from 'react-icons/fa'
import logoWhite from '../assets/logo-white.png'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaXTwitter,
} from 'react-icons/fa6'

// Legal links in the footer
const legalLinks = [
  { text: 'Terms of service', link: '#terms-of-service' },
  { text: 'Privacy policy', link: '#privacy-policy' },
  { text: 'Cookie policy', link: '#cookie-policy' },
]

// Product links in the footer
const productLinks = [
  { text: 'Trending Event', link: '#trending-event' },
  { text: 'Pricing', link: '#pricing' },
  { text: 'Changelog', link: '#changelog' },
]

// Company links in the footer
const companyLinks = [
  { text: 'Events', link: '/events' },
  { text: 'About us', link: '/about' },
  { text: 'FAQ', link: '/faqs' },
  { text: 'Contact us', link: '/contact' },
]

// social media handles in the footer
const socials = [
  { icon: <FaFacebook />, link: '#facebook-page' },
  { icon: <FaInstagram />, link: '#instagram-page' },
  { icon: <FaLinkedin />, link: '#linkedin-page' },
  { icon: <FaSnapchat />, link: '#snapchat-page' },
  { icon: <FaXTwitter />, link: '#twitter-page' },
]

const Footer = () => {
  return (
    <footer className={`bg-primary-100 pt-20 relative z-10`}>
      <section className="w-[90%] grid grid-cols-2 justify-between m-auto gap-y-16 sm:w-[95%] sm:grid-cols-4 lg:flex lg:w-[85%] lg:gap-y-0">
        <div className="w-28 h-10 grid-cols-subgrid col-span-2 sm:col-span-1">
          <img
            src={logoWhite}
            alt="Company logo white color"
            className="w-full h-full"
          />
        </div>

        <FooterLinks header="Product" data={productLinks} />

        <FooterLinks header="Company" data={companyLinks} />

        <FooterLinks header="Legal" data={legalLinks} />

        <aside className="grid-cols-subgrid col-span-2 w-full bg-[#d0d0d0]/70 rounded-md h-fit py-4 px-6 text-white flex flex-col gap-4 lg:col-span-1 lg:w-[25rem]">
          <h1 className="text-xl font-semibold">Subscribe to our newsletter</h1>
          <p className="text-sm font-light">
            Stay in the loop! Subscribe now for exclusive access to firsthand
            event updates, news, and special offers. Don't miss out - be the
            first to know!
          </p>
          <label
            htmlFor="email"
            className="w-full bg-white h-12 rounded-md px-3 flex items-center justify-between mb-2 mt-2"
          >
            <input
              type="email"
              name="email"
              placeholder="gizkidesign@gmail.com"
              className="text-sm"
            />
            <button
              type="button"
              className="flex items-center gap-3 text-white bg-primary-100 text-sm py-2 px-5 rounded-md group"
            >
              Sign up
              <FaArrowRight className=" group-hover:translate-x-1 transition-all hidden sm:block" />
            </button>
          </label>
        </aside>
      </section>

      <article className="bg-white py-12 mt-20 flex justify-between items-center sm:py-5">
        <div className="w-[90%] flex justify-between m-auto  flex-col gap-y-8 items-center sm:items-start sm:gap-y-0 sm:flex-row sm:w-[95%] lg:w-[85%]">
          <p className="text-[#8E8E8E] text-sm capitalize">
            will be there &copy; 2024
          </p>
          <ul className="flex gap-10 items-center">
            {socials.map((social, i) => {
              return (
                <li key={i} className="group">
                  <a
                    href={social.link}
                    className="block group-hover:scale-125 transition-all"
                  >
                    {social.icon}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </article>
    </footer>
  )
}

type FooterLinksProps = {
  header: string
  data: { text: string; link: string }[]
}

function FooterLinks({ header, data }: FooterLinksProps) {
  return (
    <div className="text-white">
      <h1 className="font-bold">{header}</h1>
      <ul className="mt-4 flex flex-col gap-3 text-sm font-normal">
        {data.map((item, i) => {
          return (
            <li key={i} className="group">
              <a
                href={item.link}
                className="block group-hover:translate-x-2 transition-all"
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Footer
