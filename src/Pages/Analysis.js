import React from 'react'
import { useHistory } from 'react-router-dom'
import './Analysis.css'

export function Analysis (props) {
  const history = useHistory()
  try {
    const file = props.location.state.file
    // const [dropClass, setDropClass] = useState('leave')
    console.log(file)
  } catch (error) {
    console.error('File not found, going back...')
    history.push({
      pathname: '/',
    })
  }
  return (
    <>
      <p>
        Analysing...

        What's happening?
      </p>
    </>
  )
}
