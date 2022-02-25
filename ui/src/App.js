import './App.css'

import { Typography, Paper, Grid, Stack, Button as MaterialButton } from '@mui/material';
import { Editor, Frame, Element, useEditor } from '@craftjs/core';

import logo from './logo.png'

import { Toolbox } from './Components/Toolbox'
import { Toolbar } from './Components/Toolbar'
import { Button } from './Components/Button'
import { Slider } from './Components/Slider'
import { Switch } from './Components/Switch'
import { Textfield } from './Components/Textfield'
import { RenderNode } from './Components/RenderNode'

/**
 * Core of the web app.
 * @returns The web app.
 */
export default function App() {

	const jsonstring = '{"ROOT":{"type":"div","isCanvas":true,"props":{"id":"canvasElement","style":{"width":"400px","height":"400px"},"className":"canvasElement"},"displayName":"div","custom":{},"hidden":false,"nodes":["ufJdeTeulY","_PUPDzLI8i"],"linkedNodes":{}},"ufJdeTeulY":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Click me","size":"small","variant":"outlined","pageX":414,"pageY":122},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"_PUPDzLI8i":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"text":"Click me","size":"small","variant":"outlined","pageX":733,"pageY":278},"displayName":"Button","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}'
	/*
	const resize = () => {
		document.getElementById("canvasElement").style.width = '200px'
		document.getElementById("canvasElement").style.height = '200px'
	} */

	/** Render all components. */
	return (
		<div className='App'>
			<header className='header'>
				<img
					src={logo}
					alt='logo'
					className='logoTest'
				/>
				<h1 className='topText' >MicroGUI</h1>
			</header>
			<Editor
				resolver={{
					Button,
					Slider,
					Switch,
					Textfield
				}}
				indicator={false}
				onRender={RenderNode}
			>
				<Stack
					className='row'
					direction='row'
					spacing={0}
				>
					<div className='left'>
						<Toolbox />
						{/* <MaterialButton
							variant='outlined'
							onClick={resize}
							style={{
								margin: '20px'
							}}
						>
							Resize
						</MaterialButton>
						<SaveButton /> */}
					</div>
					<div className='middle'>
						<Toolbar />
						<Frame /*data={jsonstring}*/>
							<Element
								id='canvasElement'
								is='div'
								style={{ 
									width: '400px',
									height: '400px',
								}}
								className='canvasElement'
								canvas
							/>
						</Frame>
					</div>
					<div className='right'>
						<h1>Settings</h1>
					</div>
				</Stack >
			</Editor>
			<footer className='footer'>
				<a
					href='https://github.com/CarlClasson/MicroGUI'
					target='_blank'
				>
					GitHub
				</a>
			</footer>
		</div >
	);
}