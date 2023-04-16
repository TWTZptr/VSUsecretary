import React from 'react';
import { DefaultList } from '../../../common/DefaultList';
import { StudentsPopoverItem } from './StudentsPopoverItem';

export const StudentsPopover = React.memo(({ onSelect, students }) => {
  return (
    <DefaultList>
      {students.map((student) => (
        <StudentsPopoverItem
          key={student.id}
          student={student}
          onClick={onSelect}
        />
      ))}
    </DefaultList>
  );
});
