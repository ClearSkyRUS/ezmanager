import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoaderComp = () => (
  <div>
      <Dimmer active inverted>
        <Loader inverted>Загрузка</Loader>
      </Dimmer>
  </div>
)

export default LoaderComp
