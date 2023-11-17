import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import AWS from 'aws-sdk';
import { Storage, Auth } from 'aws-amplify';

function App() {
  var items: any = [];
  const [val, searchVal] = useState("");
  const [data, setData] = useState([]);
  const [itemss, setItemss] = useState([]);

  useEffect(() => {
    // fetch('https://s3.console.aws.amazon.com/s3/buckets/testing31052000')
    //   .then((response) => response.text())
    //   .then(data => {
    //     console.log(data)
    //   });
    // console.log("welcome")
    // async function fetchS3Items() {
    //   try {
    //     const user = await Auth.currentAuthenticatedUser();
    //     const username = "user01";

    //     const s3Items = await Storage.list(`${username}/`, { level: 'protected' });
    //     console.log(s3Items)
    //     // setItemss(s3Items);
    //   } catch (error) {
    //     console.error('Error fetching S3 items:', error);
    //   }
    // }

    // fetchS3Items();

  }, [])
  const AWS = require('aws-sdk');
  var region = "us-east-1";
  // var accessKeyId = "AKIAYROIFTEEFRWXJLHI";
  // var secretAccessKey = "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";
  var accessKeyId = "AKIAYROIFTEEDYRQWW6P";
  var secretAccessKey = "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";
  AWS.config.update({
    region: region,
    credentials: new AWS.Credentials(accessKeyId, secretAccessKey)
  });
  // AWS.config.update({
  //   region: region, // e.g., 'us-west-1'
  //   credentials: new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: 'c54bbdbc-e546-4001-acfe-40171af10c89', // Replace with your Identity Pool ID
  //   }),
  // });
  var s3 = new AWS.S3();

  // const getFiles = (bucketname: any) => {
  //   s3.listObjectsV2({ Bucket: bucketname }, (err: any, value: any) => {
  //     if (err) {
  //       console.log(err)
  //     } else {
  //       console.log(value)
  //       setData(value.Contents);
  //     }
  //   })
  // }
  const getFiles = (bucketName: any, folderPath: any) => {
    const params = {
      Bucket: bucketName,
      Delimiter: '/',
      Prefix: folderPath
    };

    s3.listObjectsV2(params, (err: any, data: any) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data.Contents);
        // Process the data as needed
      }
    });
  };
  useEffect(() => {
    var filteredItems = data.filter((item: any, key: any) => {
      return item.Key.toLowerCase().includes(val.toLowerCase())
    }).map((items: any, keys: any) => {
      return items;
    })
    console.log(filteredItems);
    // data.map((item: any, key: any) => {
    //   var imageLink = s3.getSignedUrl('getObject', {
    //     Bucket: "testing31052000",
    //     Key: item.Key
    //   })
    //   console.log(imageLink);
    // })
  }, [val])

  // const AWS = require('aws-sdk');

  //   // Configure AWS with your credentials
  //   AWS.config.update({
  //     region: 'us-east-1',
  //     accessKeyId: 'AKIAYROIFTEEFRWXJLHI',
  //     secretAccessKey: 'orUTCzmg/0kAE1YOjbHYIniXgWQLkusvD7kLMjv+'
  //   });

  //   // Create an S3 client
  //   var s3 = new AWS.S3();

  // // Function to get a file from the S3 bucket
  // const getFileFromS3 = (key: any) => {
  //   const params = { Bucket: 'testing31052000', Key: key };
  //   s3.getObject(params, (err: any, data: any) => {
  //     if (err) {
  //       console.error('Error:', err);
  //     } else {
  //       console.log('File:', data);
  //     }
  //   });
  // };


  return (
    <>
    <h2>Friday</h2>
      <p>Test</p>
      <button onClick={() => getFiles("testing31052000", "Folder1")}>Get Data</button>
      <input type='search' onChange={(e) => searchVal(e.target.value)} />
      {/* <button onClick={() => getFileFromS3("testing31052000/demo1/demo2")}>Get Data</button> */}
    <h1>Demo</h1>

    <h1>
      Ananth
    </h1>
    <p>new world</p>

    </>
  );
}

export default App;
