import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import './Analysis.css'
import { Progress } from './Progress'

export function Analysis ({ onError, whatsapp }) {
  const [baseContent, setBaseContent] = useState(0)
  const [chatContent, setChatContent] = useState(0)
  const [splitMessages, setSplitMessages] = useState(0)
  const [chartContacts, setChartContacts] = useState(0)
  const [messagesForChartByDay, setMessagesForChartByDay] = useState(0)
  const [messagesForChartByMonth, setMessagesForChartByMonth] = useState(0)
  const [messagesForChartByYear, setMessagesForChartByYear] = useState(0)

  function onSetBaseContent (value) {
    setBaseContent(value || baseContent + 1)
  }
  function onSetChatContent (value) {
    setChatContent(value || chatContent + 1)
  }
  function onSplitMessages (value) {
    setSplitMessages(value || splitMessages + 1)
  }
  function onSetChartContacts (value) {
    setChartContacts(value || splitMessages + 1)
  }
  function onSetMessagesForChartByDay (value) {
    setMessagesForChartByDay(value || splitMessages + 1)
  }
  function onSetMessagesForChartByMonth (value) {
    setMessagesForChartByMonth(value || splitMessages + 1)
  }
  function onSetMessagesForChartByYear (value) {
    setMessagesForChartByYear(value || splitMessages + 1)
  }
  const whatsappCallBacks = { onSetBaseContent, onSetChatContent, onSplitMessages, onSetChartContacts, onSetMessagesForChartByDay, onSetMessagesForChartByMonth, onSetMessagesForChartByYear }

  useEffect(() => {
    whatsapp.setData(whatsappCallBacks)
    console.log(
      baseContent,
      chatContent,
      splitMessages,
      chartContacts,
      messagesForChartByDay,
      messagesForChartByMonth,
      messagesForChartByYear,
    )
  }, [])

  return (
    <>
      <Row>
        <p>
          Analysing...

          What's happening?
        </p>
      </Row>
      <Row>
        <Col xs={1}></Col>
        <Col>
          <Progress title = 'Base content' percentage={baseContent}></Progress>
          <Progress title = 'Chat content' percentage={chatContent}></Progress>
          <Progress title = 'Content split' percentage={splitMessages}></Progress>
          <Progress title = 'Content split' percentage={chartContacts}></Progress>
          <Progress title = 'Content split' percentage={messagesForChartByDay}></Progress>
          <Progress title = 'Content split' percentage={messagesForChartByMonth}></Progress>
          <Progress title = 'Content split' percentage={messagesForChartByYear}></Progress>
        </Col>
        <Col xs={1}></Col>
      </Row>
    </>
  )
}
