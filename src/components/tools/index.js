import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Dashboard from './Dashboard'
import Tools from './Tools';

const MyComponent = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'tools', title: 'Tools', icon: 'toolbox' },
    { key: 'dashboard', title: 'Dashboard', icon: 'view-dashboard-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    tools: Tools,
    dashboard: Dashboard
  });

  return (
    <BottomNavigation
    barStyle={{ backgroundColor: 'white' }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default MyComponent;