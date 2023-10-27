import React from 'react'
import ReactQuill from 'react-quill'
import { styled } from '@mui/material'

const StyledReactQuill = styled(ReactQuill)(({theme}) => ({
    '& .ql-toolbar': {
        borderLeft: 'none',
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
        '& .ql-picker-label:hover': {
            color: theme.palette.secondary.main,
            '& .ql-picker-label.ql-active': {
                color: theme.palette.secondary.main,
            },
            '& .ql-picker-item:hover': {
                color: theme.palette.secondary.main,
            },
            '& .ql-picker-item.ql-selected': {
                color: theme.palette.secondary.main,
            },
            '& button:hover': {
                color: theme.palette.secondary.main,
                '& .ql-stroke': {
                    stroke: theme.palette.secondary.main,
                },
            },
            '& button:focus': {
                color: theme.palette.secondary.main,
                '& .ql-stroke': {
                    stroke: theme.palette.secondary.main,
                },
            },
            '& button.ql-active': {
                '& .ql-stroke': {
                    stroke: theme.palette.secondary.main,
                },
            },
            '& .ql-stroke': {
                stroke: theme.palette.text.primary,
            },
            '& .ql-picker': {
                color: theme.palette.text.primary,
            },
            '& .ql-picker-options': {
                padding: theme.spacing(2),
                backgroundColor: theme.palette.background.default,
                border: 'none',
                boxShadow: theme.shadows[10],
                borderRadius: theme.shape.borderRadius,
            },
        },
        '& .ql-container': {
            border: 'none',
            '& .ql-editor': {
                fontSize: 16,
                color: theme.palette.text.primary,
                '&.ql-blank::before': {
                color: theme.palette.text.secondary,
                },
            },
        },
                
    },
}))

type Props = {
    [key: string]: any
}

const QuillEditor = (props: Props) => {
    return (
            <StyledReactQuill theme={null} {...props} />
    )
}

export default QuillEditor