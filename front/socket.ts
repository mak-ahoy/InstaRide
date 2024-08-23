import { io } from 'socket.io-client'

export const socket = io("http://localhost:8000")

    socket.on('connect', () => {
        console.log("connected to server!")
    })