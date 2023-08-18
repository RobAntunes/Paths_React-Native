import {useEffect} from 'react';
import {View, Text} from 'react-native';

const Home = ({
  navigation,
  route,
}: {
  navigation?: any;
  route?: {action: string; [key: string]: string};
}) => {
  useEffect(() => {
    console.log(route);
  });
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
