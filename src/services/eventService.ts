import api, { EndPoints } from '../api/axios'
import { EventType } from '../models/calendar-type'

export async function getEventsAxios(token: string) {
  return await api.get<EventType[]>(EndPoints.events, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
export async function postEventAxios(event: EventType, token: string) {
  return await api.post<EventType>(EndPoints.events, event, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export async function putEventAxios(event: EventType, token: string) {
  return await api.put<EventType>(`${EndPoints.events}/${event.id}`, event, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}

export async function deleteEventAxios(eventId: string, token: string) {
  return await api.delete<{ message: string }>(`${EndPoints.events}/${eventId}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
