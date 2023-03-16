import { createDefaultStore } from '../../helpers/createDefaultStore';
import {
  createDirection,
  deleteDirectionById,
  getAllDirections,
  updateDirection,
} from '../../services/directionsService';
import { INITIAL_DIRECTION_STATE } from '../../constants';

export const useDirectionsStore = createDefaultStore(
  'direction',
  {
    remove: deleteDirectionById,
    create: createDirection,
    getAll: getAllDirections,
    update: updateDirection,
  },
  INITIAL_DIRECTION_STATE
);
