interface SessionData {
    user: string,
    expiresAt: number
  }
  
  export const sessions: {[token: string]: SessionData} = {};