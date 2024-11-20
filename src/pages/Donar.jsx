import React, { useRef, useState } from 'react'
import { donateBlood } from '../services/Api';

const Donar = () => {
  const [visible, setVisible] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const formRef = useRef(null);
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-","A1B+","A1B-"];

  const handleClick = () =>{
    setVisible(!visible);
  }


  const handleBloodGroupClick = (group) => {
    setSelectedBloodGroup(group);
    if (formRef.current) {
      formRef.current.bloodGroup.value = group;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const donarData={
      name: formRef.current.name.value,
      email: formRef.current.email.value,
      age:formRef.current.age.value,
      gender:formRef.current.gender.value,
      location:formRef.current.location.value,
      bloodGroup: formRef.current.bloodGroup.value,
    };
    try{
      console.log("Donar",donarData);
      const response = await donateBlood(donarData);
      console.log("Form submitted successfully",response);
      alert("Thankyou...!");
    }catch (error) {
      console.error("Error submitting form:",error);
      alert("Failed to submit request")
    }
  };
  return(
    <div className='min-h-screen w-screen flex items-center justify-between px-10 bg-gray-100 py-10'>
      <div className='flex flex-col justify-center items-start w-1/2'>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Blood Donation Procedure
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          1. Donor fills out a simple online form with personal details and health information.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          2. The donor receives a confirmation email with details about the donation process and guidelines.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          3. The nearest blood donation center location is shared with the donor for convenience.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          4. Donor visits the center on the scheduled date and undergoes a quick health screening.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          5. Blood donation is carried out by trained professionals in a safe and hygienic environment.
        </p>
        <p className="text-lg text-gray-600 mb-4">
          6. Donor receives a thank-you note and updates on how their blood will be used to save lives.
        </p>
      </div>

      <div className='w-1/2 flex flex-col items-center'>
        {!visible ?(
        <button onClick={handleClick}className='bg-red-500 text-white px-6 py-3 rounded-md text-lg font-bold'>
          Donate Blood
        </button>
        ):(
            <div className='w-[85%] flex flex-col items-center bg-white p-6 shadow-lg rounded-md'>
              <h2 className='text-2xl font-bold text-gray-800 mb-4'>
                Donate Blood</h2>
                <form 
                ref={formRef}
                onSubmit={handleSubmit}
                className='w-full max-w-md flex flex-col gap-4'
                >
                <input type="text"
                name='name'
                placeholder='Name'
                className='p-3 bg-gray-100 w-full rounded-md outline-none focus:border-b-2 border-red-500'
                />
                <input type="email"
                name='email'
                placeholder='Email'
                className='p-3 bg-gray-100 w-full rounded-md outline-none focus:border-b-2 border-red-500'
                />
                <input type="number"
                name='age'
                placeholder='Age'
                className='p-3 bg-gray-100 w-full rounded-md outline-none focus:border-b-2 border-red-500'
                />
                <select
                  name="gender"
                  className="p-3 bg-gray-100 w-full rounded-md outline-none focus:border-b-2 border-red-500"
                  defaultValue="Male"
                  required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
                
                <input type="text"
                name='location'
                placeholder='Location'
                className='p-3 bg-gray-100 w-full rounded-md outline-none focus:border-b-2 border-red-500'
                />
                
                <div className='grid grid-cols-4 gap-4 mt-4'>
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
                    <span className="text-2xl p-1 bg-gray-100 hover:bg-red-100">🩸</span>
                    {group}
                  </button>
                ))}
                </div>
                <input type="hidden" name="bloodGroup" />

                <button type='submit' className='mt-6 bg-red-500 text-white font-bold px-6 py-3 rounded-md hover:bg-red-600 transition duration-300 '>
                  Submit
                </button>
                </form>
            </div>
        )}
      </div>
    </div>
  )
}

export default Donar;