import './App.css'
import React, { useState, useEffect } from "react";

const opciones = ["piedra", "papel", "tijera"];

const App = () => {
  const [score, setScore] = useState({
    ganadas: 0,
    perdidas: 0,
    empatadas: 0,
    stats: {
      ai_piedra: 0,
      ai_papel: 0,
      ai_tijera: 0,
      user_piedra: 0,
      user_papel: 0,
      user_tijera: 0,
    },
  });

  const [resultado, setResultado] = useState("");
  const [jugadas, setJugadas] = useState({ usuario: "", ai: "" });

  const jugar = (usuario) => {
    const jugadorAI = elegirJugadorAI();
    let resultado = "";

    if (jugadorAI === usuario) resultado = "Empate";
    else if (
      (usuario === "piedra" && jugadorAI === "tijera") ||
      (usuario === "papel" && jugadorAI === "piedra") ||
      (usuario === "tijera" && jugadorAI === "papel")
    )
      resultado = "Ganaste";
    else resultado = "Perdiste";

    setResultado(`${resultado}. Tú: ${usuario.toUpperCase()} | AI: ${jugadorAI.toUpperCase()}`);

    setScore((prev) => {
      const nuevoStats = { ...prev.stats };
      nuevoStats[`user_${usuario}`]++;
      nuevoStats[`ai_${jugadorAI}`]++;

      return {
        ...prev,
        ganadas: resultado === "Ganaste" ? prev.ganadas + 1 : prev.ganadas,
        perdidas: resultado === "Perdiste" ? prev.perdidas + 1 : prev.perdidas,
        empatadas: resultado === "Empate" ? prev.empatadas + 1 : prev.empatadas,
        stats: nuevoStats,
      };
    });

    setJugadas({ usuario, ai: jugadorAI });
  };

  const elegirJugadorAI = () => opciones[Math.floor(Math.random() * 3)];

  const reset = () => {
    setScore({
      ganadas: 0,
      perdidas: 0,
      empatadas: 0,
      stats: {
        ai_piedra: 0,
        ai_papel: 0,
        ai_tijera: 0,
        user_piedra: 0,
        user_papel: 0,
        user_tijera: 0,
      },
    });
    setResultado("");
    setJugadas({ usuario: "", ai: "" });
  };

  const AIvsAI = () => {
    const interval = setInterval(() => {
      const jugada = elegirJugadorAI();
      jugar(jugada);
    }, 100);
    setTimeout(() => clearInterval(interval), 3000); // para evitar ejecución infinita
  };

  const total = score.ganadas + score.perdidas + score.empatadas;
  const pGanadas = total ? (score.ganadas / total) * 100 : 0;
  const pPerdidas = total ? (score.perdidas / total) * 100 : 0;
  const pEmpatadas = total ? (score.empatadas / total) * 100 : 0;

  return (
    <div className="Container">
      <h1>Piedra, Papel o Tijera</h1>
      <div className="Botones">
        {opciones.map((op) => (
          <button key={op} onClick={() => jugar(op)}>{`${op.charAt(0).toUpperCase() + op.slice(1)}`}</button>
        ))}
        <button onClick={reset}>Reset</button>
        <button onClick={AIvsAI}>AutoPlay</button>
      </div>

      <div className="Resultado">
        <h2>{resultado}</h2>
      </div>

      <div className="Marcador">
        <p>Ganadas: {score.ganadas}</p>
        <p>Perdidas: {score.perdidas}</p>
        <p>Empatadas: {score.empatadas}</p>
      </div>

      <div className="Grafica">
        <div style={{ width: `${pGanadas}%`, background: "green" }}>Ganadas: {Math.round(pGanadas)}%</div>
        <div style={{ width: `${pPerdidas}%`, background: "red" }}>Perdidas: {Math.round(pPerdidas)}%</div>
        <div style={{ width: `${pEmpatadas}%`, background: "blue" }}>Empatadas: {Math.round(pEmpatadas)}%</div>
      </div>

      <div className="Stats">
        <h3>Stats AI:</h3>
        <p>✊ {score.stats.ai_piedra} ✋ {score.stats.ai_papel} ✌ {score.stats.ai_tijera}</p>
        <h3>Stats Usuario:</h3>
        <p>✊ {score.stats.user_piedra} ✋ {score.stats.user_papel} ✌ {score.stats.user_tijera}</p>
      </div>
    </div>
  );
};

export default App
