import { createDefaultStore } from '../../helpers/createDefaultStore';
import {
  createTakeDay,
  deleteTakeDayById,
  getAllTakeDays,
  updateTakeDay,
} from '../../services/takeDaysService';
import { INITIAL_TAKE_DAY_STATE } from '../../constants';

export const useTakeDaysStore = createDefaultStore(
  'takeDay',
  {
    remove: deleteTakeDayById,
    create: createTakeDay,
    getAll: getAllTakeDays,
    update: updateTakeDay,
  },
  INITIAL_TAKE_DAY_STATE
);
