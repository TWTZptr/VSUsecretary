import { createDefaultStore } from '../../helpers/createDefaultStore';
import {
  createDegreeWork,
  deleteDegreeWorkById,
  getAllDegreeWorks,
  updateDegreeWork,
} from '../../services/degreeWorksService';
import { INITIAL_DEGREE_WORK_STATE } from '../../constants';

export const useDegreeWorksStore = createDefaultStore(
  'degreeWork',
  {
    create: createDegreeWork,
    getAll: getAllDegreeWorks,
    remove: deleteDegreeWorkById,
    update: updateDegreeWork,
  },
  INITIAL_DEGREE_WORK_STATE
);
