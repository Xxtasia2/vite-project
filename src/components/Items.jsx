import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

/**
 * Componente para mostrar un item individual de estudiante en la tabla
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.student - Objeto estudiante con datos
 * @param {Function} props.onEdit - Función para editar estudiante
 * @param {Function} props.onDelete - Función para eliminar estudiante
 */
const Items = ({ student, onEdit, onDelete }) => {
  
  /**
   * Función para obtener el color de la escala de apreciación
   * @param {string} scale - Escala de apreciación
   * @returns {string} - Clases CSS para el color
   */
  const getScaleColor = (scale) => {
    switch (scale) {
      case 'Deficiente':
        return 'text-red-600 bg-red-50';
      case 'Con Mejora':
        return 'text-orange-600 bg-orange-50';
      case 'Buen Trabajo':
        return 'text-blue-600 bg-blue-50';
      case 'Destacado':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">
          {student.nombre}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {student.asignatura}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-gray-900">
          {student.promedio}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getScaleColor(student.escalaApreciacion)}`}>
          {student.escalaApreciacion}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(student)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
            title="Editar estudiante"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(student.id)}
            className="text-red-600 hover:text-red-900 transition-colors"
            title="Eliminar estudiante"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Items;