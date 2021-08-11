import React, { useState, useCallback } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { Whatsapp } from '../Converter/Whatsapp'
import './Analysis.css'

export function Analysis ({ file, errorCb }) {
  const [baseContent, setBaseContent] = useState(0)
  const [chatContent, setChatContent] = useState('Chat content: 0')
  const [splitMessages, setSplitMessages] = useState('Splitting messages: 0')
  const [chartContacts, setChartContacts] = useState('Chart contacts: 0')
  const [messagesForChartByDay, setMessagesForChartByDay] = useState('Chart by day: 0')
  const [messagesForChartByMonth, setMessagesForChartByMonth] = useState('Chart by month: 0')
  const [messagesForChartByYear, setMessagesForChartByYear] = useState('Chart by year: 0')

  // const onSetBaseContent = useEffect((current, total) => {
  //   console.log(current, total)
  //   setBaseContent((current / total) * 100)
  //   console.log(current, total)
  // }, [baseContent])

  const onSetChatContent = useCallback((current, total) => {
    console.log(current, total)
    setChatContent(`Chat content: ${current}, ${total}`)
  }, [])

  const onSplitMessages = useCallback((current, total) => {
    console.log(current, total)
    setSplitMessages(`Splitting messages: ${current}, ${total}`)
  }, [setSplitMessages])

  const onSetChartContacts = useCallback((current, total) => {
    console.log(current, total)
    setChartContacts(`Chart contacts: ${current}, ${total}`)
  }, [setChartContacts])

  const onSetMessagesForChartByDay = useCallback((current, total) => {
    console.log(current, total)
    setMessagesForChartByDay(`Chart by day: ${current}, ${total}`)
  }, [setMessagesForChartByDay])

  const onSetMessagesForChartByMonth = useCallback((current, total) => {
    console.log(current, total)
    setMessagesForChartByMonth(`Chart by month: ${current}, ${total}`)
  }, [setMessagesForChartByMonth])

  const onSetMessagesForChartByYear = useCallback((current, total) => {
    console.log(current, total)
    setMessagesForChartByYear(`Chart by year: ${current}, ${total}`)
  }, [setMessagesForChartByYear])

  const whatsappCallBacks = { onSetBaseContent: setBaseContent, onSetChatContent, onSplitMessages, onSetChartContacts, onSetMessagesForChartByDay, onSetMessagesForChartByMonth, onSetMessagesForChartByYear }

  const whatsapp = new Whatsapp(file, whatsappCallBacks)
  console.log(whatsapp)
  // useEffect(() => {
  //   const whatsapp = new Whatsapp(file, whatsappCallBacks)
  //   // // let whatsapp
  //   // // try {
  //   //   // const chartByDay = new Chart(whatsapp.chartDataByDay)
  //   //   // const chartByMonth = new Chart(whatsapp.chartDataByMonth)
  //   //   // const chartByYear = new Chart(whatsapp.chartDataByYear)
  //   //   // const [dropClass, setDropClass] = useState('leave')
  //   //   console.log(whatsapp)
  //   // } catch (error) {
  //   //   console.error('File not found, going back...')
  //   //   whatsapp = null
  //   //   error()
  //   // }
  //   // Update the document title using the browser API
  // })

  return (
    <>
      <p>
        Analysing...

        What's happening?
      </p>

      <p>Base content:</p>
      <ProgressBar now={baseContent} label={`${baseContent}%`}/>
      <p>Chat content: {chatContent}</p>
      <p>Splitting messages: {splitMessages}</p>
      <p>Chart contacts: {chartContacts}</p>
      <p>Chart by day: {messagesForChartByDay }</p>
      <p>Chart by month: {messagesForChartByMonth}</p>
      <p>Chart by year: {messagesForChartByYear}</p>
    </>
  )
}
