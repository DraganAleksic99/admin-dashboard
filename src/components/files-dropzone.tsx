import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { FileCopy as FileCopyIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  styled
} from '@mui/material'
import bytesToSize from '../utils/bytes-to-size'

const StyledDropZoneDiv = styled('div')<IDropZoneProps>(({ theme, isDragActive }) => ({
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

interface IDropZoneProps {
  isDragActive: boolean
}

type TProps = {
  file: File | null
  setFile: (file: File | null) => void
  imageName: string
  imageSize: string
}

const FilesDropzone = ({ file, setFile, imageName, imageSize }: TProps) => {
  const [productHasImage, setProductHasImage] = useState(imageName)

  console.log(productHasImage)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0])
    },
    [setFile]
  )

  const handleRemove = () => {
    setFile(null)
    setProductHasImage(null)
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div>
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
      {(file || productHasImage) && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <StyledList>
              <ListItem>
                <ListItemIcon>
                  <FileCopyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={file ? file.name : imageName}
                  primaryTypographyProps={{ variant: 'h5' }}
                  secondary={file ? bytesToSize(file.size) : imageSize}
                />
              </ListItem>
            </StyledList>
          </PerfectScrollbar>
          <StyledActionsDiv>
            <Button onClick={handleRemove} size="small" sx={{ marginRight: '1rem' }}>
              Remove
            </Button>
          </StyledActionsDiv>
        </>
      )}
    </div>
  )
}

export default FilesDropzone
