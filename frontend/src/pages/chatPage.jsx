import React from 'react'

const chatPage = () => {

    const fetchChats =  async () => {
        const data = await axios.get('api/chat');
    }
  return (<div>Chat Page </div>)
}

export default chatPage
