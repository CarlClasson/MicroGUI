import { Slider as MaterialSlider } from '@mui/material'
import { useNode, useEditor } from '@craftjs/core'
import { useRef } from 'react'
import Draggable from 'react-draggable'

import { Tooltip } from '../../tools/Tooltip'
import { SliderSettings } from './SliderSettings'

import { handleStop, getX, getY } from '../Utilities'

/**
 * Creates a slider object. 
 * @returns The 'slider' object
 */
export const Slider = ({ size, width, color, pageX, pageY,
    defaultValue, aria_label, valueLabelDisplay,
    connectedNode, ...props }) => {

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled
    }))

    const editorActions = useEditor().actions

    const {
        id,
        name,
        connectors: { connect },
        actions
    } = useNode((node) => ({
        name: node.data.custom.displayName || node.data.displayName
    }))

    const nodeRef = useRef()

    const updateText = (value) => {
        editorActions.setProp(connectedNode, (props) => {
            props.text = value
        })
        actions.setProp((props) => {
            props.valueLabelDisplay = 'off'
        }) 
    }

    return (
        <Draggable
            disabled={!enabled}
            onStop={() => handleStop(actions, nodeRef)}
            nodeRef={nodeRef}
            bounds='parent'
            position={{
                x: getX(pageX, nodeRef),
                y: getY(pageY, nodeRef)
            }}
        >
            <div
                style={{ position: 'absolute', paddingLeft: '10px', paddingRight: '10px' }}
                ref={nodeRef}
            >
                <Tooltip
                    name={name}
                    id={id}
                >
                    <MaterialSlider
                        ref={connect}
                        size={size}
                        
                        sx={{
                            color: `rgba(${Object.values(color)})`,
                            width: `${width}px`,
                            "& .MuiSlider-thumb.Mui-focusVisible" : {
                                boxShadow: 'none'
                            },
                            "& .MuiSlider-thumb:hover" : {
                                boxShadow: 'none'
                            },
                            "& .MuiSlider-thumb.Mui-active" : {
                                boxShadow: 'none'
                            }
                        }}
                        value={defaultValue}
                        onChange={(_, val) => {
                            if(connectedNode) updateText(val.toString())
                            actions.setProp((props) => {
                                props.defaultValue = val
                            })
                        }}
                        aria-label={aria_label}
                        valueLabelDisplay={valueLabelDisplay}
                        {...props}
                    />
                </Tooltip>
            </div>
        </Draggable>
    )
}

Slider.craft = {
    displayName: 'Slider',
    props: {
        size: 'small',
        width: 100,
        defaultValue: 0,
        color: { r: 63, g: 81, b: 181, a: 1 },
        valueLabelDisplay: 'auto'
    },
    related: {
        toolbar: SliderSettings
    }
}