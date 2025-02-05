import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Input, InputAdornment } from "@mui/material";


interface PriceSliderProps {
  value: number;
  onChange: (newValue: number) => void;
}

/**
 * PriceSlider Component
 *
 * - A reusable slider component for selecting and adjusting a price value.
 * - Allows users to interact with both a slider and an input field for precision.
 *
 * Props:
 * - `value` (number): The current value of the slider and input.
 * - `onChange` (function): Callback to update the parent component's value.
 *
 * Key Features:
 * - Synchronizes the slider and input field to reflect the same value.
 * - Validates input to ensure the value stays within the range of 0 to 100.
 * - Customizable appearance using Material-UI's.
 *
 * Event Handlers:
 * - `handleSliderChange`: Updates the value when the slider is adjusted.
 * - `handleInputChange`: Updates the value when text input is modified.
 * - `handleBlur`: Ensures the value is clamped within the range after losing focus.
 *
 * Usage:
 * - Include this component wherever a price range selection is needed.
 * - Pass a `value` state and an `onChange` handler from the parent component.
 */


export function PriceSlider({ value, onChange }: PriceSliderProps): JSX.Element {

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    onChange(newValue as number); // Update value in parent component
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value === '' ? 0 : Number(event.target.value);
    onChange(newValue); // Pass the new value to parent component
  };

  const handleBlur = () => {
    if (value < 0) {
      onChange(0); // Ensure value doesn't go below 0
    } else if (value > 100) {
      onChange(100); // Ensure value doesn't exceed 100
    }
  };

  return (
    <Box sx={{ width: 210, display: "flex", mb: 1, paddingLeft: "8%"}}>
      <Slider
        value={value}
        onChange={handleSliderChange}
        aria-labelledby="input-slider"
        sx={{ width: "80%"}} // Slider takes up 80% of Box width
      />
      <Input
        value={value}
        size="small"
        aria-label="color"
        onChange={handleInputChange}
        onBlur={handleBlur}
        endAdornment={<InputAdornment position="end" sx={{ marginLeft: "-20px", marginBottom: "3.5px" }}>$</InputAdornment>}
        inputProps={{
          min: 0,
          max: 100,
          type: 'number',
          'aria-labelledby': 'input-slider',
        }}
        sx={{ 
          marginLeft: "20px", 
          width: "60px", // Increased input width to make it more visible
          textAlign: "right"
        }}
      />
    </Box>
  );
}
