import { PersonStandingIcon, XIcon } from 'lucide-react';

function InputTravelers({ index, value, onChange, onRemove }) {
  const handleChange = (e) => {
    onChange({ id: index, name: e.target.value });
  };

  return (
    <div className="mt-4 flex flex-row items-center">
      <label className="label flex items-center justify-center">
        <PersonStandingIcon />
      </label>

      <div className="flex flex-col">
        <div className="mb-2 flex items-center">
          <input
            type="text"
            className="input w-[15rem] text-center"
            placeholder={`Voyageur ${index + 1}`}
            value={value}
            onChange={handleChange}
          />
          <XIcon
            className="ml-2 w-4 cursor-pointer"
            onClick={() => onRemove(index)}
          />
        </div>
      </div>
    </div>
  );
}

export default InputTravelers;
