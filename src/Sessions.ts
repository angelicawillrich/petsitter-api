import { v4 as uuidv4 } from 'uuid';

interface SessionData {
    user: string,
    expiresAt: number
  }

export class Sessions {
    private static instance: Sessions

    private constructor() {
        this.sessions = {}
    }

    sessions: {[token: string]: SessionData}

    public static getInstance(): Sessions {
        if (!Sessions.instance) {
            Sessions.instance = new Sessions()
        }

        return Sessions.instance
    }

    public addSession(sessionData: SessionData) {
        const sessionId = uuidv4()
        this.sessions[sessionId] = sessionData

        return sessionId

    } 

    public getSessions() {
        return this.sessions
    }

    public getSessionById(id: string) {
        return this.sessions[id]
    }

    public deleteSessionById(id: string) {
        delete this.sessions[id]
    }
}

