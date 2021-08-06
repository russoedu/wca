import React from 'react';
// import { useDropzone } from 'react-dropzone'
import './Analysis.css';

export function Analysis(props) {
  const file = props.location.state.file
  // const [dropClass, setDropClass] = useState('leave')
  console.log(file)
  return (
    <>
      <p>
        Analysing...

        What's happening?
      </p>
    </>
  );
}