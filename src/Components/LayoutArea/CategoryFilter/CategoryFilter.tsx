import React, { useState } from "react";
import "./CategoryFilter.css";
import { SelectChangeEvent, Box, FormControl, InputLabel, Select, MenuItem, useMediaQuery } from "@mui/material";

interface CategoryFilterProps {
    category: string;
    onSelect: (newCategory: string) => void;
  }

/**
 * CategoryFilter Component
 *
 * - A React component that provides a dropdown to filter items by category.
 * - The component receives a `category` prop that determines the currently selected category and an `onSelect` callback function to handle category changes.
 *
 * Props:
 * - `category` (string): The current category selected in the filter dropdown.
 * - `onSelect` (function): A callback function that is called when the user selects a new category. It receives the new category as an argument.
 *
 * Key Features:
 * - Displays a dropdown menu with options such as "All Coupons", "Food", "Fashion", etc.
 */


export function CategoryFilter({ category, onSelect }: CategoryFilterProps): JSX.Element {
        const isMobile = useMediaQuery("(max-width: 480px)");
        const handleChange = (event: SelectChangeEvent) => {
        onSelect(event.target.value);
        };
    
    return (
        <Box sx={{ paddingLeft: "31%", paddingTop: "10px", width: isMobile ? '81%' : '73%' }}>
        <FormControl fullWidth>
          <InputLabel sx={{fontSize: "16px"}} id="demo-simple-select-category">Category</InputLabel>
          <Select
            labelId="demo-simple-select-category"
            id="demo-simple-select"
            value={category}
            defaultValue=""
            label="Category"
            variant="outlined"
            onChange={handleChange}>
            <MenuItem value={""}>All Coupons</MenuItem>
            <MenuItem value={"Food"}>Food</MenuItem>
            <MenuItem value={"Fashion"}>Fashion</MenuItem>
            <MenuItem value={"Cinema"}>Cinema</MenuItem>
            <MenuItem value={"Spa"}>Spa</MenuItem>
            <MenuItem value={"Tech"}>Tech</MenuItem>
            <MenuItem value={"Sport"}>Sport</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
}