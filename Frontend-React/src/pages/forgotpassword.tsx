import React from "react";
import ReactDOM from "react-dom/client";

interface ForgotPassword {
    heading: string;
    subheading: string;
    email: string;
    }
}

const ForgotPasswordComponent: React.FC = () => {
    const data: ForgotPassword = {
        heading: "Forgot Password",
        subheading: "Enter your email address to reset your password",
        email: "",
    };

    const handleEmailChange = (value: string) => {
        data.email = value;
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <section className="forgot-password p-4 rounded shadow-md bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">{data.heading}</h1>
                    <p className="text-base font-medium mb-2">{data.subheading}</p>
                    <div className="flex justify-center">
                        <section>
                            <div className="mt-3">
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                    placeholder="Email"
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>
                            <div className="mt-3">
                                <button className="w-full p-2 bg-blue-500 text-white rounded">
                                    Continue
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}
