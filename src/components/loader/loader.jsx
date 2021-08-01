import React from 'react'
import { Dimmer, Loader, Segment } from 'semantic-ui-react'

const LoaderComp = () => (
	<Segment>
      <Dimmer active inverted>
        <Loader inverted>Загрузка</Loader>
      </Dimmer>
    </Segment>
)

export default LoaderComp
