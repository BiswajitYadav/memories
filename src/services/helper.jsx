import io from 'socket.io-client'

export const SERVER_URL = "http://localhost:8888/api/"
export const IO_SERVER_URL = "http://localhost:8888"

// export const IO_SERVER_URL = "https://memories-backend-legacy.onrender.com"
// export const SERVER_URL = "https://memories-backend-legacy.onrender.com/api/"
export const socket = io.connect(`${IO_SERVER_URL}`)