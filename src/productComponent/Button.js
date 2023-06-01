import * as React from 'react';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';
import server from '../_mock/server'
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
export default function OutlinedButtons(props) {
  const { nid } = useParams();
  const [Add, setAdd] = useState([]);
  const uid = sessionStorage.getItem("uid");
  const count = 1;
  const [showAlert, setShowAlert] = useState('2'); // 알림 표시 여부를 관리하기 위한 상태 추가

  const handleClick = (event) => {
    event.preventDefault();
    console.log('uid:', uid);
    console.log('nid:', nid);
    console.log('count:', count);

    fetch(server.ip + 'add', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, nid, count }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Add successful.');
          setAdd([...Add, { uid, nid, count }]);
          setShowAlert('1'); // 알림 표시 상태를 true로 설정
        } else {
          console.error('Error adding:', response.statusText);
          setShowAlert('3');
        }
      })
      .catch(error => console.error('Error adding:', error));
  };

  return (
    <>
    {console.log(useSelector((state) => state.DATA))}
     {showAlert == '2'&& (
      <Button
        color="success"
        variant="outlined"
        href="#outlined-buttons"
        endIcon={<AddBoxIcon />}
        onClick={handleClick}
      >
        내가 먹는 영양제에 추가
      </Button>
     )}

      {showAlert =='1'&& ( // showAlert 상태가 true인 경우에만 알림 창 표시
        <Alert severity="success" onClose={() => setShowAlert('2')}>
          영양제가 추가되었습니다.
        </Alert>
      )}
            {showAlert=='3'&& ( // showAlert 상태가 true인 경우에만 알림 창 표시
        <Alert severity="error" onClose={() => setShowAlert('2')}>
          영양제가 추가되었습니다.
        </Alert>
      )}
    </>
  );
}