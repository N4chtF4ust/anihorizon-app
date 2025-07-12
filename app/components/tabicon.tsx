import React from 'react';
import { Ionicons,MaterialIcons,FontAwesome   } from '@expo/vector-icons';



interface TabIconProps {
  focused: boolean;
  name: string; // base name like 'home', 'search', etc.
}

function TabIcon({ focused, name }: TabIconProps) {
  const iconName = focused ? name : `${name}-outline`;

  return (
    <Ionicons
      name={iconName as any}
      size={25}
      color={focused ? '#0B1D51' : '#fff'}
    />
  );
}

export default TabIcon;
