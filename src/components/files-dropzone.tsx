import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FileCopy as FileCopyIcon, More as MoreIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  styled
} from '@mui/material'
import bytesToSize from '../utils/bytes-to-size'

interface Props {
  isDragActive: boolean
}

const StyledDropZoneDiv = styled('div')<Props>(({ theme, isDragActive }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  padding: theme.spacing(6),
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    opacity: 0.5,
    cursor: 'pointer'
  },
  ...(isDragActive && {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  })
}))

const StyledImg = styled('img')({
  width: 130
})

const StyledList = styled(List)({
  maxHeight: 320
})

const StyledActionsDiv = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  justifyContent: 'flex-end',
  '& > * + *': {
    marginLeft: theme.spacing(2)
  }
}))

const FilesDropzone = props => {
  const [files, setFiles] = useState<any[]>([])

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles].concat(acceptedFiles))
  }, [])

  const handleRemoveAll = () => {
    setFiles([])
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop
  })

  return (
    <div {...props}>
      <StyledDropZoneDiv {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <StyledImg alt="Select file" src="/images/products/add_file.svg" />
        </div>
        <div>
          <Typography gutterBottom variant="h5">
            Select Files
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body1">
              Drop files here or click <Link underline="always">browse</Link> thorough your machine
            </Typography>
          </Box>
        </div>
      </StyledDropZoneDiv>
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <StyledList>
              {files.map((file, i) => (
                <ListItem divider={i < files.length - 1} key={i}>
                  <ListItemIcon>
                    <FileCopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: 'h5' }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </StyledList>
          </PerfectScrollbar>
          <StyledActionsDiv>
            <Button onClick={handleRemoveAll} size="small">
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </StyledActionsDiv>
        </>
      )}
    </div>
  )
}

export default FilesDropzone
