import { useParams, Link } from "react-router-dom";
import React, { useState } from "react"; // Agrega useState

const Encuesta = ({ listaEncuestas, responderEncuesta }) => {
  const { id } = useParams();
  const encuesta = listaEncuestas.find((enc) => enc.id === parseInt(id));

  const [opcionesSeleccionadas, setOpcionesSeleccionadas] = useState({}); // Nuevo estado para rastrear las opciones seleccionadas

  const handleSeleccionarOpcion = (preguntaId, opcionId) => {
    setOpcionesSeleccionadas({
      ...opcionesSeleccionadas,
      [preguntaId]: opcionId,
    });
  };

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>{encuesta.titulo}</h2>
          <p>{encuesta.descripcion}</p>
          <br />
        </div>
      </div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>Preguntas</h2>
          <p>
            {!encuesta.preguntas && <p>Sin preguntas definidas.</p>}
            {encuesta.preguntas &&
              encuesta.preguntas.map((pregunta) => (
                <div key={pregunta.id}>
                  <p>{pregunta.pregunta}</p>
                  <ul>
                    {pregunta.opciones.map((opcion) => (
                      <li key={opcion.id}>
                        <label>
                          <input
                            type="radio"
                            name={`pregunta${pregunta.id}`}
                            value={opcion.id}
                            onClick={() =>
                              handleSeleccionarOpcion(
                                pregunta.id,
                                opcion.id
                              )
                            }
                          />
                          {opcion.texto}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </p>
          <br />
        </div>
      </div>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default Encuesta;