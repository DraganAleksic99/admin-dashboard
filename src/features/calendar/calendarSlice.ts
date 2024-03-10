import { createSlice, Action, PayloadAction } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'
import { RootState } from '../../store/configureStore'
import { EventType } from '../../models/calendar-type'
import api, { EndPoints } from '../../api/axios'
import {
  getEventsAxios,
  postEventAxios,
  putEventAxios,
  deleteEventAxios
} from '../../services/eventService'

export type AppThunk = ThunkAction<void, RootState, null, Action<string>>

interface CalendarState {
  events: EventType[]
  isModalOpen: boolean
  selectedEventId?: string
  selectedRange: {
    start: number
    end: number
  }
  loading: boolean
  error: string
}

const initialState: CalendarState = {
  events: [],
  isModalOpen: false,
  selectedEventId: null,
  selectedRange: null,
  loading: false,
  error: ''
}

const calendarNamespace = 'calendar'

const slice = createSlice({
  name: calendarNamespace,
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    getEvents(state, action: PayloadAction<EventType[]>) {
      state.events = action.payload
    },
    createEvent(state, action: PayloadAction<EventType>) {
      state.events.push(action.payload)
    },
    selectEvent(state, action: PayloadAction<string>) {
      state.isModalOpen = true
      state.selectedEventId = action.payload
    },
    updateEvent(state, action: PayloadAction<EventType>) {
      const index = state.events.findIndex(e => e.id === action.payload.id)
      state.events[index] = action.payload
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.events = state.events.filter(e => e.id !== action.payload)
    },
    selectRange(state, action: PayloadAction<{ start: number; end: number }>) {
      const { start, end } = action.payload
      state.isModalOpen = true
      state.selectedRange = {
        start,
        end
      }
    },
    openModal(state) {
      state.isModalOpen = true
    },
    closeModal(state) {
      state.isModalOpen = false
      state.selectedEventId = null
      state.selectedRange = null
    }
  }
})

export const getEvents =
  (token: string): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true))
    dispatch(slice.actions.setError(''))

    try {
      const { data } = await getEventsAxios(token)

      // @ts-ignore
      data.forEach(data => (data.id = data._id))

      dispatch(slice.actions.getEvents(data))
    } catch (error: any) {
      console.log(error.message)
      dispatch(slice.actions.setError(error.message))
    } finally {
      dispatch(slice.actions.setLoading(false))
    }
  }

export const selectEvent =
  (id?: string): AppThunk =>
  dispatch => {
    dispatch(slice.actions.selectEvent(id))
  }

export const selectRange =
  (start: Date, end: Date): AppThunk =>
  dispatch => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    )
  }

export const openModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.openModal())
}

export const closeModal = (): AppThunk => dispatch => {
  dispatch(slice.actions.closeModal())
}

export const createEvent =
  (event: EventType, token: string): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true))
    dispatch(slice.actions.setError(''))

    try {
      const { data } = await postEventAxios(event, token)
      dispatch(slice.actions.createEvent(data))
    } catch (error: any) {
      console.log(error.message)
      dispatch(slice.actions.setError(error.message))
    } finally {
      dispatch(slice.actions.setLoading(false))
    }
  }

export const updateEvent =
  (event: EventType, token: string): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true))
    dispatch(slice.actions.setError(''))

    try {
      const { data } = await putEventAxios(event, token)
      dispatch(slice.actions.updateEvent(data))
    } catch (error: any) {
      console.log(error.message)
      dispatch(slice.actions.setError(error.message))
    } finally {
      dispatch(slice.actions.setLoading(false))
    }
  }

export const deleteEvent =
  (id: string, token: string): AppThunk =>
  async dispatch => {
    dispatch(slice.actions.setLoading(true))
    dispatch(slice.actions.setError(''))

    try {
      await deleteEventAxios(id, token)
      dispatch(slice.actions.deleteEvent(id))
    } catch (error: any) {
      console.log(error.message)
      dispatch(slice.actions.setError(error.message))
    } finally {
      dispatch(slice.actions.setLoading(false))
    }
    await api.delete(`${EndPoints.events}/${id}`)
    dispatch(slice.actions.deleteEvent(id))
  }

export default slice.reducer
