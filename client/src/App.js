import React from 'react';
import GlobalStyle from './style/GlobalStyles';
import {
  Map
} from './Components/index';

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Map />
    </React.Fragment>
  );
}

export default App;
