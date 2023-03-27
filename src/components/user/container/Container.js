import { useNode, useEditor, Element } from '@craftjs/core';
import React, { useRef } from 'react';
import { Box } from '@mui/material'
import Draggable from 'react-draggable';
import { ContainerSettings } from './ContainerSettings'
import { handleStop, getX, getY } from '../Utilities';
import { useDrop } from 'react-dnd';
import { Tooltip } from '../../tools/Tooltip'

export const Container = ({ width, height, backgroundColor, border, childrenJustify, childrenAlign, children, pageX, pageY, ...props }) => {
    const {
        id,
        name,
        connectors: { connect },
        actions
    } = useNode((node) => ({
        name: node.data.displayName,
    }))

    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,
    }));

    const [, dropTarget] = useDrop({
        accept: "component",
        drop(_, monitor) {
            const offset = monitor.getClientOffset()
            if (offset) {
                const dropTargetXy = document.getElementById(id).getBoundingClientRect()
                return ({
                    id: id,
                    x: parseInt(offset.x - dropTargetXy.left),
                    y: parseInt(offset.y - dropTargetXy.top)
                })
            }
        }
    })

    const nodeRef = useRef()

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
                style={{ position: 'absolute' }}
                ref={nodeRef}
            >
                <Tooltip
                    name={name}
                    id={id}
                >
                    <div ref={dropTarget}>
                        <Box
                            ref={connect}
                            id={id}
                            sx={{
                                width: width,
                                height: height,
                                backgroundColor: backgroundColor ? `rgba(${Object.values(backgroundColor)})` : 'red',
                                border: border,
                                position: 'static',
                                overflow: 'visible',
                                display: 'flex',
                                justifyContent: childrenJustify,
                                alignItems: childrenAlign,
                                flexDirection: 'column',
                            }}
                            {...props}
                        >
                            {children}
                        </Box>
                    </div>
                </Tooltip>
            </div>
        </Draggable>
    );
};

Container.craft = {
    displayName: 'Container',
    props: {
        width: 150,
        height: 180,
        backgroundColor: { r: 204, b: 153, g: 153, a: 1 },
        border: 'solid',
        childrenJustify: 'flex-start',
        childrenAlign: 'flex-start',
    },
    related: {
        toolbar: ContainerSettings
    }
};
