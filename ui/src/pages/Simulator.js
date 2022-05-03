import './Simulator.css'

import { Editor as CraftEditor, Frame } from '@craftjs/core'

import { Button } from '../components/user/button/Button'
import { Slider } from '../components/user/slider/Slider'
import { Switch } from '../components/user/switch/Switch'
import { Textfield } from '../components/user/textfield/Textfield'
import { CanvasArea } from '../components/user/canvas/CanvasArea'
import { Checkbox } from '../components/user/checkbox/Checkbox'
import { Divider } from '../components/user/divider/Divider'

import React from 'react'

export default function Simulator() {

    return (
        <div className='simulatorDiv' >
            <h1 className='blinkingText'>Simulator mode</h1>
            <div className='simulatorBorder' >
                <CraftEditor
                    enabled={false}
                    resolver={{
                        CanvasArea,
                        Button,
                        Slider,
                        Switch,
                        Textfield,
                        Checkbox,
                        Divider
                    }}
                    indicator={false}
                >
                    {/* get the state of the canvas from the browers local storage */}
                    <Frame data={localStorage.getItem('data')} />
                </CraftEditor>
            </div>
        </div>
    )
}