interface TwoFactorAuth {
    userId: string;
    email: string;
    phoneNumber: string;
    qrCodeUrl?: string;
    isActivated: boolean;
    activate: () => void;
    deactivate: () => void;
  }
  
  const twoFactorAuth: TwoFactorAuth = {
    userId: "123456",
    email: "example@example.com",
    phoneNumber: "+1234567890",
    isActivated: false,
    activate() {
      // Logic to activate 2FA
      this.isActivated = true;
      console.log("2FA activated!");
    },
    deactivate() {
      // Logic to deactivate 2FA
      this.isActivated = false;
      console.log("2FA deactivated!");
    },
  };
  
  // Activate 2FA
  twoFactorAuth.activate();
  
  // Deactivate 2FA
  twoFactorAuth.deactivate();
  