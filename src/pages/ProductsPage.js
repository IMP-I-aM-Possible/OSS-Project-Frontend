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
import Loading from 'src/Loading';

export default function ProductsPage() {
  const offset = 1;
  const [count,setCount]=useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(false);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('search'); // id 취득
  const page=Number(searchParams.get('page')==null?1:searchParams.get('page'))
  const value = (searchParams.get('value')==null?'all':searchParams.get('value'));
  const{nid}= useParams()
 console.log(page)
  const handlePageChange = (page) => {
    window.location.href="/dashboard/products?page="+page+"&value="+value+"&search="+search
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let domain
   
      if(value== "name" || value== "symptom"){
        domain="nutritional/find"
        console.log(value)
      }
      else{
        domain="nutritional/include"
      }
      const response = await axios.get(
        server.ip+domain+"?offset="+page+"&info="+value+"&search="+search
      );
      // console.log(response.data.includeInfo)
      // setPosts(response.data.includeInfo);
      console.log(response.data)
      setPosts(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
 
  const onChange =(e) =>{
    window.location.href="/dashboard/products?value="+e.target.value
  }
  console.log(page)

  if(posts==undefined || posts==false){
    return(
      <Loading/>
    )
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
    
        <ProductList products={posts.includeInfo} />
        <Pagination
        activePage={page}
        itemsCountPerPage={48}
        totalItemsCount={posts.len}
        pageRangeDisplayed={7}
        prevPageText={"‹"}
       nextPageText={"›"}
        onChange={handlePageChange}
      />
      </Container>
    </>
  );

}