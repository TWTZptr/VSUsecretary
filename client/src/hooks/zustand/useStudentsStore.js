import { createDefaultStore } from '../../helpers/createDefaultStore';
import {
  createDirection,
  deleteDirectionById,
  getAllDirections,
  updateDirection,
} from '../../services/directionsService';
import { INITIAL_DIRECTION_STATE } from '../../constants';

export const useStudentsStore = createDefaultStore(
  'student',
  {
    update: updateDirection,
    getAll: getAllDirections,
    create: createDirection,
    remove: deleteDirectionById,
  },
  INITIAL_DIRECTION_STATE
);
