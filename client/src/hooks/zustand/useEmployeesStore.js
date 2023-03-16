import { createDefaultStore } from '../../helpers/createDefaultStore';
import {
  createEmployee,
  deleteEmployeeById,
  getAllEmployees,
  updateEmployee,
} from '../../services/employeesService';
import { INITIAL_EMPLOYEE_STATE } from '../../constants';

export const useEmployeesStore = createDefaultStore(
  'employee',
  {
    update: updateEmployee,
    getAll: getAllEmployees,
    create: createEmployee,
    remove: deleteEmployeeById,
  },
  INITIAL_EMPLOYEE_STATE
);
