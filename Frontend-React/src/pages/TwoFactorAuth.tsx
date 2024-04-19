import React from "react";

interface TwoFactorAuth {
  phoneNumber: string;
  verificationCode: string;
  timer: number;
  onVerify?: () => void;
  onResend?: () => void;
}

function TwoFactorAuthComponent(props: TwoFactorAuth) {
  const [code, setCode] = React.useState("");
  const countdown = React.useRef(props.timer);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      countdown.current--;
      if (countdown.current === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleVerify = () => {
    if (props.onVerify) {
      props.onVerify();
    }
  };

  const handleResend = () => {
    if (props.onResend) {
      props.onResend();
      countdown.current = props.timer; // Reset timer on resend
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-grey">
      <section className="two-factor-auth p-4 rounded shadow-md bg-white">
        <div className="w-full max-w-md"> {/* Limit max width for responsiveness */}
          <img src="" alt="" />
          <h1 className="text-2xl font-bold mb-4">Two Factor Authentication</h1>
          <p className="text-base font-medium mb-2">Enter the verification code sent to</p>
          <p className="text-sm text-gray-500">{props.phoneNumber}</p>
          <p className="text-base font-medium mt-4">Type your Verification Code</p>
          <input
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleVerify}
            disabled={code.length !== 4}
            className="disabled:bg-gray-300 py-2 px-4 text-sm font-medium text-center text-white rounded bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            Verify
          </button>
          <p className="text-sm text-gray-500 mt-4">
            Didn't get the code?{" "}
            <span onClick={handleResend} className="text-blue-500 cursor-pointer">
              Resend
            </span>
          </p>
          <p className="text-blue-500">({countdown.current}s) {/* Countdown timer */}</p>
        </div>
      </section>
    </div>
  );
}

export default TwoFactorAuthComponent;
