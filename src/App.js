import './App.css';
import React, { useState } from 'react'

const URL = 'https://api.exchangerate.host/latest';

function App() {
  const [eur, setEuro] = useState(0);
  const [gbp, setGbp] = useState(0);
  const [muutos, setMuutos] = useState(0);

async function convert(e) {
  e.preventDefault();
  try {
    const address = URL
    const response = await fetch(address);

    if (response.ok) {
      const json = await response.json();
      setMuutos(json.rates.GBP);
      setGbp(eur * json.rates.GBP);
    } else {
      alert('Virhe. Ei saatu vaihtokurssia.');
    }
  } catch (err) {
    alert(err);
  }
}

  return (
  <div id="container">
    <form onSubmit={convert}>
      <div>
        <label>EUR</label>&nbsp;
        <input type="number" step="0.01"
        value={eur} onChange={e => setEuro(e.target.value)} />
        <output>{muutos}</output>
      </div>
      <div>
        <label>GBP </label>
        <output>{gbp.toFixed(2)} €</output>
      </div>
      <div>
        <button>Calculate</button>
      </div>
    </form>
  </div>
  );
}

export default App;
