export type EventType = {
  id?: string
  title: string
  description?: string
  allDay?: boolean
  end: Date
  start: Date
}

export type ViewType = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay' | 'listWeek'
