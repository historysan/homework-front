import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import Dropzone from 'react-dropzone'
import { v4 as uuidv4 } from 'uuid'
import { uploadFilesMutation } from './gql'
import './App.css';

const App = () => {

  useEffect(() => {
    setUserId(uuidv4())
  }, [])

  const [files, setFiles] = useState()
  const [userId, setUserId] = useState()

  const [uploadFiles] = useMutation(uploadFilesMutation)

  const onFileChange = files => {
    setFiles(files)
  }

  const onSubmit = async () => {
    const { data } = await uploadFiles({
      variables: {
        files,
        record: {
          userId
        }
      }
    })
    console.log('data: ', data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Dropzone multiple onDrop={onFileChange} maxSize={5242880}>
          {({ getRootProps, getInputProps, isDragActive, fileRejections, acceptedFiles }) => (
            <section>
              <div {...getRootProps()}>
                <input type="file" {...getInputProps()} />
                {isDragActive ? "Drop it like it's hot!" : 'Click me or drag a files to upload!'}
                {fileRejections.length > 0 && (
                  <div>
                    File is too large
                  </div>
                )}
                <ul>
                  {acceptedFiles.length > 0 && acceptedFiles.map((acceptedFile, i) => (
                    <li key={i}>
                      {acceptedFile.name}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={onSubmit} disabled={!files}>Upload</button>
      </header>
    </div>
  );
}

export default App;
