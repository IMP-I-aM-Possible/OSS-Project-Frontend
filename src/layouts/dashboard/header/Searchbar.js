import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener, ToggleButton, ToggleButtonGroup } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(1),
  marginLeft: theme.spacing(1),
  flexDirection: 'row',
  '& .MuiToggleButton-root': {
    minWidth: 39,
  },
}));

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [ratio, setRatio] = useState('name');
  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    //window.location.replace("/dashboard/products/"+value); 
  };

  const handleSearch = () => {
    setOpen(false);
    let searchQuery = "/dashboard/products?search=" + value;
    if (ratio) {
      searchQuery += "&value=" + ratio;
    }
    window.location.replace(searchQuery);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton onClick={handleOpen}>
            <Iconify icon="eva:search-fill" />
          </IconButton>
        )}

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar>
            <StyledToggleButtonGroup
              value={ratio}
              exclusive
              onChange={(event, newRatio) => setRatio(newRatio)}
              size="small"
              aria-label="Ratio"
            >
              <ToggleButton value="name" aria-label="Name">
                이름
              </ToggleButton>
              <ToggleButton value="symptom" aria-label="Symptom">
                증상
              </ToggleButton>
            </StyledToggleButtonGroup>

            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              onChange={(e) => setValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              sx={{ fontWeight: 'fontWeightBold' }}
            />

            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
