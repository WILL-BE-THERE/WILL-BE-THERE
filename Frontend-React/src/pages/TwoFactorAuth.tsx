// TwoFactorAuth.ts

interface TwoFactorAuth {
  userId: string;
  email: string;
  phoneNumber: string;
  qrCodeUrl?: string;
  isActivated: boolean;
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

export { TwoFactorAuth, TwoFactorAuthModel };
