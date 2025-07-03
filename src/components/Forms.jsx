import React from 'react';
import { Save, X, User, BookOpen, Target } from 'lucide-react';

/**
 * Componente de formulario para agregar y editar estudiantes
 * @param {Object} props - Propiedades del componente
 * @param {boolean} props.showForm - Indica si el formulario debe mostrarse
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputChange - Función para manejar cambios en inputs
 * @param {Function} props.handleSubmit - Función para enviar el formulario
 * @param {Function} props.resetForm - Función para resetear el formulario
 * @param {Object} props.editingStudent - Estudiante que se está editando (null si es nuevo)
 */
const Forms = ({ 
  showForm, 
  formData, 
  handleInputChange, 
  handleSubmit, 
  resetForm, 
  editingStudent 
}) => {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {editingStudent ? 'Editar Estudiante' : 'Agregar Nuevo Estudiante'}
        </h2>
        
        <div className="space-y-4">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User size={16} className="inline mr-1" />
              Nombre del Alumno
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el nombre completo"
            />
          </div>

          {/* Campo Asignatura */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <BookOpen size={16} className="inline mr-1" />
              Asignatura
            </label>
            <input
              type="text"
              name="asignatura"
              value={formData.asignatura}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa la asignatura"
            />
          </div>

          {/* Campo Promedio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Target size={16} className="inline mr-1" />
              Promedio (1.0 - 7.0)
            </label>
            <input
              type="number"
              name="promedio"
              value={formData.promedio}
              onChange={handleInputChange}
              min="1.0"
              max="7.0"
              step="0.1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: 6.5"
            />
          </div>
        </div>

        {/* Botones del formulario */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1"
          >
            <Save size={16} />
            {editingStudent ? 'Actualizar' : 'Guardar'}
          </button>
          <button
            onClick={resetForm}
            className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <X size={16} />
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Forms;