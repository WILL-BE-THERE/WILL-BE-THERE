import { Link } from 'react-router-dom'
import successfulIcon from '../assets/successful-icon.png'

import { QRCodeSVG } from 'qrcode.react'

const RsvpSuccessful = ({ eventName, rsvpData }: { eventName?: string, rsvpData?: any }) => {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-[#B5B5B5]/80 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-md w-[90%] max-w-md my-8 flex flex-col items-center shadow-2xl">
        <div className="w-20 mb-4">
          <img src={successfulIcon} alt="Icon for successful" className="w-full" />
        </div>

        <h1 className="text-xl font-bold text-gray-800">RSVP Successful!</h1>
        <p className="text-center text-sm text-gray-500 mt-2 mb-6 font-medium px-2">
          You and your plus-ones are confirmed for {eventName ? `"${eventName}"` : 'the event'}.
          Show the codes below at the entrance.
        </p>

        <div className="w-full space-y-6 max-h-[25rem] overflow-y-auto px-2 py-1 scrollbar-thin">
          {/* Primary Guest */}
          <div className="flex flex-col items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-[10px] font-bold text-primary-100 uppercase tracking-widest mb-2">Primary Guest</span>
            <p className="font-bold text-gray-800 mb-3">{rsvpData?.guestName}</p>
            <QRCodeSVG value={rsvpData?.rsvp_token || ''} size={128} />
            <p className="text-[10px] font-mono text-gray-400 mt-3 truncate w-full text-center">
              Token: {rsvpData?.rsvp_token?.substring(0, 8)}...
            </p>
          </div>

          {/* Plus Ones */}
          {rsvpData?.plus_ones?.map((guest: any, index: number) => (
            <div key={guest.rsvp_token} className="flex items-center gap-4 p-3 bg-white border border-gray-200 rounded-lg">
              <div className="bg-gray-50 p-1.5 rounded-md">
                <QRCodeSVG value={guest.rsvp_token} size={48} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Plus One #{index + 1}</span>
                </div>
                <p className="font-semibold text-gray-700 truncate">{guest.guestName}</p>
                <p className="text-[9px] font-mono text-gray-400">Token: {guest.rsvp_token.substring(0, 8)}...</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/events"
          className="w-full py-3 mt-8 bg-blue-700 text-white rounded-lg font-bold text-sm text-center transition-all hover:bg-blue-800 shadow-lg shadow-blue-200"
        >
          Done
        </Link>
      </div>
    </div>
  )
}
export default RsvpSuccessful
