export type ClaimsType = {
  payload: {
    _id: string
    email: string
  }
  iat: number
  exp: number
  sub: string
}
