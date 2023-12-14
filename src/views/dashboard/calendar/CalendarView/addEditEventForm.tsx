import moment from 'moment-timezone'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { useSnackbar } from 'notistack'
import { DateTimePicker } from '@mui/x-date-pickers'
import { Trash as TrashIcon } from 'react-feather'
import { useDispatch } from 'react-redux'
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  styled,
  SvgIcon,
  Switch,
  TextField,
  Typography
} from '@mui/material'
import { createEvent, deleteEvent, updateEvent } from '../../../../features/calendar/calendarSlice'
import { EventType } from '../../../../models/calendar-type'

type Props = {
  event?: EventType
  onAddComplete?: () => void
  onCancel?: () => void
  onDeleteComplete?: () => void
  onEditComplete?: () => void
  range?: { start: number; end: number }
}

const StyledConfirmButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2)
}))

const AddEditEventForm = ({
  event,
  onAddComplete,
  onCancel,
  onDeleteComplete,
  onEditComplete,
  range
}: Props) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const isCreating = !event

  const handleDelete = async (): Promise<void> => {
    try {
      //@ts-ignore
      dispatch(deleteEvent(event?.id))
      onDeleteComplete()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Formik
      initialValues={getInitialValues(event, range)}
      validationSchema={Yup.object().shape({
        allDay: Yup.bool(),
        description: Yup.string().max(5000),
        end: Yup.date().when('start', (start, schema: Yup.DateSchema) => {
          if (start) {
            return schema.min(start, 'End date must be later than start date')
          }
          return schema
        }),
        start: Yup.date(),
        title: Yup.string().max(255).required('Title is required')
      })}
      onSubmit={async (values, { resetForm, setErrors, setStatus, setSubmitting }) => {
        try {
          const data = {
            allDay: values.allDay,
            description: values.description,
            end: values.end,
            start: values.start,
            title: values.title,
            id: ''
          }
          if (event) {
            data.id = event.id
            //@ts-ignore
            dispatch(updateEvent(data))
          } else {
            //@ts-ignore
            dispatch(createEvent(data))
          }
          resetForm()
          setStatus({ success: true })
          setSubmitting(false)
          enqueueSnackbar('Calendar updated', {
            variant: 'success'
          })
          if (isCreating) {
            onAddComplete()
          } else {
            onEditComplete()
          }
        } catch (err: any) {
          console.error(err)
          setStatus({ success: false })
          setErrors({ submit: err.message })
          setSubmitting(false)
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldTouched,
        setFieldValue,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography align="center" gutterBottom variant="h3" color="textPrimary">
              {isCreating ? 'Add Event' : 'Edit Event'}
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              error={Boolean(touched.title && errors.title)}
              fullWidth
              helperText={touched.title && errors.title}
              label="Title"
              name="title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              variant="outlined"
            />
            <Box mt={2}>
              <TextField
                error={Boolean(touched.description && errors.description)}
                fullWidth
                helperText={touched.description && errors.description}
                label="Description"
                name="description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                variant="outlined"
              />
            </Box>
            <Box mt={2}>
              <FormControlLabel
                control={<Switch checked={values.allDay} name="allDay" onChange={handleChange} />}
                label="All day"
              />
            </Box>
            <Box mt={2}>
              <DateTimePicker
                sx={{ width: '100%' }}
                label="Start date"
                onChange={date => setFieldValue('start', date)}
                defaultValue={moment.utc(values.start).tz('Europe/Belgrade')}
                onViewChange={() => setFieldTouched('end')}
              />
            </Box>
            <Box mt={2}>
              <DateTimePicker
                sx={{ width: '100%' }}
                label="End date"
                onChange={date => setFieldValue('end', date)}
                defaultValue={moment.utc(values.end).tz('Europe/Belgrade')}
                onViewChange={() => setFieldTouched('end')}
              />
            </Box>
            {Boolean(touched.end && errors.end) && (
              <Box mt={2}>
                <FormHelperText error>{`${errors.end}`}</FormHelperText>
              </Box>
            )}
          </Box>
          <Divider />
          <Box p={2} display="flex" alignItems="center">
            {!isCreating && (
              <IconButton onClick={() => handleDelete()}>
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Box flexGrow={1} />
            <Button onClick={onCancel}>Cancel</Button>
            <StyledConfirmButton
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              color="primary"
            >
              Confirm
            </StyledConfirmButton>
          </Box>
        </form>
      )}
    </Formik>
  )
}

const getInitialValues = (event?: EventType, range?: { start: number; end: number }) => {
  if (event) {
    const defaultEvent = {
      allDay: false,
      color: '',
      description: '',
      end: moment().add(30, 'minutes').toDate(),
      start: moment().toDate(),
      title: '',
      submit: null
    }
    return { ...defaultEvent, event }
  }

  if (range) {
    const defaultEvent = {
      allDay: false,
      color: '',
      description: '',
      end: new Date(range.end),
      start: new Date(range.start),
      title: '',
      submit: null
    }
    return { ...defaultEvent, event }
  }

  return {
    allDay: false,
    color: '',
    description: '',
    end: moment().add(30, 'minutes').toDate(),
    start: moment().toDate(),
    title: '',
    submit: null
  }
}

export default AddEditEventForm
