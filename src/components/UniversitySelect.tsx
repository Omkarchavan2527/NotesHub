import CreatableSelect from 'react-select/creatable';
import type{  UniversityOption } from './data/indianUniversities';
import {indianUniversities} from "./data/indianUniversities"
interface Props {
  value: UniversityOption | null;
  onChange: (value: UniversityOption) => void;
}

export const UniversitySelect: React.FC<Props> = ({ value, onChange }) => {
  return (
    <CreatableSelect
      isSearchable
      isClearable
      options={indianUniversities}
      value={value}
      placeholder="Search or add your university"
      classNamePrefix="react-select"
      formatCreateLabel={(input) => `➕ Add "${input}"`}
      onChange={(option) => {
        if (!option) return;

        const exists = indianUniversities.some(
          (u) => u.value === option.value
        );

        if (!exists) {
          indianUniversities.push(option as UniversityOption);
        }

        onChange(option as UniversityOption);
      }}
    />
  );
};
