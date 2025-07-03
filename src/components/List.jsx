import React from 'react';
import { User } from 'lucide-react';
import Items from './Items';

/**
 * Componente para mostrar la lista completa de estudiantes
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.students - Array de estudiantes
 * @param {Function} props.onEdit - Función para editar estudiante
 * @param {Function} props.onDelete - Función para eliminar estudiante
 */
const List = ({ students, onEdit, onDelete }) => {
  
  /**
   * Función para confirmar eliminación de estudiante
   * @param {number} id - ID del estudiante a eliminar
   */
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          Lista de Estudiantes ({students.length})
        </h2>
      </div>

      {students.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          <User size={48} className="mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No hay estudiantes registrados</p>
          <p className="text-sm">Agrega tu primer estudiante para comenzar</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Asignatura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Escala de Apreciación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <Items
                  key={student.id}
                  student={student}
                  onEdit={onEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;