//동기식 방식 ( async await 사용!!!!!)
import axios from 'axios';
import user from './user';
import debounce from 'lodash/debounce';
import { useSelector } from 'react-redux';
//import Cookies from 'js-cookie';
import server from './_mock/server'

export const FetchLogin = async (test) => {
  //하는중 원래는 아래쪽
  return await axios.post(server.ip+'login', test)
    .then(function (response) {
      console.log(response.data)
        // user.User(response.data.id,response.data.sc,response.data.sc,response.data.sc,response.data.sc,response.data.sc)
        if(response.data.sc == '200'){   
            console.log("asdasdsad")
            return response.data;
        }
        else
          return 'fail';
    })
    .catch(function (error) {
        console.log(error);
        return 'fail';
    }); 
    
  };
  export const fetchcheckId = async (test) => {
    console.log(test)
    //하는중 원래는 아래쪽
    return await axios.post(server.ip+'signup/check', test)
      .then(function (response) {
          console.log(response.data.sc)
          if(response.data.sc == '200'){
            console.log('sdfsdfsdf') 
              return 'success';
          }
          else
              return 'fail';
      })
      .catch(function (error) {
          console.log(error);
          return 'fail';
      }); 
    };

    export const fetchcheckUsername = async (test) => {
      console.log(test)
      //하는중 원래는 아래쪽
      return await axios.post(server.ip+'signup/usernameCheck', test)
        .then(function (response) {
            console.log(response.data.sc)
            if(response.data.sc == '200'){
              console.log('sdfsdfsdf') 
                return 'success';
            }
            else
                return 'fail';
        })
        .catch(function (error) {
            console.log(error);
            return 'fail';
        }); 
      };

      export const fetchcheckEmail = async (test) => {
        console.log(test)
        //하는중 원래는 아래쪽
        return await axios.post(server.ip+'signup/emailCheck', test)
          .then(function (response) {
              console.log(response.data.sc)
              if(response.data.sc == '200'){
                console.log('sdfsdfsdf') 
                  return 'success';
              }
              else
                  return 'fail';
          })
          .catch(function (error) {
              console.log(error);
              return 'fail';
          }); 
        };
  

    export const fetchSignup = async (test) => {
      console.log(test)
      console.log(server.ip+'signup')
      //하는중 원래는 아래쪽
      return await axios.post(server.ip+'signup', test)
        .then(function (response) {
            console.log(response.data.sc)
            if(response.data.sc == '200')          
                return 'success';
            else
                return 'fail';
        })
        .catch(function (error) {
            console.log(error);
            return 'fail';
        });   
      };
      export const fetchSignuser = async (test) => {
        console.log(test)
    
        //하는중 원래는 아래쪽
        axios.post('http://192.168.0.239:3000/signup/info', test)
          .then(function (response) {
              console.log(response.data.sc)
              if(response.data.sc == '200')          
                  return 'success';
              else
                  return 'fail';
          })
          .catch(function (error) {
              console.log(error);
              return 'fail';
          });   
        };


      export const fetchMain = async (test) => {
        console.log(test)
        
        //하는중 원래는 아래쪽
        return await axios.post('http://192.168.0.239:3000/main', test)
          .then(function (response) {
              console.log(response.data.sc)
              if(response.data.sc == '200')     
                return 'success'
              else
                return 'fail';
          })
          .catch(function (error) {
              console.log(error);
              return 'fail';
          }); 
          
        };
//수정 필요 !! 필요필요
        export const checkmain = async (test) => {
          console.log(test)
          
          //하는중 원래는 아래쪽
          return await axios.post('http://192.168.1.9:3000/main', test)
            .then(function (response) {
                console.log(response.data.sc)
                if(response.data.sc == '200')     
                  return 'success'
                else
                  return 'fail';
            })
            .catch(function (error) {
                console.log(error);
                return 'fail';
            }); 
            
          };


          export const fetchproduct = async (test) => {
            console.log(test)
            
            //하는중 원래는 아래쪽
            return await axios.get('http://192.168.1.9:3000/nutritional/information?offset='+test)
              .then(function (response) {
                  if(response.data.sc == '200') {
                    console.log(response.data.nutritional)
                    return response.data.nutritional
                  }
                  else
                    return 'fail';
              })
              .catch(function (error) {
                  console.log(error);
                  return 'fail';
              }); 
              
            };

          