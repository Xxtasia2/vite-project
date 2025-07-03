import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import Forms from './components/Forms';
import List from './components/List';

/**
 * Aplicación principal de evaluación de estudiantes
 * Utiliza localStorage para persistir los datos
 */
const App = () => {
  // Estados para manejar los datos de los estudiantes
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    asignatura: '',
    promedio: ''
  });

  /**
   * Cargar datos desde localStorage al iniciar la aplicación
   */
  useEffect(() => {
    const savedStudents = localStorage.getItem('studentEvaluations');
    if (savedStudents) {
      try {
        const parsedStudents = JSON.parse(savedStudents);
        setStudents(parsedStudents);
      } catch (error) {
        console.error('Error al cargar datos desde localStorage:', error);
      }
    }
  }, []);

  /**
   * Guardar datos en localStorage cuando cambie el estado de estudiantes
   */
  useEffect(() => {
    if (students.length > 0) {
      localStorage.setItem('studentEvaluations', JSON.stringify(students));
    }
  }, [students]);

  /**
   * Función para calcular la escala de apreciación basada en el promedio
   * @param {string|number} average - Promedio del estudiante
   * @returns {string} - Escala de apreciación correspondiente
   */
  const calculateAppreciationScale = (average) => {
    const numAverage = parseFloat(average);
    if (numAverage >= 1.0 && numAverage <= 3.9) {
      return 'Deficiente';
    } else if (numAverage >= 4.0 && numAverage <= 5.5) {
      return 'Con Mejora';
    } else if (numAverage >= 5.6 && numAverage <= 6.4) {
      return 'Buen Trabajo';
    } else if (numAverage >= 6.5 && numAverage <= 7.0) {
      return 'Destacado';
    } else {
      return 'Fuera de Rango';
    }
  };

  /**
   * Función para manejar los cambios en el formulario
   * @param {Object} e - Evento del input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Función para validar los datos del formulario
   * @returns {boolean} - True si los datos son válidos
   */
  const validateForm = () => {
    if (!formData.nombre.trim()) {
      alert('El nombre del alumno es requerido');
      return false;
    }
    if (!formData.asignatura.trim()) {
      alert('La asignatura es requerida');
      return false;
    }
    const promedio = parseFloat(formData.promedio);
    if (isNaN(promedio) || promedio < 1.0 || promedio > 7.0) {
      alert('El promedio debe ser un número entre 1.0 y 7.0');
      return false;
    }
    return true;
  };

  /**
   * Función para agregar un nuevo estudiante
   */
  const addStudent = () => {
    if (!validateForm()) return;

    const newStudent = {
      id: Date.now(),
      nombre: formData.nombre.trim(),
      asignatura: formData.asignatura.trim(),
      promedio: parseFloat(formData.promedio).toFixed(1),
      escalaApreciacion: calculateAppreciationScale(formData.promedio)
    };

    setStudents(prev => [...prev, newStudent]);
    resetForm();
  };

  /**
   * Función para actualizar un estudiante existente
   */
  const updateStudent = () => {
    if (!validateForm()) return;

    const updatedStudent = {
      ...editingStudent,
      nombre: formData.nombre.trim(),
      asignatura: formData.asignatura.trim(),
      promedio: parseFloat(formData.promedio).toFixed(1),
      escalaApreciacion: calculateAppreciationScale(formData.promedio)
    };

    setStudents(prev => prev.map(student => 
      student.id === editingStudent.id ? updatedStudent : student
    ));
    resetForm();
  };

  /**
   * Función para eliminar un estudiante
   * @param {number} id - ID del estudiante a eliminar
   */
  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  /**
   * Función para iniciar la edición de un estudiante
   * @param {Object} student - Estudiante a editar
   */
  const startEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      nombre: student.nombre,
      asignatura: student.asignatura,
      promedio: student.promedio
    });
    setShowForm(true);
  };

  /**
   * Función para resetear el formulario
   */
  const resetForm = () => {
    setFormData({
      nombre: '',
      asignatura: '',
      promedio: ''
    });
    setShowForm(false);
    setEditingStudent(null);
  };

  /**
   * Función para manejar el envío del formulario
   */
  const handleSubmit = () => {
    if (editingStudent) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistema de Evaluación de Alumnos
          </h1>
          <p className="text-gray-600">
            Gestiona las evaluaciones y calificaciones de tus estudiantes
          </p>
        </div>

        {/* Botón para agregar nuevo estudiante */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <PlusCircle size={20} />
            Agregar Nuevo Estudiante
          </button>
        </div>

        {/* Componente de Formulario */}
        <Forms
          showForm={showForm}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          editingStudent={editingStudent}
        />

        {/* Componente de Lista */}
        <List
          students={students}
          onEdit={startEdit}
          onDelete={deleteStudent}
        />

        {/* Estadísticas */}
        {students.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-red-600 font-semibold">Deficiente</div>
              <div className="text-2xl font-bold text-red-700">
                {students.filter(s => s.escalaApreciacion === 'Deficiente').length}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-orange-600 font-semibold">Con Mejora</div>
              <div className="text-2xl font-bold text-orange-700">
                {students.filter(s => s.escalaApreciacion === 'Con Mejora').length}
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-blue-600 font-semibold">Buen Trabajo</div>
              <div className="text-2xl font-bold text-blue-700">
                {students.filter(s => s.escalaApreciacion === 'Buen Trabajo').length}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-green-600 font-semibold">Destacado</div>
              <div className="text-2xl font-bold text-green-700">
                {students.filter(s => s.escalaApreciacion === 'Destacado').length}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;