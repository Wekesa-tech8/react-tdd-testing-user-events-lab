import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const interestOptions = ['Interest 1', 'Interest 2', 'Interest 3'];

  const handleCheckboxChange = (event) => {
    const selectedInterest = event.target.value;
    setInterests((prevInterests) =>
      prevInterests.includes(selectedInterest)
        ? prevInterests.filter((interest) => interest !== selectedInterest)
        : [...prevInterests, selectedInterest]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="App">
      <h1>Newsletter Signup</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Interests:</label>
            {interestOptions.map((interest) => (
              <div key={interest}>
                <input
                  type="checkbox"
                  id={interest}
                  value={interest}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor={interest}>{interest}</label>
              </div>
            ))}
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank you for signing up, {name}!</h2>
          {interests.length > 0 && (
            <p>Your interests: {interests.join(', ')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
