import { useState, useRef } from "react";
import { requestBlood } from "../services/Api";

const Patientdashboard = () => {
  const [visible, setVisible] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const formRef = useRef(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-","A1B+","A1B-"];

  const handleRequestBloodClick = () => {
    setVisible(!visible);
  };

  const handleBloodGroupClick = (group) => {
    setSelectedBloodGroup(group);
    formRef.current.bloodGroup.value = group; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: formRef.current.name.value,
      emergency: formRef.current.emergency.value,
      location: formRef.current.location.value,
      age: formRef.current.age.value,
      gender: formRef.current.gender.value,
      bloodGroup: formRef.current.bloodGroup.value,
    };

    try {
      const response = await requestBlood(formData);
      console.log("Form submitted successfully", response);
      alert("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit request");
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 bg-gray-100 py-10">
  {/* Left Section */}
  <div className="w-full lg:w-1/2 mb-10 lg:mb-0 flex flex-col items-start justify-center">
    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center lg:text-left">
      Blood Request Procedure
    </h1>
    <ul className="text-base md:text-lg text-gray-600 space-y-4">
      <li>1. Patient submits a blood request with necessary details.</li>
      <li>2. The blood bank verifies the availability of blood.</li>
      <li>3. If available, the blood is prepared for dispatch.</li>
      <li>4. Blood is transported to the hospital or the patient's location.</li>
      <li>5. The patient receives the blood, and necessary documentation is completed.</li>
    </ul>
  </div>

  {/* Right Section */}
  <div className="w-full lg:w-1/2 flex flex-col items-center lg:justify-start pt-6 lg:pt-0">
  {!visible ? (
    <button
      onClick={handleRequestBloodClick}
      className="bg-red-500 text-white px-6 py-5 rounded-md text-lg font-bold hover:bg-red-600 transition duration-300 mt-6 lg:mt-0">
      Request Blood
    </button>
    ) : (
      <div className="w-full bg-white shadow-lg p-6 rounded-md">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
          Request Blood
        </h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6"
        >
          {/* Patient Name */}
          <input
            type="text"
            name="name"
            placeholder="Patient Name"
            className="p-3 bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            required
          />

          {/* Emergency Status */}
          <select
            name="emergency"
            className="p-3 bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            defaultValue="Emergency"
            required
          >
            <option value="Emergency">Emergency</option>
            <option value="Non-Emergency">Non-Emergency</option>
          </select>

          {/* Location */}
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="p-3 bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            required
          />

          {/* Age */}
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="p-3 bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            required
          />

          {/* Gender */}
          <select
            name="gender"
            className="p-3 bg-gray-100 border border-gray-300 rounded-md outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            defaultValue="Male"
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>

          {/* Blood Group Selection */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {bloodGroups.map((group) => (
              <button
                type="button"
                key={group}
                onClick={() => handleBloodGroupClick(group)}
                className={`p-3 border rounded-md flex flex-col items-center justify-center text-lg font-bold ${
                  selectedBloodGroup === group
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-red-100"
                }`}
              >
                <span className="text-2xl">🩸</span>
                {group}
              </button>
            ))}
          </div>

          {/* Hidden Input for Blood Group */}
          <input type="hidden" name="bloodGroup" />

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-red-500 text-white px-6 py-3 rounded-md text-lg font-bold hover:bg-red-600 transition duration-300"
          >
            Submit Request
          </button>
        </form>
      </div>
    )}
  </div>
</div>


  );
};

export default Patientdashboard;