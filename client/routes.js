import React from "react"
import { Route, IndexRoute } from "react-router"

import NotFound from "./components/NotFound"

import App from "./components/App"
import Clip from "./components/Clip"

import Latest from "./components/latest/Latest"
import Video from "./components/video/Video"
import Uploads from "./components/uploads/Uploads"



import requireAuth from './utils/requireAuth'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

export default (
	<Route>

		<Route path="/" component={App}>
			<IndexRoute component={Latest} />
			<Route path="uploads" component={requireAuth(Uploads)} />
		</Route>

		<Route path="/:id" component={Clip}>
			<IndexRoute component={Video} />
		</Route>
		
		<Route path="*" component={NotFound}/>
	</Route>

	
)
