// TwoFactorAuth.ts

import React from "react";

interface TwoFactorAuth {
  title: string;
  instruction: string;
  phoneNumber: string;
  codePlaceholder: string;
  submitButtonLabel: string;
  resendLinkLabel: string;
  countdownTimer: string;
  copyright: string;
  activate: () => Promise<void>;
  deactivate: () => Promise<void>;
}

class TwoFactorAuthModel implements TwoFactorAuth {
  userId: string;
  email: string;
  phoneNumber: string;
  qrCodeUrl?: string;
  isActivated: boolean;

  constructor(userId: string, email: string, phoneNumber: string) {
    this.userId = userId;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.isActivated = false;
  }

  async activate(): Promise<void> {
    // Implement logic to activate 2FA, e.g., generate QR code, send SMS, etc.
    this.isActivated = true;
    console.log("2FA activated!");
  }

  async deactivate(): Promise<void> {
    // Implement logic to deactivate 2FA
    this.isActivated = false;
    console.log("2FA deactivated!");
  }
}

const TwoFactorAuth: React.FC<TwoFactorAuth> = ({TwoFactorAuthModel}) => {
  return(
      <div id="two-step-verification-form">
        <h1 id="title">Two Step Verification</h1>
        <p id="instruction">Enter the verification code we sent to</p>
        <p id="phone-number">+1234567890123</p>
        <input type="text" id="code-placeholder" placeholder="Type your four digits code">
          <button id="submit-button-label">Submit</button>
          <a href="#" id="resend-link-label">Didn't get the code?</a>
          <p id="countdown-timer">00:35</p>
          <small id="copyright">@Allwritthen 2021</small>
      </div>
  );
};

export default TwoFactorAuth;
