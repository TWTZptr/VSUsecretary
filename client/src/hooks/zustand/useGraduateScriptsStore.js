import { createDefaultStore } from '../../helpers/createDefaultStore';
import {
  createGraduateScript,
  deleteGraduateScriptById,
  getAllGraduateScripts,
  updateGraduateScript,
} from '../../services/graduateScriptsService';
import { INITIAL_GRADUATE_SCRIPT_STATE } from '../../constants';

export const useGraduateScriptsStore = createDefaultStore(
  'graduateScript',
  {
    remove: deleteGraduateScriptById,
    create: createGraduateScript,
    getAll: getAllGraduateScripts,
    update: updateGraduateScript,
  },
  INITIAL_GRADUATE_SCRIPT_STATE
);
