// import React from 'react'

// import { Box, H2, H5, H4, Text, Illustration, IllustrationProps, Button } from 'admin-bro'

// const Dashboard = (props) => {
//     return (
//         <Box>
//             <H2> Hello</H2>
//             <H5> Hello</H5>
//             <H4> Hello</H4>
//             <Text> Hello</Text>
//             <Button> Hello</Button>
//         </Box>

//     )
// }

// export default Dashboard


import React, { Component } from "react";

export default class ViralDashBoard extends Component {
  render() {
    const card = {
      border: "3px solid white",
      borderRadius: "10px",
      height: "150px",
      width: "120px",
      margin: "0 auto",
      marginLeft: "90px",
      marginTop: "120px",
      textAlign: "center",
      float: "left",
      align: "center"
    };

    return (
      <div>
        <div style={{ fontSize: 34, textAlign: "center", color: "white" }}>
          <h1>Bienvenue sur le Back-Office : <h2>REAL TIME APP</h2></h1>
          <br/>
          <h2>Projet : Enchères </h2>
          <br/>
          <h3>Par Alexandre OLIVA</h3>
        </div>
        </div>
    );
  }
}
