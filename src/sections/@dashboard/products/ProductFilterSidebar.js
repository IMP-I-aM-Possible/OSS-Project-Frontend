import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Radio,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { ColorMultiPicker } from '../../../components/color-utils';

// ----------------------------------------------------------------------

export const FILTER_CATEGORY_OPTIONS = ['all',"리놀레산","알파리놀레산","EPA","DHA","메티오닌","류신","이소류신","발린","라이신","페닐알라닌","티로신","트레오닌","트립토판","히스티딘","비타민A","비타민D","비타민E","비타민K","비타민C","티아민","리보플라빈","니아신","피리독신","엽산","코발라민","판토텐산","비오틴","칼슘","인","나트륨","염소","칼륨","마그네슘","철","아연","구리","불소","망간","요오드","셀레늄","몰리브덴","크롬"];


// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({openFilter, onOpenFilter, onCloseFilter,onChange,value }) {
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Category&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Category
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Category
              </Typography>
              <RadioGroup value={value} onChange={onChange}>
                {FILTER_CATEGORY_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
