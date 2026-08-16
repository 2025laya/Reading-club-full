import React from 'react';
import Swal from 'sweetalert2';

export default function Logout(props) {
  
  async function gotodelete() {
    const token = localStorage.getItem('token'); 

    if (!token) {
      Swal.fire({
        title: "Error!",
        text: "You are not logged in!",
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#d33'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/me', {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          
          'Authorization': `Bearer ${token}`,

          'token': token,
          'x-auth-token': token
        }
      });

      if (response.ok ) {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 

        Swal.fire({
          title: "Logged out!",        
          text: "You have been logged out successfully.",   
          icon: 'success',        
          confirmButtonText: 'Ok',
          confirmButtonColor: '#3085d6', 
          timer: 1500  
        }).then(() => {
          props.setpage('home'); 
        });
      } else {
        localStorage.removeItem('token'); 
        localStorage.removeItem('user'); 

        Swal.fire({
          title: "Session Expired",
          text: "Your session was already invalid, logging you out.",
          icon: 'warning',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#eeaeca'
        }).then(() => {
          props.setpage('home'); 
        });
      }

    } catch (error) {
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 

      Swal.fire({
        title: "Connection Failed",
        text: "Could not connect to server, local session cleared.",
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#d33'
      }).then(() => {
        props.setpage('home'); 
      });
    }
  }

  function handleCancel() {
    if(props.setpage) {
        props.setpage('home');
    } else {
        window.history.back();
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#e9d5ff97",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "playpen, sans-serif",
      }}
    >
      <h3>Do you want to Delete Account?</h3>
      <div style={{ display: "flex", gap: "40px", marginTop: "30px" }}>
        
        <button
          onClick={gotodelete} 
          style={{
            boxShadow: "-2px -1px 6px 0px rgba(0,0,0,0.2)",
            backgroundColor: "#eeaeca",
            height: "40px",
            border: "none",
            borderRadius: "25px",
            padding: "0 25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Confirm
        </button>

        <button
          onClick={handleCancel}
          style={{
            boxShadow: "-2px -1px 6px 0px rgba(0,0,0,0.2)",
            backgroundColor: "#eeaeca",
            height: "40px",
            border: "none",
            borderRadius: "25px",
            padding: "0 25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "18px",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
