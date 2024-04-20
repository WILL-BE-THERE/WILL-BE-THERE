import React from 'react';

interface PlusOneForm {
    heading: string;
    subheading: string;
    name1: string;
    name2: string;
    name3: string;
    name4: string;
    name5: string;
}

interface PlusOneFormProps {
    formData: PlusOneForm;
    handleFormSubmit: (formData: PlusOneForm) => void;
    handleCancel: () => void;
}

const PlusOneForm: React.FC<PlusOneFormProps> = ({ formData, handleFormSubmit, handleCancel }) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleFormSubmit(formData);
    };

    return (
        <div className="flex justify-center">
            <div className="border rounded shadow-md p-6 w-full max-w-md">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Name 1:
                            <input type="text" name="name1" value={formData.name1} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Name 2:
                            <input type="text" name="name2" value={formData.name2} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </label>
                    </div>
                    <div>
                        <label>
                            Name 3:
                            <input type="text" name="name3" value={formData.name3} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-blue-500">
                            Submit
                        </button>
                        <button type="button" onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:ring-1 focus:ring-gray-500">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PlusOneForm;
