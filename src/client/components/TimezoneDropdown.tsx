import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import TimezoneRegions from "../constants/TimezoneRegions";

type Props = {
  value: string;
  onChange: (event: React.SyntheticEvent, data: DropdownProps) => void;
};

const regions = Object.entries(TimezoneRegions).map(([name, offset]) => {
  return {
    key: name,
    value: offset,
    text: `${offset}  ${name}`
  };
});

export default function TimezoneDropdown(props: Props) {
  return (
    <Dropdown
      value={props.value}
      placeholder="Select Timezone"
      fluid
      search
      selection
      options={regions}
      onChange={props.onChange}
    />
  );
}
