import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography,Breadcrumbs } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import { fetchproduct } from 'src/servies';
import axios from 'axios';
import '../Paging.css';
import Pagination from "react-js-pagination";
import StarRatings from 'react-star-ratings';
import Link from '@mui/material/Link';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import server from '../_mock/server'
// ----------------------------------------------------------------------
import { useLocation, useParams } from "react-router-dom";
import {useLoacation} from 'react-router-dom'

export default function ProductsPage() {
  const offset = 1;
  const [nutritional,setnutritional]=useState([]);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(false);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('all');
  const{nid}= useParams()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search'); // id 취득
  const type = searchParams.get('type'); 
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let info
      let domain
      if(type==1){
        info='name'
        domain="nutritional/find"
        console.log(type)
      }
      else if (type==2){
        info='symptom'
        domain="nutritional/find"
      }
      else{
        info='all'
        domain="nutritional/include"
      }
      console.log(info)
      const response = await axios.get(
        server.ip+domain+"?offset="+page+"&info="+info+"&search="+search
      );
      // console.log(response.data.includeInfo)
      // setPosts(response.data.includeInfo);
      console.log(response.data)
      setPosts(response.data.includeInfo);
      setLoading(false);
    };
    fetchData();
  }, []);
  console.log(search)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(
        server.ip+"nutritional/include?offset="+page+"&info="+value
      );
      console.log(response.data.includeInfo)
      setPosts(response.data.includeInfo);
      setLoading(false);
    };
    fetchData();
  }, [page]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setPage(1)
      const response = await axios.get(
        server.ip+"nutritional/include?offset="+page+"&info="+value
      );
      console.log(response.data.includeInfo)
      setPosts(response.data.includeInfo);
      setLoading(false);
    };
    fetchData();
  }, [value]);
  



  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
 
  const onChange =(e) =>{
    setValue(e.target.value)
  }
  console.log(page)
  
  if(posts==false){
    return('로딩중')
  }
  if(posts==undefined){
    return('로딩중')
  }
  
  return (
    <>
    
      <Helmet>
        <title> IMP: 상품 | Minimal UI </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        {value}
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              onChange={onChange}
              value={value}
            />
            <ProductSort />
          </Stack>
        </Stack>
    
        <ProductList products={posts} />
        <ProductCartWidget />
        <Pagination
        activePage={page}
        itemsCountPerPage={48}
        totalItemsCount={1000}
        pageRangeDisplayed={7}
        prevPageText={"‹"}
       nextPageText={"›"}
        onChange={handlePageChange}
      />
      </Container>
    </>
  );

}