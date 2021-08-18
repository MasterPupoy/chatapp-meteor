import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import Index from '/imports/startup/index';
import theme from '/imports/ui/components/themes/theme'
import { ColorModeScript } from '@chakra-ui/system';

Meteor.startup(() => {
  render(
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} /> 
      <Index/> 
    </>, 
    document.getElementById('react-target'));
});
