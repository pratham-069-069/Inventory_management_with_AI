"use client"

import { useState } from "react"
import { Button } from "./ui/button"  // Changed path
import { Input } from "./ui/input"    // Changed path
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "./ui/card"                   // Changed path
import { FiMessageSquare } from "react-icons/fi"

// Rest of the component remains the same
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }])
      setInput("")
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "I'm a chatbot. How can I assist you?", sender: "bot" }])
      }, 1000)
    }
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(!isOpen)}>
        <FiMessageSquare className="h-6 w-6" />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-80">
          <CardHeader>
            <CardTitle>Chatbot Assistant</CardTitle>
          </CardHeader>
          <CardContent className="h-64 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                <span
                  className={`inline-block rounded-lg px-3 py-2 ${
                    message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

export default Chatbot

