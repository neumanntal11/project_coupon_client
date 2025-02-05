import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useMediaQuery } from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { PriceSlider } from "../PriceSlider/PriceSlider";
import { Typography } from "@mui/material";
import { CategoryFilter } from "../CategoryFilter/CategoryFilter";

type Anchor = "right";

interface SideBarProps {
  value: number;
  onChange: (newValue: number) => void;
  category: string;
  onSelect: (newCategory: string) => void;
}

/**
 * A responsive sidebar component for filtering and sorting items.
 * 
 * Features:
 * - Contains filters for price and category.
 * - Adapts to desktop and mobile views:
 *   - Desktop: Permanent drawer on the right.
 *   - Mobile: Temporary drawer with a toggle button.
 * - Utilizes Material-UI components for styling and layout.
 * 
 * Props:
 * - `value`: Current price filter value.
 * - `onChange`: Callback for updating the price filter.
 * - `category`: Current selected category.
 * - `onSelect`: Callback for selecting a new category.
 */

export function SideBar({
  value,
  onChange,
  category,
  onSelect,
}: SideBarProps): JSX.Element {
  const [state, setState] = useState({
    right: false,
  });

  const isMobile = useMediaQuery("(max-width: 480px)");

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="inherit"
        sx={{ paddingLeft: "32%", paddingTop: "10px" }}
      >
        Filter by Price{" "}
      </Typography>
      <List>
        <ListItem key="priceSlider" disablePadding>
          <PriceSlider value={value} onChange={onChange} />
        </ListItem>
      </List>
      <Divider />
      <Typography
        variant="inherit"
        sx={{ paddingLeft: "32%", paddingTop: "10px" }}
      >
        Filter by Category{" "}
      </Typography>
      <List>
        <ListItem key="CategoryFilter" disablePadding>
          <CategoryFilter category={category} onSelect={onSelect} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <aside className="SideBar">
      {!isMobile && (
        <Drawer
          variant="permanent"
          anchor="right"
          open
          sx={{
            "& .MuiDrawer-paper": { width: 250, marginTop: "68px" }, // Adjust width as needed
            display: "flex",
          }}
        >
          {list("right")}
        </Drawer>
      )}

      {isMobile && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "48px",
              right: "0px",
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              sx={{ fontSize: "8px" }}
              onClick={toggleDrawer("right", true)}
            >
              <SortIcon sx={{ fontSize: "9px" }} /> Sort & Filter{" "}
              <FilterAltIcon sx={{ fontSize: "9px" }} />
            </Button>
          </Box>
          <Drawer
            variant="temporary"
            anchor="right"
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </>
      )}
    </aside>
  );
}
