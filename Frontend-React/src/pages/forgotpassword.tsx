import React from "react";

interface ForgotPassword {
    heading: string;
    subheading: string;
    email: string;
    
}

const ForgotPasswordComponent: React.FC = () => {
    const data: ForgotPassword = {
        heading: "Forgot Password ?",
        subheading: "Enter your email address to reset your password",
        email: "",
    };

    const handleEmailChange = (value: string) => {
        data.email = value;
    };

    return (
        <div className="flex  shadow- justify-center items-center h-screen bg-gray-200">
            <section className="forgot-password p-20 rounded shadow-2xl bg-white">
                <div className="w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-4 text-center">{data.heading}</h1>
                    <p className="text-base mb-4">{data.subheading}</p>
                    <div className="flex justify-center rounded shadow">
                        <section>
                            <div className="mt-3">
                                <input
                                    type="email"
                                    id="email"
                                    value={data.email}
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                    placeholder="Email*"
                                    className="w-full p-2 border border-gray-300 rounded bg-#ffedd5 box-decoration-slice bg-#ffedd5 text-black"
                                />
                            </div>
                            <div className="mt-3">
                                <button className="w-full p-2 bg-blue-700 text-white rounded">
                                    submit
                                </button>
                            </div>
                            <div>
                                <p className="text-center mt-3">
                                    <a href="/login" className="text-blue-500">
                                        Back to Login
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ForgotPasswordComponent;
