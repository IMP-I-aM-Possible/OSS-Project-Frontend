import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import server from '../_mock/server'
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import Loading from 'src/Loading';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: '제품사진', alignRight: false },
  { id: 'role', label: '이름', alignRight: false },
  { id: 'isVerified', label: '날짜', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [USERLIST, setUSERLIST] = useState(0)
  const [counter, setCounter]= useState(1)
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');
  const [switchchecked, setSwitchchecked] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(false);
  const [ uid, setId ]= useState(sessionStorage.getItem("uid"))
  const accessToken=sessionStorage.getItem("accessToken")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false);
      console.log(uid)
       var response =await axios.post(
        server.ip+"userpage",{uid},{headers:{
          authorization: accessToken
        }}
      );
      console.log(response.data.nutrient)
      setUSERLIST(response.data.nutrient)
      setLoading(true);
    };
    fetchData();
  }, []);
  
  if(loading==false){
    return(
      <Loading/>
    )
  }
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);
  const filteredAndSortedUsersnon = filteredUsers.filter((row) => row.expired_at == null);
 
  const filteredAndSortedUsers = filteredUsers.filter((row) => row.expired_at !== null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredAndSortedUsersnon.map((n) => n.nid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const handleswitchChange = (event) =>{
    setSwitchchecked(switchchecked?false:true)
    setPage(0)
  }
 
  const onDelete = () =>{
    const fetchData = async () => {
      setLoading(false);
       var res =await axios.post(
        server.ip+"userpage/delete",{uid,selected}
      );
      console.log(res.data)
      var response =await axios.post(
        server.ip+"userpage",{uid},{headers:{
          authorization: accessToken
        }}
      );
      console.log(response.data.nutrient)
      setUSERLIST(response.data.nutrient)
      setLoading(true);


    };
    fetchData();
    setSelected([])

  }
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;


  const isNotFound = !filteredUsers.length && !!filterName;
  function formatDataWithUnit(data) {
    const units = ['mcg', 'mg', 'g']; // 단위 배열 (빈 문자열부터 T까지)
  
    let unitIndex = 0;
    while (data > 1000 && unitIndex < units.length - 1) {
      // 데이터가 1000 이상일 때와 단위 배열의 범위 내에 있는 동안 반복
      data /= 1000;
      unitIndex++;
    }
  
    return {
      value: data, // 소수점 두 자리까지 표시 (필요에 따라 조정 가능)
      unit: units[unitIndex],
    };
  }
  return (
    <>
      <Helmet>
        <title> User | MyPill </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} onDelete={onDelete} switchchecked={switchchecked} handleswitchChange={handleswitchChange}/>
        
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredAndSortedUsersnon.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                {switchchecked==1?( 
                  filteredAndSortedUsersnon.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { created_at, expired_at,nid,name,count ,company, nutrient_info} = row;
                    const selectedUser = selected.indexOf(nid) !== -1;

                    return (
              
                      <TableRow hover key={nid} tabIndex={-1} role="checkbox" selected={selectedUser} style={{
                        height: 180
                      }}>
                        <TableCell padding="checkbox" py={10}>
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, nid)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack  alignItems="center" spacing={1}>
                            <Avatar alt={name} src={server.ip+'image/'+nid+'.jpg'} sx={{width:150,height:150}}/>

                          </Stack>
                        </TableCell>

                        <TableCell align="left">                            
                            <Typography variant="h6" noWrap>
                              {name}
                            </Typography>
                            <Typography variant="subtitle2" noWrap>
                              {company}
                            </Typography>
                              {Object.entries(nutrient_info).map(([key, value]) => {
                                const { value: formattedValue, unit } = formatDataWithUnit(value);
                                  return (
                                    <Label color={'success'} key={key}>
                                      {`${key}:${formattedValue}${unit}`}
                                    </Label>
                                    );
                                  })}
                          </TableCell>

                        <TableCell align="left">{format(new Date(created_at), 'yyyy년 M월 d일')}</TableCell>
                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                        
                      </TableRow>
                    );
                  })) : (
                    filteredAndSortedUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { expired_at,nid,name,count ,company, nutrient_info} = row;
                      const selectedUser = selected.indexOf(nid) !== -1;
  
                      return (
                
                        <TableRow hover key={nid} tabIndex={-1} role="checkbox" selected={selectedUser} style={{
                          height: 180
                        }}>
                          <TableCell padding="checkbox" py={10}>
                          <Checkbox checked={selectedUser} disabled  onChange={(event) => handleClick(event, nid)} />
  
                          </TableCell>
  
                          <TableCell component="th" scope="row" padding="none">
                            <Stack  alignItems="center" spacing={1}>
                              <Avatar alt={name} src={server.ip+'image/'+nid+'.jpg'} sx={{width:150,height:150}}/>
  
                            </Stack>
                          </TableCell>
  
                          <TableCell align="left">                            
                              <Typography variant="h6" noWrap>
                                {name}
                              </Typography>
                              <Typography variant="subtitle2" noWrap>
                                {company}
                              </Typography>
                                {Object.entries(nutrient_info).map(([key, value]) => {
                                  const { value: formattedValue, unit } = formatDataWithUnit(value);
                                    return (
                                      <Label color={'success'} key={key}>
                                        {`${key}:${formattedValue}${unit}`}
                                      </Label>
                                      );
                                    })}
                            </TableCell>
  
                          <TableCell align="left">{format(new Date(expired_at), 'yyyy년 M월 d일')}</TableCell>
                          <TableCell align="right">
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                          
                        </TableRow>
                      );
                    })
                  )
                  }
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
   
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>              
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count= {switchchecked==1? filteredAndSortedUsersnon.length:filteredAndSortedUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
