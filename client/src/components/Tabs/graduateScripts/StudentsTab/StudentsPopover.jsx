import React from 'react';
import { DefaultList } from '../../../common/DefaultList';
import { StudentsPopoverItem } from './StudentsPopoverItem';
import { TextField } from '@mui/material';

export const StudentsPopover = React.memo(({ onSelect, students }) => {
  const [text, setText] = React.useState('');

  const onTextChange = React.useCallback(
    (event) => {
      setText(event.target.value);
    },
    [setText]
  );

  const filteredStudents = React.useMemo(
    () =>
      students.filter(
        (s) =>
          s.degreeWork &&
          `${s.name} ${s.lastname} ${s.patronymic}`
            .toLowerCase()
            .includes(text.toLowerCase())
      ),
    [text, students]
  );

  return (
    <>
      <TextField
        label="Фильтр"
        id="filter"
        onChange={onTextChange}
        value={text}
        variant="filled"
      />
      <DefaultList>
        {filteredStudents.map((student) => (
          <StudentsPopoverItem
            key={student.id}
            student={student}
            onClick={onSelect}
          />
        ))}
      </DefaultList>
    </>
  );
});
